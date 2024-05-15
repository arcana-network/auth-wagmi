import type { EthereumProvider, AuthProvider } from "@arcana/auth";

import {
  UserRejectedRequestError,
  getAddress,
  SwitchChainError,
  RpcError,
  toHex,
} from "viem";
import { ChainNotConfiguredError, createConnector } from "@wagmi/core";

interface LoginType {
  provider: string;
  email?: string;
}

type ArcanaParams = { loginType: LoginType; auth: AuthProvider };

export function ArcanaConnector({ auth, loginType }: ArcanaParams) {
  let listenersAdded = false;
  let login = loginType;
  return createConnector<EthereumProvider>((config) => ({
    id: "arcana",
    name: "Arcana",
    type: "arcana",
    async connect() {
      try {
        if (!listenersAdded) {
          listenersAdded = true;
          auth.provider.on("accountsChanged", this.onAccountsChanged);
          auth.provider.on("chainChanged", this.onChainChanged);
          auth.provider.on("disconnect", this.onDisconnect);
        }

        await auth.init();
        config.emitter.emit("message", { type: "connecting" });
        if (await auth.isLoggedIn()) {
          if (!auth.connected) {
            await new Promise((resolve) =>
              auth.provider.on("connect", resolve)
            );
          }
          let chain = await this.getChainId();

          return {
            chainId: chain,
            accounts: await this.getAccounts(),
          };
        }
        if (login?.provider) {
          if (login.provider == "passwordless") {
            if (login.email) {
              await auth.loginWithLink(login.email);
            } else {
              throw new Error("passwordless requires `email` in params");
            }
          } else {
            await auth.loginWithSocial(login.provider);
          }
        } else {
          await auth.connect();
        }
        const chainId = await this.getChainId();
        return {
          chainId,
          accounts: await this.getAccounts(),
        };
      } catch (err) {
        if (err instanceof Error) {
          throw new UserRejectedRequestError(err);
        } else {
          throw err;
        }
      }
    },

    async getAccounts() {
      const provider = await this.getProvider();
      const accounts = (await provider.request({
        method: "eth_accounts",
      })) as string[];
      return accounts.map((a) => getAddress(a));
    },

    async disconnect() {
      await auth.logout();
      auth.provider.removeListener("accountsChanged", this.onAccountsChanged);
      auth.provider.removeListener("chainChanged", this.onChainChanged);
      auth.provider.removeListener("disconnect", this.onDisconnect);
    },

    async getProvider() {
      return auth.provider;
    },

    async setLogin(loginType: LoginType) {
      login = loginType;
    },

    async switchChain({ chainId }) {
      const chain = config.chains.find((x) => x.id === chainId);
      if (!chain) {
        throw new ChainNotConfiguredError();
      }

      const provider = await this.getProvider();
      const id = toHex(chainId);

      try {
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: id }],
        });
        return chain;
      } catch (error) {
        if ((error as RpcError).code === 4902) {
          try {
            await provider.request({
              params: [
                {
                  rpcUrls: [chain.rpcUrls.public ?? chain.rpcUrls.default],
                  blockExplorerUrls: "",
                  nativeCurrency: chain.nativeCurrency,
                  chainName: chain.name,
                  chainId: id,
                },
              ],
              method: "wallet_addEthereumChain",
            });
            return chain;
          } catch (addError) {
            // Check if user rejected request
            // else
            if (addError instanceof Error) {
              throw new SwitchChainError(addError);
            } else {
              throw error;
            }
          }
        }
        // Check if user rejected request
        // else
        if (error instanceof Error) {
          throw new SwitchChainError(error);
        } else {
          throw error;
        }
      }
    },

    async isAuthorized() {
      try {
        await auth.init();
        const isAuthorized = await auth.isLoggedIn();
        return isAuthorized;
      } catch {
        return false;
      }
    },

    async getChainId() {
      return normalizeChainId(auth.chainId);
    },

    onChainChanged(id: number | string) {
      const chainId = normalizeChainId(id);
      config.emitter.emit("change", { chainId });
    },

    onAccountsChanged(accounts: string[]) {
      if (accounts.length === 0) {
        config.emitter.emit("disconnect");
      } else {
        config.emitter.emit("change", {
          accounts: accounts.map((a) => getAddress(a)),
        });
      }
    },

    onDisconnect() {
      config.emitter.emit("disconnect");
    },
  }));
}

function normalizeChainId(chainId: number | string): number {
  if (typeof chainId === "string")
    return Number.parseInt(
      chainId,
      chainId.trim().substring(0, 2) === "0x" ? 16 : 10
    );
  if (typeof chainId === "bigint") return Number(chainId);
  return chainId;
}

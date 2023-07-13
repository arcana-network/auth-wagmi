import type { EthereumProvider, AuthProvider } from "@arcana/auth";

import {
  UserRejectedRequestError,
  createWalletClient,
  SwitchChainError,
  getAddress,
  RpcError,
  custom,
  toHex
} from "viem";
import {
  ChainNotConfiguredError,
  ConnectorData,
  WalletClient,
  Connector,
  Chain,
} from "@wagmi/core";

interface LoginType {
  provider: string;
  email?: string;
}

export class ArcanaConnector extends Connector {
  private provider?: EthereumProvider;
  private loginType?: LoginType;
  private auth: AuthProvider;
  protected onAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) this.emit("disconnect");
    else
      this.emit("change", {
        account: getAddress(accounts[0] as string),
      });
  };
  protected onChainChanged = (chainId: number | string) => {
    const id = normalizeChainId(chainId);
    const unsupported = this.isChainUnsupported(id);
    this.emit("change", { chain: { unsupported, id } });
  };
  protected onDisconnect = () => {
    this.emit("disconnect");
  };

  ready = !(typeof window === "undefined");

  readonly name = "Arcana Auth";

  readonly id = "arcana";

  constructor(config: {
    options: { auth: AuthProvider; login?: LoginType };
    chains?: Chain[];
  }) {
    super(config);
    this.auth = config.options.auth;
    this.loginType = config.options.login;
  }

  private removeEventListeners() {
    this.auth.provider.removeListener(
      "accountsChanged",
      this.onAccountsChanged
    );
    this.auth.provider.removeListener("chainChanged", this.onChainChanged);
    this.auth.provider.removeListener("disconnect", this.onDisconnect);
  }

  private addEventListeners() {
    this.auth.provider.on("accountsChanged", this.onAccountsChanged);
    this.auth.provider.on("chainChanged", this.onChainChanged);
    this.auth.provider.on("disconnect", this.onDisconnect);
  }

  async connect(): Promise<Required<ConnectorData>> {
    try {
      await this.auth.init();
      const provider = await this.getProvider();
      this.emit("message", { type: "connecting" });
      if (await this.auth.isLoggedIn()) {
        const chainId = await this.getChainId();
        const unsupported = this.isChainUnsupported(chainId);
        if (!this.auth.connected) {
          await new Promise((resolve) => provider.on("connect", resolve));
        }
        return {
          chain: {
            id: chainId,
            unsupported,
          },
          account: await this.getAccount(),
        };
      }
      this.addEventListeners();
      if (this.loginType?.provider) {
        if (this.loginType.provider == "passwordless") {
          if (this.loginType.email) {
            await this.auth.loginWithLink(this.loginType.email);
          } else {
            throw new Error("passwordless requires `email` in params");
          }
        } else {
          await this.auth.loginWithSocial(this.loginType.provider);
        }
      } else {
        await this.auth.connect();
      }
      const chainId = await this.getChainId();
      const unsupported = this.isChainUnsupported(chainId);
      return {
        chain: { id: chainId, unsupported },
        account: await this.getAccount(),
      };
    } catch (err) {
      if (err instanceof Error) {
        throw new UserRejectedRequestError(err);
      } else {
        throw err;
      }
    }
  }

  async switchChain(chainId: number): Promise<Chain> {
    const chain = this.chains.find((x) => x.id === chainId);
    if (!chain) {
      throw new ChainNotConfiguredError({ connectorId: this.id, chainId });
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
                blockExplorerUrls: this.getBlockExplorerUrls(chain),
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
  }

  async getWalletClient(config: { chainId?: number } = {}): Promise<WalletClient> {
    const account = await this.getAccount();
    const chain = this.chains.find((x) => x.id === config.chainId) ?? this.chains[0]
    return createWalletClient({
      transport: custom(await this.getProvider()),
      account,
      chain,
    });
  }

  async getAccount() {
    const provider = await this.getProvider();
    const accounts = await provider.request({
      method: "eth_accounts",
    });
    return getAddress((accounts as string[])[0]);
  }

  async isAuthorized() {
    try {
      await this.auth.init();
      const isAuthorized = await this.auth.isLoggedIn();
      return isAuthorized;
    } catch {
      return false;
    }
  }

  async getProvider() {
    if (!this.provider) {
      this.provider = this.auth.provider;
    }

    return this.provider;
  }

  async disconnect() {
    await this.auth.logout();
    this.removeEventListeners();
  }

  async getChainId() {
    return normalizeChainId(this.auth.chainId);
  }
  setLogin(val: LoginType) {
    this.loginType = val;
  }
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

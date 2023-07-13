import {
  Connector,
  Chain,
  ConnectorData,
  ChainNotConfiguredError,
} from "@wagmi/core";
import {
  createWalletClient,
  custom,
  getAddress,
  toHex,
  UserRejectedRequestError,
  SwitchChainError,
  RpcError,
} from "viem";
import type { AuthProvider, EthereumProvider } from "@arcana/auth";

const isServer = typeof window === "undefined";

interface LoginType {
  provider: string;
  email?: string;
}

export class ArcanaConnector extends Connector {
  ready = !isServer;
  readonly id = "arcana";
  readonly name = "Arcana Auth";
  private auth: AuthProvider;
  private loginType?: LoginType;
  private provider?: EthereumProvider;

  constructor(config: {
    chains?: Chain[];
    options: { auth: AuthProvider; login?: LoginType };
  }) {
    super(config);
    this.auth = config.options.auth;
    this.loginType = config.options.login;
  }

  setLogin(val: LoginType) {
    this.loginType = val;
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
        account: await this.getAccount(),
        chain: { id: chainId, unsupported },
      };
    } catch (err) {
      if (err instanceof Error) {
        throw new UserRejectedRequestError(err);
      } else {
        throw err;
      }
    }
  }

  async getAccount() {
    const provider = await this.getProvider();
    const accounts = await provider.request({
      method: "eth_accounts",
    });
    return getAddress((accounts as string[])[0]);
  }

  async getChainId() {
    return normalizeChainId(this.auth.chainId);
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

  async switchChain(chainId: number): Promise<Chain> {
    const chain = this.chains.find((x) => x.id === chainId);
    if (!chain) {
      throw new ChainNotConfiguredError({ chainId, connectorId: this.id });
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
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: id,
                chainName: chain.name,
                nativeCurrency: chain.nativeCurrency,
                rpcUrls: [chain.rpcUrls.public ?? chain.rpcUrls.default],
                blockExplorerUrls: this.getBlockExplorerUrls(chain),
              },
            ],
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
    this.emit("change", { chain: { id, unsupported } });
  };

  protected onDisconnect = () => {
    this.emit("disconnect");
  };

  async disconnect() {
    await this.auth.logout();
    this.removeEventListeners();
  }

  async getWalletClient(config?: { chainId?: number }) {
    const account = await this.getAccount();
    const chain = this.chains.find((x) => x.id === config?.chainId);
    return createWalletClient({
      account,
      chain,
      transport: custom(await this.getProvider()),
    });
  }

  async getProvider() {
    if (!this.provider) {
      this.provider = this.auth.provider;
    }

    return this.provider;
  }

  private addEventListeners() {
    this.auth.provider.on("accountsChanged", this.onAccountsChanged);
    this.auth.provider.on("chainChanged", this.onChainChanged);
    this.auth.provider.on("disconnect", this.onDisconnect);
  }
  private removeEventListeners() {
    this.auth.provider.removeListener(
      "accountsChanged",
      this.onAccountsChanged
    );
    this.auth.provider.removeListener("chainChanged", this.onChainChanged);
    this.auth.provider.removeListener("disconnect", this.onDisconnect);
  }
}

function normalizeChainId(chainId: string | number): number {
  if (typeof chainId === "string")
    return Number.parseInt(
      chainId,
      chainId.trim().substring(0, 2) === "0x" ? 16 : 10
    );
  if (typeof chainId === "bigint") return Number(chainId);
  return chainId;
}

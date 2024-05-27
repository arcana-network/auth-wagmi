import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ArcanaConnector } from "@arcana/auth-wagmi";
import { WagmiProvider, createConfig, http } from "wagmi";
import { getAuthProvider } from "../utils/getArcanaAuth";
import { mainnet, polygon } from "wagmi/chains";

export const connectors = () => {
  return ArcanaConnector({
    auth: getAuthProvider(),
  });
};

const queryClient = new QueryClient();

export const wagmiClient = createConfig({
  chains: [mainnet, polygon],
  connectors: [connectors()],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={wagmiClient}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { publicProvider } from "wagmi/providers/public";
import { polygon, mainnet } from "wagmi/chains";
import "@rainbow-me/rainbowkit/styles.css";

import { connectors } from "../utils/wallet";
import "../styles/globals.css";

const { publicClient, chains } = configureChains(
  [mainnet, polygon],
  [publicProvider()]
);


const wagmiConfig = createConfig({
  connectors: connectors(chains),
  autoConnect: true,
  publicClient,
});

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

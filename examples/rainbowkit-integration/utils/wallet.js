import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { ArcanaConnector } from "@arcana/auth-wagmi";

import { getAuthProvider } from "./getArcanaAuth";
import { newArcanaLogo } from "./logo";

export const ArcanaRainbowConnector = ({ chains }) => {
  return {
    createConnector: () => {
      const connector = new ArcanaConnector({
        options: {
          auth: getAuthProvider(),
        },
        chains,
      });
      return {
        connector,
      };
    },
    name: "[Arcana] Login with Email/Social",
    iconBackground: "#101010",
    iconUrl: newArcanaLogo,
    id: "arcana-auth",
  };
};

const connectors = (chains) =>
  connectorsForWallets([
    {
      wallets: [ArcanaRainbowConnector({ chains })],
      groupName: "Recommended",
    },
  ]);

export { connectors };

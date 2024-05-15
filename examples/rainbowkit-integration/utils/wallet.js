import { ArcanaConnector } from "@arcana/auth-wagmi";
import { getAuthProvider } from "./getArcanaAuth";
import { newArcanaLogo } from "./logo";
import { createConnector } from "wagmi";
export const ArcanaRainbowConnector = () => {
  return {
    createConnector: (walletDetails) =>
      createConnector((config) => ({
        ...ArcanaConnector({
          auth: getAuthProvider(),
        })(config),
        ...walletDetails,
      })),
    name: "[Arcana] Login with Email/Social",
    iconBackground: "#101010",
    iconUrl: newArcanaLogo,
    id: "arcana-auth",
  };
};

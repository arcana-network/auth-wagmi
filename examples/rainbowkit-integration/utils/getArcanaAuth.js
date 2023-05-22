import { AuthProvider } from "@arcana/auth";

let auth = null;

export const getAuthProvider = () => {
  if (!auth) {
    auth = new AuthProvider(
      "xar_dev_19527cdf585cd31d0bd06bfc1b008accea781404"
    );
  }
  return auth;
};

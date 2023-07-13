import { AuthProvider } from "@arcana/auth";

let auth = null;

export const getAuthProvider = () => {
  if (!auth) {
    auth = new AuthProvider(
      "xar_test_b2dde12aad64eb35d72b2c80926338e178b1fa3f"
    );
  }
  return auth;
};

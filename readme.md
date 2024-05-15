# Arcana Auth Wagmi Connector

For wagmi < 1.0.0 use `@arcana/auth-wagmi@1.y.z`

For wagmi >= 1.0.0, use `@arcana/auth-wagmi@2.y.z`

For wagmi >= 2.0.0, use `@arcana/auth-wagmi@3.y.z`

## Install

```sh
yarn add @arcana/auth-wagmi @arcana/auth
```

## Usage

With plug n play connect modal

```ts
import { ArcanaConnector } from "@arcana/auth-wagmi"
import { AuthProvider } from "@arcana/auth"

const auth = new AuthProvider(`${arcana_client_id}`) // Singleton
const connector = new ArcanaConnector({
  auth,
})
```

With custom UI

```ts
import { ArcanaConnector } from "@arcana/auth-wagmi"
import { AuthProvider } from "@arcana/auth"

const auth = new AuthProvider(`${arcana_client_id}`) // Singleton
const connector = new ArcanaConnector({
  auth,
  loginType: {
    provider: "google"
    // email: 'abc@example.com' // if provider is `passwordless`
  } 
    
})

// OR

connector.setLogin({
  provider: "google"
  // email: 'abc@example.com' // if provider is `passwordless`
})
```

For more details on connectors and integrating your app with Wagmi, see [Wagmi documentation](https://wagmi.sh/core/getting-started).

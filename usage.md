# Arcana Auth Wagmi Connector

For wagmi < 1.0.0 use `@arcana/auth-wagmi@1.y.z`

For wagmi >= 1.0.0, use `@arcana/auth-wagmi@2.y.z`

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
    options: {
        auth,
    }
})
```

With custom UI

```ts
import { ArcanaConnector } from "@arcana/auth-wagmi"
import { AuthProvider } from "@arcana/auth"

const auth = new AuthProvider(`${arcana_client_id}`) // Singleton
const connector = new ArcanaConnector({
    options: {
        auth,
        // specify here or in setLogin function as shown below
        login: {
          provider: "google"
          // email: 'abc@example.com' // if provider is `passwordless`
        } 
    }
})

// OR

connector.setLogin({
  provider: "google"
  // email: 'abc@example.com' // if provider is `passwordless`
})
```

## Configuration

## Add Chains

Configure the chains that will show up in the Arcana wallet within your app's context. In the example below, the chains configured are: Optimism, Polygon and Ethereum Mainnet.

```ts
import { mainnet, optimism, polygon } from '@wagmi/core/chains'
import { ArcanaConnector } from "@arcana/auth-wagmi"
import { AuthProvider } from "@arcana/auth"

const auth = new AuthProvider(`${arcana_client_id}`)

const connector = new ArcanaConnector({
  chains: [mainnet, optimism, polygon],
  options: {
    auth,
  },
})
```

For more details on connectors and integrating your app with Wagmi, see [Wagmi documentation](https://wagmi.sh/core/getting-started).

# Arcana Auth Wagmi Connector


## Install

```sh
yarn add @arcana/auth-wagmi @arcana/auth
```

## Usage

With connect modal

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
        login: {
          provider: "google"
        } // Optional, specify here or in setLogin function
    }
})

// OR

connector.setLogin({
  provider: "google"
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

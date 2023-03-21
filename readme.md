# Arcana auth wagmi connector


## Install

```sh
yarn add @arcana/auth-wagmi @arcana/auth
```

## Usage

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

## Configuration

## chains

Chains supported by app.

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

Remaining integration documentation can be found at [wagmi](https://wagmi.sh/core/getting-started) docs.

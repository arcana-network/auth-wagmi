# Arcana auth wagmi connector

## Usage

```ts
import { ArcanaConnector } from "@arcana/auth-wagmi"

const connector = new ArcanaConnector({
    options: {
        clientId: `${arcana_client_id}`,
    }
})

```

## Configuration

## chains

Chains supported by app.

```ts
import { mainnet, optimism, polygon } from '@wagmi/core/chains'
import { ArcanaConnector } from "@arcana/auth-wagmi"
 
const connector = new ArcanaConnector({
  chains: [mainnet, optimism, polygon],
  options: {
    clientId: `${arcana_client_id}`,
  },
})
```

## options

Options to be passed to Arcana auth SDK.

```ts
const connector = new ArcanaConnector({
  chains: [mainnet, optimism, polygon],
  options: {
    clientId: `${arcana_client_id}`,
    theme: 'light',            // Defaults to 'dark'
    alwaysVisible: false,      // Defaults to true
    position: 'left'           // Defaults to 'right'
  },
})
```

Remaining integration documentation can be found at [wagmi](https://wagmi.sh/core/getting-started) docs.

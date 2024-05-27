<p align="center">
<a href="#start"><img height="30rem" src="https://raw.githubusercontent.com/arcana-network/branding/main/an_logo_light_temp.png"/></a>
<h2 align="center"> <a href="https://arcana.network/">Arcana Network Auth-Wagmi SDK </a></h2>
</p>
<br/>
<p id="banner" align="center">
<br/>
<a title="MIT License" href="https://github.com/arcana-network/license/blob/main/LICENSE.md"><img src="https://img.shields.io/badge/license-MIT-blue"/></a>
<a title="Beta release" href="https://github.com/arcana-network/auth-wagmi/releases"><img src="https://img.shields.io/github/v/release/arcana-network/auth-wagmi?style=flat-square&color=28A745"/></a>
<a title="Twitter" href="https://twitter.com/ArcanaNetwork"><img alt="Twitter URL" src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2FArcanaNetwork"/></a>
<a title="CodeCov" href="https://codecov.io/gh/arcana-network/auth-wagmi"> 
 <img src="https://codecov.io/gh/arcana-network/auth-wagmi/branch/dev/graph/badge.svg?token=KmdjEs3enL"/></a>
</p><p id="start" align="center">
<a href="https://docs.beta.arcana.network/"><img src="https://raw.githubusercontent.com/arcana-network/branding/main/an_banner_docs.png" alt="Arcana Auth-Wagmi SDK"/></a>
</p>

# What is Auth-Wagmi SDK?

Auth-Wagmi SDK is a companion SDK to [Arcana Auth](https://github.com/arcana-network/auth). It is required for enabling social logins in dApps that use Wagmi wallet connector.

For wagmi >= 2.0.0, use `@arcana/auth-wagmi@3.y.z`

## Install

```sh
npm install --save @arcana/auth @arcana/auth-wagmi
```

## yarn

With plug n play connect modal

```ts
import { ArcanaConnector } from "@arcana/auth-wagmi"
import { AuthProvider } from "@arcana/auth"

const auth = new AuthProvider(`${arcana_client_id}`)
const connector = ArcanaConnector({
  auth,
})
```

### CDN

```ts
import { ArcanaConnector } from "@arcana/auth-wagmi"
import { AuthProvider } from "@arcana/auth"

const auth = new AuthProvider(`${arcana_client_id}`)
const connector = ArcanaConnector({
  auth,
  loginType: {
    provider: "google"
  } 
})
```

For more details on connectors and integrating your app with Wagmi, see [Wagmi documentation](https://wagmi.sh/react/getting-started).

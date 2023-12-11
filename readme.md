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

Devs can create custom login UI or use the built-in plug-and-play auth to onboard users via social login. Arcana Auth offers an embedded, non-custodial Arcana wallet for authenticated users enabling them to sign blockchain transactions. Devs can choose to use the built-in wallet UI or create custom wallet UI.

# 💪 Key Features

<p>🔒 &nbsp; Enable Social Login in Wagmi Apps</p>
<p>🗝️ &nbsp; Plug and play user authentication</p>
<p>🔒 &nbsp; Onboard dApp users via social, passwordless login</p>
<p>🔒 &nbsp; Embedded Web3 Arcana wallet that can be branded and configured as per the application needs </p>
<p>⛓️ &nbsp; Sign blockchain transactions, deploy and interact with smart contracts, manage native and custom tokens, view and manage NFTs, send and receive tokens</p>
<p>⚙️ &nbsp; Configure blockchain transaction signing user experience using wallet visibility modes</p>

# 🏗️ Installation

To use the Auth-Wagmi SDK, devs must install and integrate the app with both, the Arcana Auth SDK as well as the Auth-Wagmi SDK.

## npm

```sh
npm install --save @arcana/auth @arcana/auth-wagmi
```

## yarn

```sh
yarn add @arcana/auth @arcana/auth-wagmi
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@arcana/auth"></script>
<script src="https://cdn.jsdelivr.net/npm/@arcana/auth-wagmi"></script>
```

```html
<script src="https://unpkg.com/@arcana/auth"></script>
<script src="https://unpkg.com/@arcana/auth-wagmi"></script>
```

# 📋 Prerequisites

Before you can start using the Arcana Auth SDK and Arcana Auth-Wagmi SDK in dApps, you need to register your dApp using [Arcana Developer Dashboard](https://dashboard.arcana.network/).

A unique **Client ID** will be assigned to your dApp and you need the same to initialize the Arcana Auth SDK.

# 📚 Documentation

Check out [Arcana Network documentation](https://docs.arcana.network/) and Auth-Wagmi SDK [Usage Guide](./usage.md).  Also see [Auth-Wagmi Quick Start Guide](https://docs.arcana.network/quick-start/wagmi-quick-start.html).

# 💡 Support

For any support or integration-related queries, [contact us](https://docs.arcana.network/support). 

# ℹ️ License

Arcana Auth SDK is distributed under the [MIT License](https://fossa.com/blog/open-source-licenses-101-mit-license/).

For details see [Arcana License](https://github.com/arcana-network/license/blob/main/LICENSE.md).

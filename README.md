# 💰 useToken()

[<img src="https://img.shields.io/npm/v/use-token" alt="" />](https://www.npmjs.com/package/use-token) [<img src="https://img.shields.io/bundlephobia/minzip/use-token" alt="" />](https://bundlephobia.com/result?p=use-token)

useToken() allows to get information related to a token on Ethereum (for now; other networks will follow).

## Usage

Add it to your project:

```console
yarn add use-token
```

Use it in your React app:

```jsx
// App.js

import React from 'react'
import { useToken, UseTokenProvider } from 'use-token'

function App() {
  const token = useToken('0xcD62b1C403fa761BAadFC74C525ce2B51780b184')

  return (
    <div>
      <h1>{token.name}</h1>
      <img src={token.iconUrl} alt={token.symbol} />
    </div>
  )
}

// Wrap everything in <UseTokenProvider />
export default () => (
  <UseTokenProvider>
    <App />
  </UseTokenProvider>
)
```

## API

### <UseTokenProvider />

This is the provider component. It should be placed above any component using useToken().

### useToken()

This is the hook to be used throughout the app. It takes the address of the token as a parameter, and returns an object representing the token, containing:

- `iconUrl`: URL of the icon.
- `symbol`: The symbol of the token (e.g. `"ANJ"`)
- `name`: The name of the token (e.g. `"Aragon Network Juror"`)

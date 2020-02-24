import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { fetchTokenData, tokenIconUrl } from './utils'

const UseTokenContext = React.createContext(null)

export function useToken(address = '') {
  const tokenContext = useContext(UseTokenContext)
  const [tokenData, setTokenData] = useState(null)

  if (tokenContext === null) {
    throw new Error(
      'useToken() can only be used inside of <UseTokenProvider />, ' +
        'please declare it at a higher level.'
    )
  }

  useEffect(() => {
    let cancelled = false

    const update = async () => {
      const data = await tokenContext.fetchTokenData(address)

      if (!cancelled) {
        setTokenData(data)
      }
    }
    update()

    return () => {
      cancelled = true
    }
  }, [address])

  return {
    iconUrl: tokenIconUrl(address),
    symbol: tokenData && tokenData.symbol,
    name: tokenData && tokenData.name,
  }
}

export function UseTokenProvider({ children }) {
  const tokens = useRef(new Map())

  const fetchAndCacheTokenData = useCallback(async address => {
    if (tokens.current.has(address)) {
      return tokens.current.get(address)
    }

    try {
      const tokenData = await fetchTokenData(address)
      tokens.current.set(address, tokenData)
      return tokenData
    } catch (err) {}
  }, [])

  return (
    <UseTokenContext.Provider
      value={{ fetchTokenData: fetchAndCacheTokenData }}
    >
      {children}
    </UseTokenContext.Provider>
  )
}

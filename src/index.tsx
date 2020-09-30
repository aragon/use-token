import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Token } from './types'
import { fetchTokenData, tokenIconUrl } from './utils'

type ProviderProps = {
  children: ReactNode
}

type TokensContext = {
  cachedTokens: Map<string, Token>
  setCachedToken: (address: string, tokenData: Token) => void
  getCachedToken: (address: string) => Token | null
  tokenCached: (address: string) => boolean
}

const UseTokenContext = React.createContext<TokensContext | null>(null)

export function UseTokenProvider({ children }: ProviderProps) {
  const cachedTokens = useRef<TokensContext['cachedTokens']>(new Map())

  const setCachedToken = useCallback<TokensContext['setCachedToken']>(
    (address, tokenData) => {
      cachedTokens.current.set(address, tokenData)
    },
    []
  )

  const getCachedToken = useCallback<TokensContext['getCachedToken']>(
    (address) => {
      return cachedTokens.current.get(address) || null
    },
    []
  )

  const tokenCached = useCallback<TokensContext['tokenCached']>((address) => {
    return cachedTokens.current.has(address)
  }, [])

  return (
    <UseTokenContext.Provider
      value={{
        cachedTokens: cachedTokens.current,
        setCachedToken,
        getCachedToken,
        tokenCached,
      }}
    >
      {children}
    </UseTokenContext.Provider>
  )
}

export function useToken(address = '') {
  const tokenContext = useContext(UseTokenContext)
  const [tokenData, setTokenData] = useState<Token | null>(null)

  if (tokenContext === null) {
    throw new Error(
      'useToken() can only be used inside of <UseTokenProvider />, ' +
        'please declare it at a higher level.'
    )
  }

  const { getCachedToken, setCachedToken, tokenCached } = tokenContext

  const fetchAndCacheTokenData = useCallback(
    async (address: string) => {
      // Grab from cache if previously requested
      if (tokenCached(address)) {
        return getCachedToken(address)
      }

      try {
        const tokenData = await fetchTokenData(address)

        // Cache token to prevent repeat requests in other calls
        setCachedToken(address, tokenData)

        return tokenData
      } catch (err) {
        console.error(err)
        return null
      }
    },
    [getCachedToken, setCachedToken, tokenCached]
  )

  useEffect(() => {
    let cancelled = false

    const update = async () => {
      const data = await fetchAndCacheTokenData(address)

      if (!cancelled) {
        setTokenData(data)
      }
    }

    update()

    return () => {
      cancelled = true
    }
  }, [address, fetchAndCacheTokenData])

  return {
    iconUrl: tokenIconUrl(address),
    symbol: tokenData && tokenData.symbol,
    name: tokenData && tokenData.name,
  }
}

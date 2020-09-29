import { keccak_256 as keccak256 } from 'js-sha3'

const ADDRESS_REGEX = /^0x[0-9a-fA-F]{40}$/
const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000'
const TRUST_WALLET_BASE_URL =
  'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum'
const ETHEREUM_LISTS_BASE_URL =
  'https://raw.githubusercontent.com/ethereum-lists/tokens/master/tokens/eth'

const ETHEREUM_DATA = {
  name: 'Ethereum',
  symbol: 'ETH',
}

function iconUrl(address) {
  if (address === EMPTY_ADDRESS) {
    return `${TRUST_WALLET_BASE_URL}/info/logo.png`
  }
  return `${TRUST_WALLET_BASE_URL}/assets/${address}/logo.png`
}

function tokenDataUrl(address) {
  return `https://raw.githubusercontent.com/ethereum-lists/tokens/master/tokens/eth/${address}.json`
}

export async function fetchTokenData(address) {
  if (address === EMPTY_ADDRESS) {
    return ETHEREUM_DATA
  }

  try {
    address = toChecksumAddress(address.trim())
  } catch (err) {
    throw new Error(`Invalid address: ${address}`)
  }

  try {
    const response = await fetch(tokenDataUrl(address))
    if (!response.ok) {
      throw new Error('Wrong HTTP status')
    }
    return response.json()
  } catch (err) {
    throw err
  }
}

/**
 * Get the address of a token icon
 *
 * @param {string} address The contract address of the token, or the zero address (0x000…) to get the Ethereum icon.
 * @return {string|null} The generated URL, or null if the address is invalid.
 */
export function tokenIconUrl(address = '') {
  try {
    address = toChecksumAddress(address.trim())
  } catch (err) {
    return null
  }

  if (address === EMPTY_ADDRESS) {
    return `${TRUST_WALLET_BASE_URL}/info/logo.png`
  }

  return `${TRUST_WALLET_BASE_URL}/assets/${address}/logo.png`
}

/**
 * Converts to a checksum address
 *
 * This function is taken from web3-utils:
 * https://github.com/ethereum/web3.js/blob/22df832303e349f8ae02f0392e56abe10e1dfaac/packages/web3-utils/src/index.js#L287-L315
 * And was adapted to use js-sha3 rather than soliditySha3.js from web3.js, in
 * order to avoid adding the BN.js and underscore dependencies.
 *
 * @method toChecksumAddress
 * @param {String} address the given HEX address
 * @return {String}
 */
function toChecksumAddress(address) {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    throw new Error(
      'Given address "' + address + '" is not a valid Ethereum address.'
    )
  }

  address = address.toLowerCase().replace(/^0x/i, '')

  const addressHash = keccak256(address).replace(/^0x/i, '')
  let checksumAddress = '0x'

  for (let i = 0; i < address.length; i++) {
    // If ith character is 9 to f then make it uppercase
    if (parseInt(addressHash[i], 16) > 7) {
      checksumAddress += address[i].toUpperCase()
    } else {
      checksumAddress += address[i]
    }
  }

  return checksumAddress
}

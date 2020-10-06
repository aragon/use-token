interface Deprecation {
  new_address?: string
  announcement_url?: string
  time?: string
  migration_type?: string
}

interface Logo {
  src: string
  width?: string
  height?: string
  ipfs_hash?: string
}

interface RedFlags {
  type: string
  comment?: string
  url?: string
}

interface Social {
  blog?: string
  chat?: string
  facebook?: string
  forum?: string
  discord?: string
  github?: string
  gitter?: string
  instagram?: string
  linkedin?: string
  reddit?: string
  slack?: string
  telegram?: string
  twitter?: string
  medium?: string
  bitcointalk?: string
  googleplus?: string
  vimeo?: string
  youtube?: string
}

interface Support {
  email: string
  url?: string
}

export interface Token {
  symbol: string
  name: string
  address: string
  invalid_erc20_symbol?: boolean
  invalid_erc20_decimals?: boolean
  decimals: number
  type?: string
  website?: string
  ens_address?: string
  comment?: string
  logo?: Logo
  support?: Support
  social?: Social
  deprecation?: Deprecation
  address_eip1191?: string
  red_flags?: RedFlags[]
}

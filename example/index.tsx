import 'babel-polyfill'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useToken, UseTokenProvider } from 'use-token'

const TOKENS = [
  '0x0000000000000000000000000000000000000000',
  '0x6b175474e89094c44da98b954eedeac495271d0f',
  '0x744d70fdbe2ba4cf95131626614a1763df805b9e',
  '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
  '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
  '0xcD62b1C403fa761BAadFC74C525ce2B51780b184',
  '0x960b236a07cf122663c4303350609a66a7b288c0',
  '0x0f5d2fb29fb7d3cfee444a200298f468908cc942',
]

function App() {
  return (
    <div>
      <Styles />
      <h1>useToken()</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridGap: '30px',
        }}
      >
        {TOKENS.map((address) => (
          <TokenCard key={address} address={address} />
        ))}
      </div>
    </div>
  )
}

function TokenCard({ address }) {
  const { iconUrl, symbol, name } = useToken(address)
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#333',
        boxShadow: '0 2px 10px rgb(0,0,0,.2)',
        borderRadius: '8px',
      }}
    >
      {iconUrl && (
        <div
          style={{
            padding: '20px',
            background: '#222',
          }}
        >
          <img
            src={iconUrl}
            alt=""
            style={{
              display: 'block',
              margin: '0 auto',
              width: '100px',
              height: '100px',
            }}
          />
        </div>
      )}
      <div
        style={{
          padding: '20px',
        }}
      >
        <div>{symbol || ' '}</div>
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {name || 'Loading…'}
        </div>
      </div>
    </div>
  )
}

function Styles() {
  return (
    <style>
      {`
        body {
          width: 810px;
          padding: 40px;
          margin: 0 auto;
          font-family: sans-serif;
          font-size: 18px;
          line-height: 1.5;
          color: #fff;
          background: #111;
        }
        h1 {
          margin: 0 0 40px;
          font-weight: 400;
          text-align: center;
        }
      `}
    </style>
  )
}

ReactDOM.render(
  <UseTokenProvider>
    <App />
  </UseTokenProvider>,
  document.getElementById('root')
)

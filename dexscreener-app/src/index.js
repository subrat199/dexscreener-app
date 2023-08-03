import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './Breakpoints/breakpoints';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
// Wallet connect 
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'

const chains = [arbitrum, mainnet, polygon]
const projectId = `${process.env.REACT_APP_PROJECT_ID}`

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <WagmiConfig config={wagmiConfig}>
    <Provider store = {store}>
    <ChakraProvider theme = {theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ChakraProvider>
    </Provider>
  </WagmiConfig>

  <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
  </>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
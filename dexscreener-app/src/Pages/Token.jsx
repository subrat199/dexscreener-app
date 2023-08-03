import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import CryptoCard from '../components/CryptoCard'
import { FidgetSpinner } from 'react-loader-spinner';
import { useSelector } from 'react-redux';

const Token = () => {

    const {isLoading, isError, data} =  useSelector(({pairTokenReducer}) => pairTokenReducer)

    console.log(isLoading, isError, data);

    if (isLoading) {
        return <Box mt = {'55px'} boxSizing = 'border-box' pl = {"40px"} display = {'flex'} justifyContent = {'center'}>
                    <FidgetSpinner
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                            ballColors={['#ff0000', '#6c33de', '#0000ff']}
                            backgroundColor="#f42e7a"
                    />
                </Box>
    }


    if (data.length === 0) {
        return <Box mt = '100px'>
            <Text fontSize = {'20px'} textAlign={'center'}>Serch  to see Results</Text>
        </Box>
    }
console.log(data,"data")
  return (
    <Box mt = {'55px'} boxSizing = 'border-box' pl = {"40px"}>
        <Text color = "#F7F9F9" fontFamily = {'Work Sans'} fontSize = {"24px"} fontWeight = {600} lineHeight = {'28px'}>Token Search Results</Text>

        <SimpleGrid fontFamily = {"Poppins"} mt = {'22px'} columns = {{base : 1, "639px" : 2,"1213px" : 3,"1502px" : 4}} columnGap = {'12px'} rowGap = {'29px'} boxSizing = 'border-box' pr = {'32px'} pb = {'30px'}>
            {data.map(({pairCreatedAt, chainId, dexId, pairAddress, baseToken, quoteToken, priceNative, priceUsd}, index) => {
                return <CryptoCard key = {index} pairCreatedAt = {pairCreatedAt} symbol = {chainId.toUpperCase()} dexId = {dexId.length > 15 ? dexId.slice(0,7) : dexId} pairAddress = {`#${pairAddress.slice(0,5)}...`} baseToken = {baseToken} quoteToken = {quoteToken} priceNative = {priceNative} priceUsd = {priceUsd}/>
            })}
        </SimpleGrid>
    </Box>
  )
}

export default Token
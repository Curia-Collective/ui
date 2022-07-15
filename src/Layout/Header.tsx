import { Flex, Heading } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import React from 'react'

export default function Header() {
  return (
    <Flex justifyContent="space-between" alignItems="center" padding="5">
      <Heading color="black" fontSize={'x-large'} fontWeight="bold">
        Curia
      </Heading>
      <ConnectButton />
    </Flex>
  )
}

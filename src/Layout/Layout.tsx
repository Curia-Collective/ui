import React from 'react'
import Head from 'next/head'
import Header from './Header'
import { Flex } from '@chakra-ui/react'

type LayoutProps = {
  title: string
  children?: React.ReactNode
}

export function Layout({ title, children }: LayoutProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="title" content={`Curia - ${title}`} />
        <meta name="description" content="Curia is a decentralised arbitration platform." />
      </Head>
      <Header />
      <Flex as="main" padding="5" minH="90vh" justifyContent="center" alignItems="center">
        {children}
      </Flex>
    </>
  )
}

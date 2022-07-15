import React from 'react'
import { useContractRead } from 'wagmi'
import { LEX_LOCKER_ABI, deployments } from '../constants'

export default function Resolvers() {
  const chainId = 4
  const {
    data: resolvers,
    isError,
    error,
    isLoading,
  } = useContractRead({
    addressOrName: deployments[chainId]['LEX_LOCKER'],
    contractInterface: LEX_LOCKER_ABI,
    functionName: 'resolvers',
    chainId: 4,
    args: ['0xCB0592589602B841BE035e1e64C2A5b1Ef006aa2'],
  })

  console.log('resolvers', resolvers, isError, error)
  return <div>{resolvers}</div>
}

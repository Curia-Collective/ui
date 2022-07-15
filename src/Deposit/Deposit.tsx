import React from 'react'
import { Stack, FormControl, FormLabel, Input, Button, Heading } from '@chakra-ui/react'
import { useContractWrite } from 'wagmi'

import { useForm, Resolver, SubmitHandler } from 'react-hook-form'
import { ethers } from 'ethers'
import { toTimestamp } from '../utils'

import { deployments, LEX_LOCKER_ABI, resolvers } from '../constants/'

type DepositProps = {}

type DepositValues = {
  receiver: string
  token: string
  termination: string
  milestones: string // array of milestone number values (e.g. [1, 2, 3])
}

export function Deposit() {
  const chainId: number = 4
  const {
    data,
    isLoading: isWriting,
    writeAsync,
  } = useContractWrite({
    addressOrName: deployments[chainId]['LEX_LOCKER'],
    contractInterface: LEX_LOCKER_ABI,
    functionName: 'deposit',
    chainId: chainId,
  })

  const { register, handleSubmit } = useForm<DepositValues>()
  const onSubmit: SubmitHandler<DepositValues> = (data) => {
    const { receiver, token, termination, milestones } = data
    const deadline: number = toTimestamp(termination)
    const isNFT: boolean = false
    const details: string = ''
    const resolver = resolvers[chainId]

    try {
      // address receiver,
      // address resolver,
      // address token,
      // uint256[] memory value,
      // uint256 termination,
      // bool nft,
      // string memory details
      console.log('deposit params', [receiver, resolver, token, milestones, deadline, isNFT, details])
      const result = writeAsync({
        args: [receiver, resolver, token, [ethers.utils.parseEther(milestones)], deadline, isNFT, details],
        overrides: {
          gasLimit: 1000000,
          value: ethers.utils.parseEther(milestones),
        },
      })
    } catch (e) {}
  }

  return (
    <Stack
      as="form"
      flexDir={'column'}
      background="gray.200"
      border="1px"
      borderColor="gray.300"
      padding="7"
      borderRadius="md"
      onSubmit={handleSubmit(onSubmit)}
      minW="35rem"
    >
      <Heading>Deposit</Heading>
      <FormControl>
        <FormLabel htmlFor="receiver">Receiver</FormLabel>
        <Input type="text" placeholder="Receiver" size="md" {...register('receiver')} />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="token">Token</FormLabel>
        <Input type="text" placeholder="Token" size="md" {...register('token')} />
      </FormControl>
      <FormControl>
        <FormLabel>Deadline</FormLabel>
        <Input type="datetime-local" placeholder="Deadline" size="md" {...register('termination')} />
      </FormControl>
      <FormLabel>Milestones</FormLabel>
      {/* TODO: Add Field Array for Milestones */}
      {/* TODO: Add Details: description, agreement */}
      <Input type="number" placeholder="100" size="md" {...register('milestones')} />

      <Button type="submit" disabled={isWriting}>
        Deposit
      </Button>
    </Stack>
  )
}

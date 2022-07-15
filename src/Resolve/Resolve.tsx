import React from 'react'
import { FormControl, FormLabel, Stack, Input, Button } from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { deployments, LEX_LOCKER_ABI } from '../constants'
import { useContractWrite } from 'wagmi'
import { ethers } from 'ethers'

type ReleaseValues = {
  registration: number
  depositerAward: string
  receiverAward: string
}

export function Resolve() {
  const { data, writeAsync } = useContractWrite({
    addressOrName: deployments[4]['LEX_LOCKER'],
    contractInterface: LEX_LOCKER_ABI,
    functionName: 'resolve',
    chainId: 4,
  })

  const { register, handleSubmit } = useForm<ReleaseValues>()
  const onSubmit: SubmitHandler<ReleaseValues> = (data) => {
    const { registration, depositerAward, receiverAward } = data
    const details = 'testing'
    try {
      const res = writeAsync({
        args: [registration, ethers.utils.parseEther(depositerAward), ethers.utils.parseEther(receiverAward), details],
        overrides: {
          gasLimit: 1000000,
        },
      })
    } catch (e) {
      console.error(e)
    }
  }
  //   function resolve(
  //     uint256 registration,
  //     uint256 depositorAward,
  //     uint256 receiverAward,
  //     string calldata details
  // ) external payable nonReentrant {
  // require(msg.sender == locker.resolver, "NOT_RESOLVER");
  // require(locker.locked, "NOT_LOCKED");
  // require(depositorAward + receiverAward == remainder, "NOT_REMAINDER");

  return (
    <Stack as="form" background="gray.100" padding="10" onSubmit={handleSubmit(onSubmit)} borderRadius="md">
      <FormControl>
        <FormLabel htmlFor="registration">Registration ID</FormLabel>
        <Input type="number" {...register('registration')} placeholder="1" />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="depositerAward">Depositer Award</FormLabel>
        <Input type="string" {...register('depositerAward')} placeholder="10" />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="receiverAward">Receiver Award</FormLabel>
        <Input type="string" {...register('receiverAward')} placeholder="10" />
      </FormControl>
      <Button type="submit" background="green.500">
        Resolve
      </Button>
    </Stack>
  )
}

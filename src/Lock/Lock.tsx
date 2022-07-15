import React from 'react'
import { FormControl, FormLabel, Stack, Input, Button } from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { deployments, LEX_LOCKER_ABI } from '../constants'
import { useContractWrite } from 'wagmi'
import { ethers } from 'ethers'

type LockValues = {
  registration: number
  why: string
}

export function Lock() {
  const { data, writeAsync } = useContractWrite({
    addressOrName: deployments[4]['LEX_LOCKER'],
    contractInterface: LEX_LOCKER_ABI,
    functionName: 'lock',
    chainId: 4,
  })

  const { register, handleSubmit } = useForm<LockValues>()
  const onSubmit: SubmitHandler<LockValues> = (data) => {
    const { registration, why } = data

    try {
      const res = writeAsync({
        args: [registration, why],
        overrides: {
          gasLimit: 1000000,
        },
      })
    } catch (e) {
      console.error(e)
    }
  }
  //   function lock(uint256 registration, string calldata details) external payable {
  //     Locker storage locker = lockers[registration];
  //     require(msg.sender == locker.depositor || msg.sender == locker.receiver, "NOT_PARTY");
  //     locker.locked = true;
  //     emit Lock(registration, details);
  // }

  return (
    <Stack as="form" background="gray.100" padding="10" onSubmit={handleSubmit(onSubmit)} borderRadius="md">
      <FormControl>
        <FormLabel htmlFor="registration">Registration ID</FormLabel>
        <Input type="number" {...register('registration')} placeholder="1" />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="receiverAward">Why?</FormLabel>
        <Input type="string" {...register('why')} placeholder="10" />
      </FormControl>
      <Button type="submit" background="red.500">
        Lock
      </Button>
    </Stack>
  )
}

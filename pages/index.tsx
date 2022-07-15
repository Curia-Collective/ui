import type { NextPage } from 'next'
import { Layout } from '../src/Layout'
import { Deposit } from '../src/Deposit'

const Home: NextPage = () => {
  return (
    <Layout title="Locker">
      <Deposit />
    </Layout>
  )
}

export default Home

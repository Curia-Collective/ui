import type { NextPage } from 'next'
import { Layout } from '../src/Layout'
import { Create } from '../src/CreateDeposit'

const Home: NextPage = () => {
  return (
    <Layout title="Locker">
      <Create />
    </Layout>
  )
}

export default Home

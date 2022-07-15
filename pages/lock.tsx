import type { NextPage } from 'next'
import { Layout } from '../src/Layout'
import { Lock } from '../src/Lock'

const LockPage: NextPage = () => {
  return (
    <Layout title="Lock Locker">
      <Lock />
    </Layout>
  )
}

export default LockPage

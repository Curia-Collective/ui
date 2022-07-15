import type { NextPage } from 'next'
import { Layout } from '../src/Layout'
import { Resolve } from '../src/Resolve'

const ResolvePage: NextPage = () => {
  return (
    <Layout title="Resolve Locker">
      <Resolve />
    </Layout>
  )
}

export default ResolvePage

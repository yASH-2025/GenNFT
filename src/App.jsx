import { useEffect } from 'react'
import { getAllNFTs ,isWallectConnected } from './Blockchain.Services'
import Alert from './component/Alert'
import Artworks from './component/Artworks'
import CreateNFT from './component/CreateNFT'
import Footer from './component/Footer'
import Header from './component/Header'
import Hero from './component/Hero'
import Loading from './component/Loading'
import ShowNFT from './component/ShowNFT'
import Transactions from './component/Transactions'
import UpdateNFT from './component/updateNFT'

const App = () => {
  useEffect(async () => {
    await isWallectConnected()
    await getAllNFTs()
  }, [])
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-hero">
        <Header />
        <Hero/>
      </div>
      <Artworks/>
      <Transactions />
      <Footer />
      <CreateNFT />
      <Loading />
      <ShowNFT />
      <UpdateNFT />
      <Alert />
    </div>
  )
}

export default App

import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useContext, useEffect } from 'react'
import { VideoJsPlayerOptions } from 'video.js'
import IntroModal from '../components/IntroModal'
import ParameterPanel from '../components/ParameterPanel'
import ParameterUI from '../components/ParameterUI'
import VideoPlayer from '../components/VideoPlayer'
import { BlockchainContext } from '../hooks/useBlockchain'

const streamSource = 'https://livepeercdn.com/hls/47bbpaildwtap9uk/index.m3u8'

const Home: NextPage = () => {
  
  const { provider, connectWallet, disconnectWallet } = useContext(BlockchainContext)

  
  return (
    <div>
      
      <IntroModal />

      {/* Section for video stream, will  */}
      <div className='fixed w-full h-full bg-pink-400 -z-10'>
        <div className='w-full h-full flex justify-center items-center '>
          <VideoPlayer src={streamSource} />
        </div>
      </div>

      {/* UI Settings */}
      <ParameterPanel />

      {provider ? (
        <button
              type="button"
              className="absolute right-2 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-2 sm:text-sm"
              onClick={() => disconnectWallet!()}
          >
              Disconnect
          </button>
      ) : ''}
      

      <footer className='fixed bottom-0 w-full h-8'>
        <div className='max-w-4xl mx-auto px-10 py-2 flex justify-between items-center text-gray-400'>
          <h4 className='text-sm'>IL Art -- Eth NY Hackathon</h4>
          <h5 className='text-xs'>By Jasper Degens</h5>
        </div>
      </footer>
    </div>
  )
}

export default Home

import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { VideoJsPlayerOptions } from 'video.js'
import ParameterPanel from '../components/ParameterPanel'
import ParameterUI from '../components/ParameterUI'
import VideoPlayer from '../components/VideoPlayer'

const streamSource = 'https://livepeercdn.com/hls/47bbpaildwtap9uk/index.m3u8'

const Home: NextPage = () => {
  
  
  
  return (
    <div>
      

      {/* Section for video stream, will  */}
      <div className='fixed w-full h-full bg-pink-400 -z-10'>
        <div className='w-full h-full flex justify-center items-center '>
          <VideoPlayer src={streamSource} />
        </div>
      </div>

      {/* UI Settings */}
      <ParameterPanel />


      <main className='pt-2'>
        <h1 className='w-full text-center text-4xl'>
          IL Art
        </h1>

      </main>

      <footer className='fixed bottom-0 w-full h-8 bg-green-300'>

      </footer>
    </div>
  )
}

export default Home

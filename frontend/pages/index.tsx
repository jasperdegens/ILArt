import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { VideoJsPlayerOptions } from 'video.js'
import VideoPlayer from '../components/VideoPlayer'


const Home: NextPage = () => {
  
  
  
  return (
    <div>
      

      {/* Section for video stream, will  */}
      <div className='fixed w-full h-full bg-pink-400 -z-10'>
        <VideoPlayer />
      </div>



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

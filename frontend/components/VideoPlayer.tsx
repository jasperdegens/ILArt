import { FC, useEffect, useRef } from "react";
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from "video.js";
import 'video.js/dist/video-js.css';


// default options for the video player
const videoPlayerDefaultOptions: VideoJsPlayerOptions = {
    autoplay: true,
    muted: true,
    responsive: true,
    fluid: true,
    sources: [
        {src: "https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8d"}
    ]
}

interface IVideoPlayerProps {
    src?: string
}

const VideoPlayer : FC<IVideoPlayerProps> = ({src}) => {
    
    
    const videoRef = useRef(null)
    const playerRef = useRef<VideoJsPlayer>(null)
    
    
    // Make sure Video.js player is only initialized once
    useEffect(() => {
        if (!playerRef.current) {
            
            const options: VideoJsPlayerOptions = {...videoPlayerDefaultOptions}
            
            // add source if passrd to component
            if (src) {
                options!.sources = [{src: src}]
            }


            const videoElement = videoRef.current;

            if (!videoElement) return;

            const player = videojs(videoElement, options, () => {
                videojs.log('player is ready');
                
                // trigger play -- should autoplay cause muted but just in case
                player.play()
            });
        }

    }, [src, videoRef]);

    // dispose when dismounted
    useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player) {
                player.dispose();
            }
        }
    })

    return (
        <div data-vjs-player>
            <video ref={videoRef} className='video-js vjs-big-play-centered' />
        </div>
    )


}



export default VideoPlayer;
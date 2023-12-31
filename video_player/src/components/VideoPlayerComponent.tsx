import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

import { MediaPlayer, MediaProvider, Track } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';

import { textTracks } from './tracks';


import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const VideoPlayerComponent = () =>
{


    const router = useRouter();
    const  [videoTitle , setVideoTitle] = useState("") 
    const [videoLink , setVideoLink] = useState("");

    useEffect(() =>
    {
        const storageVideoTitle = localStorage.getItem("videoTitle");
        const storageVideoLink = localStorage.getItem("videoLink");
        if(storageVideoTitle !== null && storageVideoLink !== null)
        {
            setVideoLink(storageVideoLink);
            setVideoTitle(storageVideoTitle);            
        }else
        {
            router.push("/")
        }
    } , [])
    
    return(<>
        <div style={{display: 'flex' , justifyContent: 'center' , marginTop: '10px'}}>
            <div style={{height: '400px' , width:'66.66667%'}}>
                <div >
                    <MediaPlayer
                        title={videoTitle}
                        src ={videoLink}
                        >
                        <MediaProvider>
                        {textTracks.map((track ) => (
                            <Track {...track} key={track.src} />
                        ))}
                        </MediaProvider>
                        <DefaultVideoLayout
                        thumbnails="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/storyboard.vtt"
                        icons={defaultLayoutIcons}
                        />
                    </MediaPlayer>
                </div>
                <br />
                <div className='flex justify-end'>
                    <button
                        type="submit"
                        className= "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 "
                        onClick={() =>
                        {
                            localStorage.removeItem('videoLink');
                            localStorage.removeItem('videoTitle');
                            router.push("/");
                        }}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    </>)
}
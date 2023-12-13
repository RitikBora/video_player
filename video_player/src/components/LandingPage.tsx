
import { useState } from 'react';
import  { useRouter } from 'next/router';
import axios from 'axios';

export const LandingPage = () =>
{
  const router = useRouter();
  const [videoLink, setVideoLink] = useState<string>('');
  const [videoTitle , setVideoTitle] = useState<string>('');
  const [videoFile, setVideoFile] = useState<File | null>(null);


  const handleVideoLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoLink(e.target.value);
  };

  const handleVideoTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoTitle(e.target.value);
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setVideoFile(file);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Video details submitted');
    updateChapters();
  };

  const updateChapters = async () =>
  {
    try
    {
      
      let file = videoFile;
      if(file === null)
      {
        file = new File([] , "Empty File");
      }
     
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post('/api/upload', formData);


        if(response.status === 200)
        {
          // localStorage.setItem("videoTitle" , videoTitle);
          // localStorage.setItem("videoLink" , videoLink);
          // router.push("/videoplayer");
        }else
        {
          console.log(response.data.error);
        }
        
    }catch(error : any)
    {
      console.error('Error uploading file:', error.message);
    }
  }
  return (
    <div>
        <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          CineBora Player
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Play videos with chapters
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="videoTitle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Video Link</label>
                <input
                  type="text"
                  name="videoTitle"
                  id="videoTitle"
                  value={videoTitle}
                  onChange={handleVideoTitleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="My video"
                  required
                />
              </div>
              <div>
                <label htmlFor="videoLink" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Video Link</label>
                <input
                  type="text"
                  name="videoLink"
                  id="videoLink"
                  value={videoLink}
                  onChange={handleVideoLinkChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="https://example.com/video.mp4"
                  required
                />
              </div>
              <div>
                <label htmlFor="videoFile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Video File</label>
                <input
                  type="file"
                  name="videoFile"
                  id="videoFile"
                  accept=".vtt"
                  onChange={handleVideoFileChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className='flex justify-center'>
              <button
                type="submit"
                className= "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 "
              >
                Open Video
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
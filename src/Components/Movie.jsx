import React, { useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import axios from 'axios';
import { HeaderContext } from '../context/HeaderContext';
import { data } from 'autoprefixer';
import ReactPlayer from 'react-player';
function Movie() {
  const params =useParams();
  const imdbId =params.imdbID;
  console.log(imdbId);
  const {id} =useContext(HeaderContext);
  const [info,setInfo] =useState([]);
  const [type,setType] =useState([]);
  const [cast,setCast] = useState([]);
  const [video,setVideo] =useState([]);
  const [videos,setVideos] =useState([]);
  const windowWidth = window.innerWidth;

  useEffect(()=>{
    const movie = async ()=>{
    try{
    const data =await fetch(`http://www.omdbapi.com/?i=${imdbId}&apikey=fa7a8c0f`);
    const response = await data.json();
    const genreArray = response.Genre.split(', ').map(genre => genre.trim());
    response.Genre = genreArray;
    setInfo(response);
    setType(genreArray);
    }
   catch(err){
    console.log(err);
   }
  }
  movie();
},[id])
useEffect(() => {
  const fetchMovieData = async () => {
    try {
      const tmdbApiKey = '60ffec931d9a2c91a97fb3290d7fc3fc';
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${imdbId}?api_key=${tmdbApiKey}&append_to_response=videos,credits`
      );
      setCast(response.data.credits.cast);
      console.log(response.data);
      setVideo(response.data.videos.results[0].key);
      setVideos(response.data.videos.results);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };
  fetchMovieData();
}, [id]);
  return (
    <div className='flex flex-col lg:pl-[10%] bg-[#121212] text-white  px-2 w-auto'>
    <div className=' px-2 pt-10'>
    <div className='w-full lg:w-7/12 flex items-center'>
      <h1 className='w-full shrink-0 text-[24px] uppercase font-cinzel font-bold'>{info.Title}</h1>
    <div className='w-full flex items-center justify-center  hidden md:block'>
      <span className='flex font-bold text-[20px]'>Rating:<svg className='px-2  ' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 576 512"><path fill='gold' d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>{info.imdbRating}<span className='opacity-90'>/10</span></span></div>
    </div>
    <div className='flex  text-gray-500'>
    <div className='flex py-2 w-full md:w-6/12 shrink-0'>
      <p className='mx-1 max-w-[80px]'>{info.Year} </p>
      <p className='mx-1 max-w-[80px]'>{info.Rated} </p>
      <p className='mx-1 max-w-[80px]'>{info.Runtime}</p>
      </div>
    </div>
    </div>
    <div className='flex flex-col md:flex-row w-auto '>
    <img className='hidden md:block mx-1 h-[290px] w-[190px] md:h-[373px] order-2 md:order-1  md:items-start bg-cover object-cover' src={info.Poster}></img>
    <div className='order-1 flex '>
    <div className='flex flex-col mx-auto  w-[750px] h-[373px] md:order-2  '>
      
    <ReactPlayer  url={`https://www.youtube.com/watch?v=${video}`}  style={{ maxWidth: '600px' }} width="100%"  />
    </div>
    </div>
    <div>
      
    </div>
    </div>
    <div className='flex md:flex-col'>
      <div className='flex'>
      <img className='block md:hidden  h-[160px] min-w-[120px] md:h-[373px]  bg-cover object-cover' src={info.Poster}></img>
      </div>
      <div className='px-1'>
      <div className='flex flex-wrap overflow-hidden '>
       {type.map((type)=>{
          return <h1 className='px-2  py-[1px] mx-1 my-2 h-[30px] rounded-2xl border ' key={Math.random()*99}>{type}</h1>
        })}
    </div>
    <div className='max-w-[600px] mt-[10px] '>
    <p className=''>{info.Plot}</p>
    <hr className='border-[1px] border-gray-600 my-[12px]'></hr>
    <div className='hidden md:block'>
    <p className=' font-bold'>Director: <span className='text-blue-700 px-4'>{info.Director}</span> </p>
    <hr className='border-[1px] border-gray-600 my-[12px]'></hr>
    <p className=' font-bold'>Writer: <span className='text-blue-700 px-4'>{info.Writer}</span> </p>
    <hr className='border-[1px] border-gray-600 my-[12px]'></hr>
    <p className=' font-bold'>Actors: <span className='text-blue-700 px-4'>{info.Actors}</span> </p>
    </div>
    </div>
    </div>
    </div>
    <p className='flex md:hidden'><span className='flex  font-bold text-[16px]'><svg className='px-2 mt-1 ' xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 576 512"><path fill='gold' d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg><span className='text-secondary font-bold '>{info.imdbRating}</span></span><span className='opacity-80 font-semibold'>/10</span></p>
    <p className='font-bold text-[1.5rem] px-3 py-2'>Cast</p>
    <div className='cast order-3 flex items-center max-w-[600px] overflow-x-scroll py-2 overflow-y-hidden '>
      {cast.map((e)=>{
        return(
          <div  key={e.id} className=' border border-gray-900 shadow-xl shadow-black h-[250px] px-2'>
          <div>
            <img className='h-[175px] min-w-[138px] bg-cover  ' src={`https://image.tmdb.org/t/p/w185${e.profile_path}`}></img>
          </div>
          <div className='w-full flex flex-col justify-center items-center'>
            <h1 className='pl-2 font-bold'>{e.name}</h1>
            <h1 className='pl-2 font-sm'>{e.character}</h1>
          </div>
          </div>
        )
      })}
    </div>
    <div className='flex flex-col order-4 '>
      <div>
      <h1 className='text-[24px] font-semibold'>Videos<span className='text-[12px] px-1 opacity-95 pt-4 '>({videos.length})</span>:</h1>
      </div>
      <div className='flex justify-center items-center w-full md:w-[800px] overflow-x-scroll py-4'>
      {videos.map((video)=>{
        return(
          <div key={video.id} className='px-1 md:px-4'>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${video.key}`} width='200px' height='150px' />
          </div>
        )
      })}
      </div>
    </div>
    </div>
  )
}

export default Movie;
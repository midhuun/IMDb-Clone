import {Route,Routes,BrowserRouter as Router,Link} from 'react-router-dom';
import { useContext, useEffect } from 'react';
import Movie from './Movie';
import { HeaderContext } from '../context/HeaderContext';
 function Content({data}) {
    const {setWishlist,setShowMovie,setId} =useContext(HeaderContext)
    const {Title,Poster,Year,imdbID} = data;
    function addtoList(){
      setWishlist((e)=>[...e,imdbID]);
    }
    function DisplayMovie(){
       setShowMovie(data);
       setId(imdbID);
      
    }
  return (
    
    <div className='py-4 px-2 flex flex-col justify-center items-center '>
    <div className='relative pb-4  shadow-2xl'>
    <Link onClick={DisplayMovie} to={`/movie/${imdbID}`}> <div className=' flex justify-center items-center h-[150px] w-full bg-cover md:h-[300px] lg:h-[350px]   cursor-pointer' >
    <img className='h-[150px] w-auto  bg-cover md:h-[300px] lg:h-[350px]'  src={Poster}></img>
    </div>
    </Link>
    
     <div className='px-2 mt-2 w-[150px]'><Link onClick={DisplayMovie} to={`/movie/${imdbID}`}><h1 className='font-semibold  '>{Title}</h1></Link>
    <p className='mt-2 font-semibold text-[#000080] opacity-90 text-[16px]  w-full flex'>Year: {Year}</p></div>
    
    </div>
     </div>
  )
}
 
 export default Content;
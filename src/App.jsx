import { useState,useEffect,useContext } from 'react';
import Header from './Components/Header';
import './App.css';
import axios from 'axios';
import Movie from './Components/Movie';
import { HeaderContext } from './context/HeaderContext';
import Content from './Components/Content';
import {Route,Routes,BrowserRouter as Router,Link,useLocation} from 'react-router-dom'

function App() {
  const [isHome,setIsHome] =useState(false)
   const {updatedMovie,movie,data,setData} =useContext(HeaderContext)
   const [count,setCount] =useState(1);
   const [results,setResults] =useState(0);
   const location =useLocation();
   const totalPages = Math.ceil(results / 10);
  useEffect(()=>{
    const getMovies = async () =>{
      try{
       const movies = await fetch(`http://www.omdbapi.com/?s=${updatedMovie}&page=${count}&apikey=fa7a8c0f`);
       const response = await movies.json();
       setData(response.Search);
       setResults(response.totalResults)
       
      }
      catch(err){
        console.log(err);
      }
    } 
    getMovies();
  },[updatedMovie,count]);
 
  useEffect(()=>{
      if(window.location.pathname==='/'){
        setIsHome(true)
      }
      else{
        setIsHome(false)
      }
  },[location])
     
  return (
    <div className='h-screen w-full font-poppins'>
    <Header/> 
    <Routes>
    <Route path='/' element=
        {data? 
          <div className='grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:pt-[80px]'>
         { data.map((e) => <Content key={e.imdbID} data={e} />)}
          </div>
         : (
          <div className='h-screen w-full flex items-center justify-center  text-[30px] '>
            No Movies Found ):
          </div>
        )}>
    </Route>
      <Route path='/movie/:imdbID' element={<Movie />}></Route>
    </Routes>
    <div className={`w-full flex justify-around pb-10 ${isHome ? 'block' : 'hidden'}`}>
  <button
    className={`${count === 1 ? 'hover:bg-gray-200' : 'hover:bg-blue-400'} font-semibold  w-[60px] md:w-[120px] py-2  hover:text-secondary transition-all duration-500 bg-white rounded-md shadow-2xl text-primary flex justify-center items-center`}
    onClick={() => setCount(count - 1)} disabled={count === 1}><div className='py-1'><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3V256v41.7L459.5 440.6zM256 352V256 128 96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C4.2 237.5 0 246.5 0 256s4.2 18.5 11.5 24.6l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V352z"/></svg></div> </button>
  <div className="flex items-center">
    <p className="pt-2 font-bold ">Page {count} of {totalPages}</p>
  </div>
  <button
    className={`${count===totalPages?'hover:text-gray-200':'hover:bg-blue-400'} font-semibold flex justify-center items-center w-[60px] md:w-[120px]  hover:text-secondary transition-all duration-500 py-2 bg-white rounded-md shadow-2xl text-primary `}
    onClick={() => setCount(count + 1)}  disabled={count === totalPages}
  ><div className='py-1'><svg className='' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3V256v41.7L52.5 440.6zM256 352V256 128 96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29V352z"/></svg>
  </div></button>
</div>
    </div>
    
  )
}

export default App

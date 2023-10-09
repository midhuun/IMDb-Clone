import { useContext } from "react"
import { HeaderContext } from "../context/HeaderContext";
import { Link,useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png"
function Header() {
  const navigate = useNavigate();
 const {movie,setMovie,setUpdatedMovie} =useContext(HeaderContext);
 const SubmitMovie = (e) =>{
    e.preventDefault();
    navigate('/');
    if(movie==''){
      alert("Please Enter a Movie/Series Name")
    }
    else{
    setUpdatedMovie(movie);
    }
 }
  return (
    <div className="p-3 bg-[#121212] flex w-full justify-center md:justify-between overflow-x-hidden items-center">
    <div className="p-2 px-3">
   <Link to='/'><img className="h-8 w-12" src={Logo}></img></Link> 
    </div>
    <div className="relative">
    <input required className="rounded-lg px-2 p-2 self-center md:self-auto  h-10 w-[180px] md:w-[300px]  "  placeholder="Search" value={movie} onChange={((e)=>{setMovie(e.target.value)})}/>
    <button  className="absolute right-3 top-3" onClick={((e)=>SubmitMovie(e))}><svg xmlns="http://www.w3.org/2000/svg" height="1em"  viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg></button>
    </div>
    <div className="hidden md:block">
      
    </div>
   
    </div>
  )
}

export default Header;
// 60ffec931d9a2c91a97fb3290d7fc3fc
//  Read Access Token:eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGZmZWM5MzFkOWEyYzkxYTk3ZmIzMjkwZDdmYzNmYyIsInN1YiI6IjY0ZjAzNjk5ZGJiYjQyMDBjNGU5ZjBlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PaFU8TMi5dexteYV7qXZ8VXuNOz3T2hcUVpr06ZNzco
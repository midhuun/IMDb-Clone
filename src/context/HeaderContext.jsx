import React, { createContext, useState } from 'react'
export const HeaderContext =createContext();
function HeaderProvider({children}) {
  const [data,setData] =useState([]);
    const [movie,setMovie] = useState("");
    const [updatedMovie,setUpdatedMovie] =useState("fire");
    const [wishlist,setWishlist] =useState([]);
    const [showMovie,setShowMovie] =useState([]);
    const [id,setId] =useState('');
  return (
   <HeaderContext.Provider value={{movie,setMovie,updatedMovie,setUpdatedMovie,wishlist,setWishlist,data,setData,showMovie,setShowMovie,id,setId}}>
   {children}
   </HeaderContext.Provider>
  )
}

export default HeaderProvider;
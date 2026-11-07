import { dummyWishlist } from "@/assets/assets";
import { Product, WishlistContextType } from "@/assets/constants/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const wishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    setLoading(true);
    setWishlist(dummyWishlist);
    setLoading(false);
  };

  // Check if a product is in the wishlist
  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p._id === productId);
  };

  // Add or remove a product from the wishlist
//   const toggleWishlist = (productId: string) => {
//     setWishlist((prev) => {
//       const exists = prev.some((p) => p._id === productId);

//       if (exists) {
//         return prev.filter((p) => p._id !== productId);
//       }

//       // Find the product in your available product data if needed.
//       return prev;
//     });
//   };

const toggleWishlist = (product: Product) => {
  setWishlist((prev) => {
    const exists = prev.some((p) => p._id === product._id);

    if (exists) {
      return prev.filter((p) => p._id !== product._id);
    }

    return [...prev, product];
  }
);
};

//
    // const toggleWishlist=async (productId:string)=>{
    //     return wishlist.some((p)=>p._id === productId);

    // }

    
//
useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <wishlistContext.Provider
      value={{
        wishlist,
        loading,
        isInWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(wishlistContext);

  if (context === undefined) {
    throw new Error(
      "useWishlist must be used within a WishlistProvider"
    );
  }

  return context;
}
// import { dummyWishlist } from "@/assets/assets";
// import { Product, WishlistContextType } from "@/assets/constants/types";
// import { createContext, ReactNode, useContext, useEffect, useState } from "react";


// const wishlistContext=createContext<WishlistContextType | undefined>(undefined);
// export function wishlistProvide({children} : {children: ReactNode}){
//     const [wishlist,setWishlist]=useState<Product[]>([]);
//     const [loading,setLoading]=useState(false);

//     const fetchWishlist=async ()=>{
//         setLoading(true);
//         setWishlist(dummyWishlist);
//         setLoading(false);
//     }
//     const togglewishlist=async (productId:string)=>{
//         return wishlist.some((p)=>p._id === productId);

//     }
//     useEffect(()=>{
//         fetchWishlist();
//     },[])
//     return (

//         <wishlistContext.Provider value={{wishlist,loading,isInWishlist,togglewishlist}}>
//             {children}
//         </wishlistContext.Provider>
//     )

// }

// export function useWishlist(){
//     const context=useContext(wishlistContext);
//     if(context === undefined){
//         throw new Error('use wishlist must be used within a wishlistProvider')
//     }
//     return context;
// }
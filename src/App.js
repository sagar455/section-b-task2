import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] =useState(1);
  
  
  const url = 
  `https://api.unsplash.com/photos/random?client_id=KG11Ji8ZfLZDw-UPFOMz6FkO8JJekN_HtxzFoHh1_bA&count=9&page=${page}`;

  const getImages = async () => {
    await Axios.get(url).then((res) => {
      setImages((prev) => [...prev, ...res.data]);
    }, 400);
  };
  const lazyLoading = async () => {
    console.log("scroll height" + window.innerHeight);
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImages();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", lazyLoading);
    return () => window.removeEventListener("scroll", lazyLoading);
  }, []);
  if (!images) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="App">
      <h1 className="headline">Photo Gallery</h1>
      <div className="grid-container">
        {images.map((image) => {
          return (
            <img
              className="image"
              src={image.urls.regular}
              alt={image.alt_description}
              key={image.id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BsBookmark } from 'react-icons/bs'; 
import { AiOutlineSearch,AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineHome } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";



const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/food/allfood", { withCredentials: true })
      .then(response => {
        console.log(response.data);
        
        setVideos(response.data.foods);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  }, []);

  async function likeVideo(item) {

        const response = await axios.post("http://localhost:4000/api/food/like", { foodId: item._id }, {withCredentials: true})
        console.log(response);
        

        if(response.data.like){
            console.log("Video liked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v))
        }else{
            console.log("Video unliked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v))
        }
        
    }

    async function saveVideo(item) {

        const response = await axios.post("http://localhost:4000/api/food/save", { foodId: item._id }, {withCredentials: true})
        console.log(response);
        

        if(response.data.save){
            console.log("Video saved");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, saveCount: v.saveCount + 1 } : v))
        }else{
            console.log("Video unsave");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, saveCount: v.saveCount - 1 } : v))
        }
        
    }

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory relative pb-20 bg-black">
      {videos.map((video) => (
        <div
          key={video._id}
          className="snap-start relative h-screen w-full flex items-center justify-center"
        >
          {/* Video */}
          <video
            src={video.video}
            className="h-full w-full object-cover"
            preload="metadata"
            autoPlay
            loop
            muted
            playsInline
          ></video>

          {/* Left: Description & Button */}
          <div className="absolute bottom-18 left-4 text-white space-y-3 max-w-xs z-10">
            <p className="text-sm sm:text-base font-medium">{video.description}</p>
            <Link
              to={`/food-partner/${video.foodPartner}`}
              className="bg-white/10 hover:bg-white/30 transition px-4 py-1.5 rounded-md text-sm font-semibold inline-block"
            >
              Visit Store
            </Link>
          </div>

          
          <div className="absolute bottom-24 right-4 flex flex-col items-center gap-6 text-white z-10 bg-transparent">
            <button className="hover:scale-110 transition-transform" onClick={() => likeVideo(video)}>
              <AiOutlineHeart className="text-[28px]" /> {/* Increased from 24px */}
              <p>{video.likeCount || 0}</p>
            </button>
            <button className="hover:scale-110 transition-transform">
              <BiCommentDetail  className="text-[28px]" /> {/* Increased from 24px */}
              <p>4k</p>
            </button>

            <button className="hover:scale-110 transition-transform" onClick={() => saveVideo(video)}>
                <BsBookmark className="text-[24px]" /> {/* Increased from 24px */}
                <p>{video.saveCount || 0}</p>
            </button>
          </div>

        </div>
      ))}

      <nav className="fixed bottom-0 left-0 text-white  h-[55px] right-0 z-50 bg-transparent border-t border-black shadow-md flex justify-around items-center px-4 py-2 sm:hidden">
        <button className="flex flex-col items-center text-[#d9dad3] hover:text-black transition-all">
          <AiOutlineHome  className="text-[28px]" />
          <span className="text-[10px] mt-0.5">Home</span>
        </button>
        <Link to="/saved" className="flex flex-col items-center  text-[#d9dad3] hover:text-black transition-all">
          <BsBookmark className="text-[24px]" />
          <span className="text-[10px] mt-0.5">Saved</span>
        </Link>

        <button className="flex flex-col items-center text-[#d9dad3] hover:text-black transition-all">
          <AiOutlineSearch className="text-[26px]" />
          <span className="text-[10px] mt-0.5">Search</span>
        </button>

      </nav>

    </div>
  );
};

export default Home;

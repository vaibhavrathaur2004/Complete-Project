import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsBookmark } from 'react-icons/bs';
import { AiOutlineHeart, AiOutlineHome, AiOutlineSearch } from 'react-icons/ai';
import { BiCommentDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
const SavedVideos = () => {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:4000/api/food/allsaved", { withCredentials: true })
            .then(response => {
                console.log("Saved Videos: ", response.data);
                setVideos(response.data.savedFoods || []);
            })
            .catch((error) => { console.error("Error fetching saved videos:", error); });
    }, []);
    return (
        <div className="h-screen overflow-y-scroll snap-y snap-mandatory relative pb-20 bg-black">
            {videos.length === 0 ?
                (
                    <p className="text-white text-center pt-10">
                        No saved reels found.
                    </p>
                )
                :
                (videos.map((item) => {
                    const video = item.food;
                    return (
                        <div key={item._id}
                            className="snap-start relative h-screen w-full flex items-center justify-center" >
                            <video src={video.video} className="h-full w-full object-cover"
                                preload="metadata"
                                autoPlay
                                loop
                                muted playsInline >
                            </video>
                            {/* Description */}
                            <div className="absolute bottom-18 left-4 text-white space-y-3 max-w-xs z-10">
                                <p className="text-sm sm:text-base font-medium">
                                    {video.description}
                                </p>
                                <Link to={`/food-partner/${video.foodPartner}`} className="bg-white/20 hover:bg-white/30 transition px-4 py-1.5 rounded-md text-sm font-semibold inline-block" >
                                    Visit Store
                                </Link>
                            </div>


                            {/* Right Buttons */}
                            <div className="absolute bottom-24 right-4 flex flex-col items-center gap-6 text-white z-10 bg-transparent">
                                <button className="hover:scale-110 transition-transform">
                                    <AiOutlineHeart className="text-[28px]" />
                                    <p>{video.likeCount || 0}</p>
                                </button>
                                <button className="hover:scale-110 transition-transform">
                                    <BiCommentDetail className="text-[28px]" />
                                    <p>4k</p>
                                </button>
                                <button className="hover:scale-110 transition-transform">
                                    <BsBookmark className="text-[24px]" />
                                    <p>{video.saveCount || 0}</p>
                                </button>
                            </div>
                        </div>);
                })
                )
            }
            {/* ✅ Bottom Navigation Bar */}
            <nav className="fixed bottom-0 left-0 text-white h-[55px] right-0 z-50 bg-transparent border-t border-black shadow-md flex justify-around items-center px-4 py-2 sm:hidden">
                <Link to="/" className="flex flex-col items-center text-[#d9dad3] hover:text-black transition-all">
                    <AiOutlineHome className="text-[28px]" />
                    <span className="text-[10px] mt-0.5">Home</span>
                </Link>

                <Link to="/saved" className="flex flex-col items-center text-[#d9dad3] hover:text-black transition-all">
                    <BsBookmark className="text-[24px]" />
                    <span className="text-[10px] mt-0.5">Saved</span>
                </Link>

                <Link to="/search" className="flex flex-col items-center text-[#d9dad3] hover:text-black transition-all">
                    <AiOutlineSearch className="text-[26px]" />
                    <span className="text-[10px] mt-0.5">Search</span>
                </Link>

            </nav>


        </div >

    );
};


export default SavedVideos;
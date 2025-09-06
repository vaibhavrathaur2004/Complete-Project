import React, { useState, useEffect,  } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
    const { id } = useParams()
    const [ profile, setProfile ] = useState(null)
    const [ videos, setVideos ] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:4000/api/food-partner/${id}`, { withCredentials: true })
            .then(response => {
                setProfile(response.data.foodpartner)
                setVideos(response.data.foodpartner.fooditems)
            })
    }, [ id ])

    const len = videos.length;
return (
    <main className="p-6 max-w-5xl mx-auto">
      {/* Header Section */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-2">
        {/* Avatar + Info */}
        <div className="flex items-center gap-4">
          <img
            className="w-24 h-24 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60"
            alt="Profile Avatar"
          />

          <div className='flex flex-col gap-1.5'>
            <h1 className="text-2xl font-semibold text-gray-900">
              {profile?.username || 'Loading...'}
            </h1>
            <p className="text-gray-600">{profile?.address}</p>
            <p className="text-gray-600">{profile?.contactNumber}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 justify-between p-2">
          <div className="text-center">
            <span className="block text-sm text-gray-600">Total Meals</span>
            <span className="text-lg font-bold">{len}</span>
          </div>
          <div className="text-center">
            <span className="block text-sm text-gray-600">Customers Served</span>
            <span className="text-lg font-bold">{len * 4 }k</span>
          </div>
        </div>
      </section>

      <hr className="border-t border-gray-200 mb-6" />

      {/* Videos Grid */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Food Items</h2>
        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
          {videos.map((v) => (
            <div key={v._id} className=" overflow-hidden shadow-sm border border-gray-200">
              <video
                className="w-full h-38 object-cover border-black"
                src={v.video}
                muted
                autoPlay
                preload="metadata"
              />
              {/* <div className="p-2">
                <p className="text-sm text-gray-700">{v.name}</p>
              </div> */}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Profile
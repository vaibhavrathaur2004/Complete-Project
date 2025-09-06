import React from 'react'
import { Route,Routes} from 'react-router-dom'
import UserRegister from './pages/UserRegister'
import UserLogin from './pages/UserLogin'
import FoodPartnerRegister from './pages/foodpartner/FoodPartnerRegister'
import FoodPartnerlogin from './pages/foodpartner/FoodPartnerlogin'
import Home from './pages/Home'
import Profile from './pages/foodpartner/Profile'
import CreateFood from './pages/foodpartner/CreateFood'
import SavedVideos from './pages/SavedVideos'

const App = () => {
  return (
    <div >
      <Routes>
        <Route path='/' element={<UserRegister/>}/>
        <Route path='/home' element={<Home/>}/>
        {/* <Route path='/' element={<Home/>}/>
        <Route path='/user-register' element={<UserRegister/>}/> */}
        <Route path='/user-login' element={<UserLogin/>}/>
        <Route path='/foodpartner-register' element={<FoodPartnerRegister/>}/>
        <Route path='/create-food' element={<CreateFood/>}/>
        <Route path='/foodpartner-login' element={<FoodPartnerlogin/>}/>
        <Route path='/food-partner/:id' element={<Profile/>}/>
        <Route path="/saved" element={<SavedVideos />} />
      </Routes>
    </div>
  )
}

export default App
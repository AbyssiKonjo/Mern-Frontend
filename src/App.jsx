import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import './App.css'

//Import Pages
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import Login from './pages/Login'
import SingleWorkout from './pages/SingleWorkout'

const App = () => {
  const {user} = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            {/* If we have a user show home, else go to login */}
            <Route path="/" element={user ? <Home/> : <Navigate to="/login"/>}/>
            {/* If we don't have a user show login, if we do have a user got to home  */}
            <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>
            {/* If we don't have a user show signup, if we do show home */}
            <Route path="/signup" element={!user ? <Signup/> : <Navigate to="/"/>}/>

            {/* If we have a user go to single workout, else go to login */}
            <Route path="/:id" element={user ? <SingleWorkout/> : <Navigate to="/login"/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App

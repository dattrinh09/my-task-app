import './App.css'
import Navbar from './components/Navbar'
import Tasks from './components/Tasks'
import { Route, Routes } from 'react-router-dom'
import SignIn from './components/SignIn'
import Home from './components/Home'
import Categories from './components/Categories'
import PrivateRoutes from './components/PrivateRoutes'
import SignUp from './components/SignUp'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/categories' element={<Categories />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

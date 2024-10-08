
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Header from './components/shared/header/Header'
import Login from './components/authentication/login/Login'
import Register from './components/authentication/register/Register'
import BreweryPage from './components/breweries/brewery-page/BreweryPage'
import BreweryList from './components/breweries/brewery-list/BreweryList'
import BreweryDetails from './components/breweries/brewery-details/BreweryDetails'
import BrewerDashboard from './components/brewer/brewer-dashboard/BrewerDashboard'
import BrewerPage from './components/brewer/brewer-page/BrewerPage'
import AddBrewery from './components/brewer/add-brewery/AddBrewery'
import BrewerProfile from './components/brewer/brewer-profile/BrewerProfile'


function App() {

  return (
    <Router>
      <Header />

      <main className="container mt-4">
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/breweries' element={<BreweryPage />}>
            <Route index element={<BreweryList />} />
            <Route path=':breweryId' element={<BreweryDetails />} /> 
          </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/brewers' element={<BrewerPage/>}>
          <Route path='' element={<BrewerDashboard/>}/>
          <Route path='add' element= {<AddBrewery/>}/>
          <Route path=':brewerId' element={<BrewerProfile/>}/>


        </Route>

      </Routes>
      </main>

      <footer>
        &copy; getTapped 2024
      </footer>

    </Router>
  )
}

export default App

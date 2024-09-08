/* eslint-disable no-unused-vars */
import './App.css'
import HomePage from "./components/HomePage"
import AboutUs from "./components/about-us/AboutUs"
import ProgramPage from "./components/Program-Page/ProgramPage"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {

  return (
    <Router>
      <Routes>
        <Route exact  path="/" element={<HomePage />}/>
      </Routes>
      <Routes>
        <Route exact  path="about-us" element={<AboutUs />}/>
      </Routes>
      <Routes>
        <Route exact  path="program-page" element={<ProgramPage />}/>
      </Routes>
    </Router>
  )
}

export default App

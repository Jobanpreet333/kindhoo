import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import{BrowserRouter,Routes,Route} from "react-router";
function App() {
  return (
   <BrowserRouter>
   <Navbar/>
   <Routes>

    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;

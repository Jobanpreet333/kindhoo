import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginContext from './contexts/UserContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Sign from './components/Sign';
import Need from './components/Need';
import Lend from './components/Lend';
import Feedback from './components/Feedback';
import Chat from './components/Chat';
import Profile from './components/Profile';
import NotificationsContext from './contexts/NotificationsContext';





function AppContent() {
  const location = useLocation();
  const isChatPage = location.pathname === "/chat";

const excludedPaths = ["/chat", "/profile"]; // Add more paths here

const shouldShowNavbar = !excludedPaths.includes(location.pathname);
  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Login />} />
        <Route path='/sign' element={<Sign />} />
         <Route path='/needhelp' element={<Need />} /> 
        <Route path='/lendhelp' element={<Lend />} />
        <Route path='/feedback' element={<Feedback />} />
        <Route path='/profile' element={<Profile />} />
         <Route path='/chat/:userId' element={<Chat />} />

      </Routes>

      {!isChatPage && <Footer />}
    </>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <NotificationsContext.Provider value={{ notifications, setNotifications }}>
      <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser }}>

        <BrowserRouter>
          <AppContent />
        </BrowserRouter>

      </LoginContext.Provider>
     </NotificationsContext.Provider>
  );
}

export default App;

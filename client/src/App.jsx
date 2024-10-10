import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Contact } from './pages/Contact';
import { Navbar } from './components/Navbar';
import { Logout } from './pages/Logout';
import { useAuth } from '../tokens/storeTokens';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const PrivateRoute = ({ element: Element }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Element /> : <Navigate to="/login" />;
};

const App = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <BrowserRouter>
        {isLoggedIn && <Navbar />} 
        <Routes>
      
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<PrivateRoute element={Home} />} />
          <Route path="/about" element={<PrivateRoute element={About} />} />
          <Route path="/contact" element={<PrivateRoute element={Contact} />} />

         
          <Route path="/logout" element={<Logout />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
        />
      </BrowserRouter>
    </>
  );
};

export default App;

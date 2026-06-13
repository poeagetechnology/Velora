import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import WhatsAppFloat from './Components/WhatsAppFloat';
import Home from './Pages/Home';
import About from './Pages/About';
import Product from './Pages/Product';
import Contact from './Pages/Contact';
import Calculator from './Pages/Calculator';
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminDashboard from './Pages/Admin/AdminDashboard';

function AppLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="App">
      {!isAdmin && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/products' element={<Product />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/calculator' element={<Calculator />} />
        <Route path='/admin' element={<AdminLogin />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
      </Routes>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppFloat />}
    </div>
  );
}

function App() {
  return <AppLayout />;
}

export default App;

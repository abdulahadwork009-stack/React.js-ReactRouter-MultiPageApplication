import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />

        
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/products" element={<Products />} />
    
          <Route path="/products/:id" element={<ProductDetails />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="mt-24 bg-plum-950 px-4 py-8 text-center text-sm text-plum-300">
        © {new Date().getFullYear()} Bazaar. A React Router practice project with live data from
        DummyJSON.
      </footer>
    </div>
  );
}
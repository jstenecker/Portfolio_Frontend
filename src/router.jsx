// Navigates between pages
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Navbar from "./components/navbar/Navbar";


const AppRouter = () => {
  return (
    <Router>
      {/* Navbar appears on all pages */}
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />


        {/* Fallback for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

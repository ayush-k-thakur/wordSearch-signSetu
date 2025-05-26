import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddWord from "./pages/AddWord";
import { ToastContainer, toast } from 'react-toastify';
import WordDetails from "./components/WordDetails";

export default function App() {
  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddWord />} />
        <Route path="/word/:id" element={<WordDetails />} />
        {/* 
          You can add an Edit page later, example:
          <Route path="/edit/:id" element={<EditWord />} /> 
        */}
      </Routes>
    </Router>
  );
}

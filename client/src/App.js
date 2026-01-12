import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Jela from "./pages/Jela";
import SlanaJela from "./pages/SlanaJela";
import SlatkaJela from "./pages/SlatkaJela";
import ZdravaJela from "./pages/ZdravaJela";
import Pica from "./pages/Pica";

import ListaRecepata from "./pages/ListaRecepata";
import DodajRecept from "./pages/dodajRecept";
import GalerijaUpload from "./pages/GalerijaUpload";
import Galerija from "./pages/Galerija";

import ReceptDetalji from "./pages/ReceptDetalji";


import Prijava from "./pages/Prijava";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* JELA */}
        <Route path="/jela" element={<Jela />} />
        <Route path="/jela/slana" element={<SlanaJela />} />
        <Route path="/jela/slatka" element={<SlatkaJela />} />
        <Route path="/jela/lagano-zdravo" element={<ZdravaJela />} />
        <Route path="/jela/pica" element={<Pica />} />

        {/* LISTA RECEPATA */}
        <Route
          path="/jela/:category/:subCategory"
          element={<ListaRecepata />}
        />

        {/* AUTH */}
        <Route path="/prijava" element={<Prijava />} />
        <Route path="/registracija" element={<Register />} />
<Route
  path="/dodaj-recept"
  element={
    <ProtectedRoute>
      <DodajRecept />
    </ProtectedRoute>
  }
/>

 
<Route path="/galerija/dodaj" element={<GalerijaUpload />} /> 
        
<Route path="/galerija" element={<Galerija />} />
<Route path="/recept/:id" element={<ReceptDetalji />} />


      </Routes>
    </Router>
  );
}

export default App;

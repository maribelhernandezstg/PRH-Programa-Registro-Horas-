import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Excel from "../pages/Excel";
import Asesores from "../pages/Asesores";
import Asesorados from "../pages/Asesorados";
import Asesorias from "../pages/Asesorias";
import Reportes from "../pages/Reportes";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/excel" element={<Excel />} />
    <Route path="/asesores" element={<Asesores />} />
    <Route path="/asesorados" element={<Asesorados />} />
    <Route path="/asesorias" element={<Asesorias />} />
    <Route path="/reportes" element={<Reportes />} />
  </Routes>
);

export default AppRouter;

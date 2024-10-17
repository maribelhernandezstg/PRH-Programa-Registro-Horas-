import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Excel from '../pages/Excel';
import Asesores from '../pages/Advisors';
import Asesorados from '../pages/Advisees';
import Asesorias from '../pages/Advices';
import Reportes from '../pages/Reports';

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

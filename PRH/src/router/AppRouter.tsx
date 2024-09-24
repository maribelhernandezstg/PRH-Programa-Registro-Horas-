import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Excel from "../pages/Excel";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/excel" element={<Excel />} /> {"../pages/Excel"}
    </Routes>
  </BrowserRouter>
);

export default AppRouter;

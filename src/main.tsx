import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import "./index.css";
import Login from "@/layout/login/Login";
import Home from "@/layout/home/Home";
import Dashboard from "@/page/home/features/Dashboard/Dashboard";
import StaffManagement from "@/page/home/features/StaffManagement/StaffManagement";
import Addpatient from "@/page/home/features/Patient/Addpatient";
import PatientManagement from "./page/home/features/Patient/PatientManagement";
import Reserveschart from "@/page/home/features/Reserveschart";
import Refer from "@/page/home/features/Refer";
import PatientInfo from "@/page/home/features/Patient/Patientinfo";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="home" element={<Home />}>
        <Route path="/home" element={<Dashboard />} />
        <Route path="staffmanagement" element={<StaffManagement />} />
        <Route path="patientmanagement/addpatient" element={<Addpatient />} />
        <Route path="patientmanagement" element={<PatientManagement />} />
        <Route path="patient/:dn" element={<PatientInfo />} />
        <Route path="chartreserve" element={<Reserveschart />} />
        <Route path="refer" element={<Refer />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Flex from "@/components/Flex";
import Header from "@/page/home/header/Header";
import { useEffect, useState } from "react";
import { ErrorModal } from "@/components/Modal";

function Home() {
  const nav = useNavigate();
  const location = useLocation();
  const roleName = sessionStorage.getItem("roleName");
  const token = sessionStorage.getItem("token");

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!token) {
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        nav("/", { replace: true });
      }, 3000);
      return;
    } else {
      if (location.pathname === "/home") {
        if (roleName === "Administrator") {
          nav("/home", { replace: true });
        } else if (roleName === "เวชระเบียน") {
          nav("/home/patientmanagement", { replace: true });
        }
      }
    }
  }, [token, location.pathname, nav, roleName]);

  return (
    <Flex
      direction="column"
      className="lg:flex-row lg:h-screen lg:overflow-hidden"
    >
      <Header />
      <Flex className="w-full h-full p-[16px] md:p-[20px] lg:p-[42px] lg:overflow-y-auto">
        <Outlet />
      </Flex>
      {showModal && (
        <ErrorModal
          message="กรุณาเข้าสู่ระบบก่อนเข้าใช้งาน"
          isVisible={showModal}
        />
      )}
    </Flex>
  );
}

export default Home;

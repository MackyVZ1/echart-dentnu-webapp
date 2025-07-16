import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Flex from "@/components/Flex";
import Text from "@/components/Text";

import DentImg from "@/assets/png/dentnu_logo.png";

import { colors } from "@/theme/theme";
import axios from "axios";
import { SuccessModal, ErrorModal } from "@/components/Modal";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CircleGaugeIcon,
  LogOutIcon,
  MenuIcon,
  UsersIcon,
  X,
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Header() {
  const [isActive, setActive] = useState<boolean>(false);
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [activeNavIndex, setActiveNavIndex] = useState<number | null>(null);

  const location = useLocation();
  const nav = useNavigate();

  const users = sessionStorage.getItem("users");
  const roleName = sessionStorage.getItem("roleName");

  const [selectedRole, setSelectedRole] = useState<string>(
    sessionStorage.getItem("roleName") || ""
  );

  const handleNavbar = () => {
    setActive(!isActive);
  };

  const handleNavbarClick = (index: number, func: () => void) => {
    setActiveNavIndex(index);
    func();
  };

  const handleNavbarClickMobile = (index: number, func: () => void) => {
    setActiveNavIndex(index);
    func();
    setActive(!isActive);
  };

  const handleSignout = async () => {
    const token = sessionStorage.getItem("token");
    try {
      await axios.post(
        `${API_BASE_URL}/api/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setModalOn(true);
      sessionStorage.clear();
      setTimeout(() => {
        setModalOn(false);
        nav("/");
      }, 1000);
    } catch (e: any) {
      let errorMessage = e?.response?.data?.message;
      console.error(errorMessage);
      if (errorMessage == "Token not found.") {
        errorMessage = "ไม่พบโทเค็น";
      } else errorMessage = "เซิร์ฟเวอร์ขัดข้อง";
      setError(errorMessage);
      setModalOn(true);

      setTimeout(() => {
        setError("");
        setModalOn(false);
      }, 1000);
    }
  };

  const roleOptions = [
    { value: "Administrator", label: "ผู้ดูแลระบบ" },
    { value: "ระบบนัดหมาย", label: "ระบบนัดหมาย" },
    { value: "การเงิน", label: "การเงิน" },
    { value: "เวชระเบียน", label: "เวชระเบียน" },
    { value: "อาจารย์", label: "อาจารย์" },
    { value: "ปริญญาตรี", label: "ปริญญาตรี" },
    { value: "ระบบยา", label: "ระบบยา" },
    { value: "ผู้ใช้งานทั่วไป", label: "ผู้ใช้งานทั่วไป" },
    { value: "ปริญญาโท", label: "ปริญญาโท" },
    { value: "RequirementDiag", label: "RequirementDiag" },
    { value: "หัวหน้าผู้ช่วยทันตแพทย์", label: "หัวหน้าผู้ช่วยทันตแพทย์" },
    { value: "ผู้ช่วยทันตแพทย์", label: "ผู้ช่วยทันตแพทย์" },
  ];

  const allFeatures = [
    {
      icon: <CircleGaugeIcon color="white" />,
      func: () => nav("/home"),
      desc: "แดชบอร์ด",
      roles: ["Administrator"],
    },
    {
      icon: <UsersIcon color="white" />,
      func: () => nav("/home/staffmanagement"),
      desc: "จัดการข้อมูลเจ้าหน้าที่",
      roles: ["Administrator"],
    },
    {
      icon: <UsersIcon color="white" />,
      func: () => nav("/home/patientmanagement"),
      desc: "จัดการข้อมูลคนไข้",
      roles: ["เวชระเบียน"],
    },
    {
      icon: <LogOutIcon color="white" />,
      func: handleSignout,
      desc: "ลงชื่อออก",
      roles: [
        "Administrator",
        "ระบบนัดหมาย",
        "การเงิน",
        "เวชระเบียน",
        "อาจารย์",
        "ปริญญาตรี",
        "ระบบยา",
        "ผู้ใช้งานทั่วไป",
        "ปริญญาโท",
        "RequirementDiag",
        "หัวหน้าผู้ช่วยทันตแพทย์",
        "ผู้ช่วยทันตแพทย์",
      ],
    },
  ];

  const navbarList = allFeatures.filter((item) =>
    item.roles.includes(selectedRole)
  );

  // ฟังก์ชันหาค่า active index จาก path ปัจจุบัน
  const getActiveIndexFromPath = (path: string) => {
    const pathToFeatureMap = {
      "/home": "แดชบอร์ด",
      "/home/dashboard": "แดชบอร์ด",
      "/home/staffmanagement": "จัดการข้อมูลเจ้าหน้าที่",
      "/home/patientmanagement": "จัดการข้อมูลคนไข้",
      "/home/searchpatient": "ค้นหาคนไข้",
      "/home/chartreserve": "จอง/คืนชาร์ต",
      "/home/refer": "Refer",
    };

    const featureDesc = pathToFeatureMap[path as keyof typeof pathToFeatureMap];
    if (!featureDesc) return null;

    return allFeatures.findIndex((item) => item.desc === featureDesc);
  };

  useEffect(() => {
    const path = location.pathname;
    const activeIndex = getActiveIndexFromPath(path);

    // ตรวจสอบว่า feature ที่จะ active นั้นมีอยู่ใน navbarList ของ role ปัจจุบันหรือไม่
    if (activeIndex !== -1 && activeIndex !== null) {
      const activeFeature = allFeatures[activeIndex];
      const isFeatureAvailable = navbarList.some(
        (item) => item.desc === activeFeature.desc
      );

      if (isFeatureAvailable) {
        setActiveNavIndex(activeIndex);
      } else {
        // ถ้า feature ไม่ available ใน role ปัจจุบัน ให้เซ็ตเป็น null
        setActiveNavIndex(null);
      }
    } else {
      setActiveNavIndex(null);
    }
  }, [selectedRole, location.pathname, navbarList]);

  return (
    <>
      {/******** Mobile *********/}
      <Flex
        className={`sticky top-0 z-50 p-[20px] w-full h-[75px] bg-[#4B006E] shadow-[#75389b]  shadow-lg
          md:h-[100px] md:justify-start md:gap-6
          xl:hidden`}
        alignItems="center"
        justifyContent="between"
      >
        <Flex
          className="bg-[#6b039b] p-2 rounded-xl md:w-[62px] md:h-[62px] "
          alignItems="center"
          justifyContent="center"
          onClick={handleNavbar}
        >
          <MenuIcon color="white" />
        </Flex>
        <Flex className="gap-[6px]" alignItems="center">
          <Text medium className="text-white text-[22px] md:text-[32px]">
            e-Chart |
          </Text>
          <Text medium className="text-white text-[18px] md:text-[28px]">
            ยินดีต้อนรับ, {users}
          </Text>
        </Flex>
      </Flex>

      {/******** Navbar Mobile ********/}
      <Flex
        className={`fixed top-0 left-0 w-screen h-screen bg-white/95 z-50 px-8 py-8 transition-transform duration-300 ease-in-out gap-[16px]
             ${isActive ? "translate-x-0" : "-translate-x-full"}
             `}
        direction="column"
      >
        <Flex
          onClick={handleNavbar}
          className="cursor-pointer"
          justifyContent="end"
        >
          <X />
        </Flex>
        <Flex justifyContent="center" className="rounded-4xl ">
          <img src={DentImg} alt="Logo" className="w-[150px]" />
        </Flex>
        <Flex alignItems="center" justifyContent="center" className="gap-[8px]">
          <Text className="text-black">บทบาท:</Text>
          {roleName === "Administrator" ? (
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>บทบาท</SelectLabel>
                  {roleOptions.map((option, index) => (
                    <SelectItem key={index} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <Text>{roleName}</Text>
          )}
        </Flex>
        <ul className="flex flex-col gap-[8px]">
          {navbarList.map((list, index) => {
            // ตรวจสอบ index จริงใน allFeatures
            const realIndex = allFeatures.findIndex(
              (item) => item.desc === list.desc
            );
            return (
              <li key={index}>
                <Button
                  size={"sm"}
                  className={`w-full ${
                    activeNavIndex === realIndex
                      ? "bg-[#7900B2] text-white"
                      : ""
                  }`}
                  onClick={() => handleNavbarClickMobile(realIndex, list.func)}
                >
                  <Flex alignItems="center" className="gap-[8px]">
                    {list.icon}
                    <Text className="md:text-[20px]">{list.desc}</Text>
                  </Flex>
                </Button>
              </li>
            );
          })}
        </ul>
      </Flex>

      {/******** Desktop ********/}
      <Flex
        justifyContent="between"
        className={`bg-[#4B006E] relative hidden xl:flex px-6 py-4 transition-all duration-300 h-screen shadow-[${colors.primary}] shadow-xl`}
        direction="column"
      >
        <Flex direction="column" className="gap-[28px]">
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            className={`p-5 gap-[8px]`}
          >
            <Text
              bold
              className={`text-white text-shadow-sm text-shadow-black/40 text-[24px]`}
            >
              e-Chart
            </Text>
            <img
              src={DentImg}
              alt="Logo"
              className="w-[150px] h-[150px] rounded-full bg-white object-cover"
            />
            <Text semibold className="text-white text-[24px]">
              {users}
            </Text>
            <Flex alignItems="center" className="gap-[8px]">
              <Text className="text-white ">{"บทบาท:"}</Text>
              {roleName === "Administrator" ? (
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="border-[#8105bb]">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>บทบาท</SelectLabel>
                      {roleOptions.map((option, index) => (
                        <SelectItem key={index} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <Text className="text-white">{roleName}</Text>
              )}
            </Flex>
          </Flex>
          <ul className={`flex flex-col gap-[16px] hover:cursor-pointer`}>
            {navbarList.map((list, index) => {
              if (list.desc === "ลงชื่อออก") return null;
              const realIndex = allFeatures.findIndex(
                (item) => item.desc === list.desc
              );
              return (
                <li
                  key={index}
                  className={`py-2 px-1 rounded-lg transition-all transform duration-200 hover:bg-[#7900B2] ${
                    activeNavIndex === realIndex
                      ? "bg-[#7900B2] text-white"
                      : ""
                  }`}
                  onClick={() => handleNavbarClick(realIndex, list.func)}
                >
                  <Flex alignItems="center" className={`gap-[8px]`}>
                    {list.icon}
                    <Text className="text-white text-[20px]">{list.desc}</Text>
                  </Flex>
                </li>
              );
            })}
          </ul>
        </Flex>
        <Flex direction="column" className="gap-[12px]">
          <Flex className="py-0.5 bg-white"></Flex>
          <Flex
            className={`p-2 rounded-lg  transition-all transform duration-200 hover:bg-[#7900B2] hover:cursor-pointer`}
          >
            <Flex
              alignItems="center"
              className="gap-[8px]"
              onClick={handleSignout}
            >
              <LogOutIcon color="white" />
              <Text medium className="text-white text-[20px]">
                ลงชื่อออก
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      {modalOn && !error && (
        <SuccessModal message="ลงชื่อออกสำเร็จ" isVisible={modalOn} />
      )}
      {modalOn && !!error && <ErrorModal message={error} isVisible={modalOn} />}
    </>
  );
}

export default Header;

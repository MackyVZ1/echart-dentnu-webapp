import Flex from "@/components/Flex";
import Text from "@/components/Text";
import { Search, CirclePlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Patienttable from "./Patienttable";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/Loading";

function PatientManagement() {
  const [keyword, setKeyword] = useState<string>(""); // State สำหรับ Keyword Search
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleAddButton = () => {
    setLoading(true);
    setTimeout(() => {
      nav("/home/patientmanagement/addpatient");
    }, 1000); // Simulate a network request
  };

  return (
    <Flex direction="column" className=" gap-[42px] w-full">
      <Flex
        direction="column"
        alignItems="center"
        className="lg:flex-row gap-6 "
      >
        <Text className="lg:text-[24px] lg:min-w-[120px]">ค้นหาคนไข้</Text>

        <Flex
          alignItems="center"
          className="p-2 border-[3px] border-[#4B006E] rounded-[8px] w-full h-full"
        >
          <Search color="#4B006E" />
          <Input
            name="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="DN, ชื่อ - สกุล, เลขประจำตัวประชาชน"
            className="border-none focus:outline-none focus-visible:ring-0 shadow-none w-full flex-1"
          />
        </Flex>

        <Button size={"sm"} className="max-lg:w-full" onClick={handleAddButton}>
          <CirclePlusIcon />
          <Text medium className="md:text-[18px] lg:text-[20px]">
            เพิ่มคนไข้ใหม่
          </Text>
        </Button>
      </Flex>
      <Patienttable keyword={keyword} />

      {loading && <Loading isOpen message="กำลังโหลดไปหน้าเพิ่มคนไข้ใหม่" />}
    </Flex>
  );
}

export default PatientManagement;

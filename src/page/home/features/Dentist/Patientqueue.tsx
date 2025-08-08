import Flex from "@/components/Flex";
import { useState } from "react";
import Patientqueuetable from "./Patientqueuetable";

function Patientqueue() {
  const roleName = sessionStorage.getItem("roleName");
  const [tabActive, setTabactive] = useState<string>(roleName ?? "");

  const handleActiveTab = (type: string) => {
    setTabactive(type);
  };

  return (
    <Flex direction="column" className="w-full gap-[20px]">
      <Flex
        direction="row"
        className={`gap-[8px] items-center ${
          roleName == "ปริญญาตรี" || roleName == "ปริญญาโท" ? "hidden" : ""
        }`}
      >
        <Flex
          className={`lg:text-[20px] font-bold transform transition-all duration-300 ${
            tabActive === "อาจารย์"
              ? "text-purple-700 hover:text-purple-700 cursor-default"
              : "text-gray-600 hover:text-purple-400 cursor-pointer"
          }`}
          onClick={() => handleActiveTab("อาจารย์")}
        >
          คนไข้อาจารย์
        </Flex>
        <Flex className="p-0.5 bg-gray-400"></Flex>
        <Flex
          className={`lg:text-[20px] font-bold transform transition-all duration-300 ${
            tabActive === "เคสนิสิต"
              ? "text-purple-700 hover:text-purple-700 cursor-default"
              : "text-gray-600 hover:text-purple-400 cursor-pointer"
          }`}
          onClick={() => handleActiveTab("เคสนิสิต")}
        >
          เคสนิสิต
        </Flex>
      </Flex>
      {tabActive === "อาจารย์" ? (
        <Patientqueuetable teacherMode />
      ) : tabActive === "ปริญญาตรี" || tabActive === "ปริญญาโท" ? (
        <Patientqueuetable studentMode />
      ) : (
        <Patientqueuetable />
      )}
    </Flex>
  );
}

export default Patientqueue;

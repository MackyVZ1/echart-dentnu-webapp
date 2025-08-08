/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Flex from "@/components/Flex";
import Text from "@/components/Text";
import { API_BASE_URL } from "@/page/login/LoginCard";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

type TreatmentHistory = {
  screeningId: number;
  dn: string;
  sys: number;
  dia: number;
  pr: number;
  temperature: number;
  treatmentUrgency: number;
  bloodpressure: boolean;
  diabete?: boolean;
  heartdisease?: boolean;
  thyroid?: boolean;
  stroke?: boolean;
  immunodeficiency?: boolean;
  pregnant?: 0;
  other?: string;
  createdAt: Date;
  updateAt: Date;
  drugName?: string;
  drugDesc?: string;
};

interface Props {
  dn: string | undefined | null;
}

function Treatmenthistory({ dn }: Props) {
  const [treatmentHistory, setTreatmentHistory] = useState<TreatmentHistory[]>(
    []
  );
  const treatmentHistoryFetch = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(
        `${API_BASE_URL}/api/screeningrecord/${dn}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response?.data);
      setTreatmentHistory(response?.data);
    } catch (e: any) {
      console.error(e?.response);
    }
  };

  useEffect(() => {
    treatmentHistoryFetch();
  }, []);
  return (
    <Flex
      direction="column"
      className="border border-[#AFAFAF] rounded-[16px] w-full h-full gap-[30px] p-6 lg:p-[24px]"
    >
      <Flex>
        <Text bold className="text-[18px] lg:text-[24px]">
          ประวัติการรักษา
        </Text>
      </Flex>
      <Flex direction="column" className="gap-4">
        {/* {(treatmentHistory ?? [])?.map((treatment) => (
          <Flex
            key={treatment.screeningId}
            className="gap-4 transform transition-all duration-200 hover:p-2 rounded-lg hover:bg-[#4B006E] hover:text-white hover:cursor-pointer"
          >
            {dayjs(treatment.createdAt).format("DD/MM/YYYY")}
          </Flex>
        ))} */}
        <Flex className="gap-4 transform transition-all duration-200 hover:p-2 rounded-lg hover:bg-[#4B006E] hover:text-white hover:cursor-pointer">
          <Text bold className="lg:text-[20px]">
            03/04/2567
          </Text>
          <Text className="lg:text-[20px]">ผ่าฟันคุดซี่ 18</Text>
        </Flex>
        <Flex className="gap-4 transform transition-all duration-200 hover:p-2 rounded-lg hover:bg-[#4B006E] hover:text-white hover:cursor-pointer">
          <Text bold className="lg:text-[20px]">
            03/04/2567
          </Text>
          <Text className="lg:text-[20px]">ผ่าฟันคุดซี่ 18</Text>
        </Flex>
        <Flex className="gap-4 transform transition-all duration-200 hover:p-2 rounded-lg hover:bg-[#4B006E] hover:text-white hover:cursor-pointer">
          <Text bold className="lg:text-[20px]">
            03/04/2567
          </Text>
          <Text className="lg:text-[20px]">ผ่าฟันคุดซี่ 18</Text>
        </Flex>
        <Flex className="gap-4 transform transition-all duration-200 hover:p-2 rounded-lg hover:bg-[#4B006E] hover:text-white hover:cursor-pointer">
          <Text bold className="lg:text-[20px]">
            03/04/2567
          </Text>
          <Text className="lg:text-[20px]">ผ่าฟันคุดซี่ 18</Text>
        </Flex>
        <Flex className="gap-4 transform transition-all duration-200 hover:p-2 rounded-lg hover:bg-[#4B006E] hover:text-white hover:cursor-pointer">
          <Text bold className="lg:text-[20px]">
            03/04/2567
          </Text>
          <Text className="lg:text-[20px]">ผ่าฟันคุดซี่ 18</Text>
        </Flex>
        <Flex className="gap-4 transform transition-all duration-200 hover:p-2 rounded-lg hover:bg-[#4B006E] hover:text-white hover:cursor-pointer">
          <Text bold className="lg:text-[20px]">
            03/04/2567
          </Text>
          <Text className="lg:text-[20px]">ผ่าฟันคุดซี่ 18</Text>
        </Flex>
        <Flex className="gap-4 transform transition-all duration-200 hover:p-2 rounded-lg hover:bg-[#4B006E] hover:text-white hover:cursor-pointer">
          <Text bold className="lg:text-[20px]">
            03/04/2567
          </Text>
          <Text className="lg:text-[20px]">ผ่าฟันคุดซี่ 18</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Treatmenthistory;

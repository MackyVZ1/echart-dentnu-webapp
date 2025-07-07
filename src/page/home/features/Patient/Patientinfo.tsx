import Flex from "@/components/Flex";
import Text from "@/components/Text";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import xray from "@/assets/jpg/x-ray.jpg";

type Patient = {
  dn: string | null;
  titleTh: string | null;
  nameTh: string | null;
  surnameTh: string | null;
  titleEn: string | null;
  nameEn: string | null;
  surnameEn: string | null;
  sex: string | null;
  maritalStatus: string | null;
  idNo: string | null;
  birthDate: string | null;
  age: string | null;
  occupation: string | null;
  address: string | null;
  phoneHome: string | null;
  phoneOffice: string | null;
  emerNotify: string | null;
  parent: string | null;
  emerAddress: string | null;
  parentPhone: string | null;
};

function PatientInfo() {
  const { dn } = useParams<{ dn: string }>();
  const [patient, setPatient] = useState<Patient>();

  const patientinfoFetch = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(
        `https://localhost:7017/api/tpatient/${dn}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setPatient(response.data);
    } catch (e: any) {
      let errorMessage = e.response?.data?.message;
      console.error(errorMessage);
    }
  };

  useEffect(() => {
    patientinfoFetch();
    console.log(patient);
  }, []);

  return (
    <Flex
      direction="column"
      className="border-3 border-[#A861D4] rounded-[16px] w-full h-full gap-[18px] p-2 lg:p-6 "
    >
      <Flex alignItems="center" className="gap-2">
        <Flex
          alignItems="center"
          className=" w-4 h-4 lg:w-10 lg:h-10 rounded-full bg-green-400 shadow-md  shadow-green-700"
        ></Flex>
        <Text bold className="text-[20px] lg:text-[32px]">
          DN: {dn}
        </Text>
      </Flex>
      <ScrollArea className=" lg:overflow-y-auto pr-6">
        <Flex direction="column" className="gap-[12px]">
          <Flex
            direction="column"
            className="border border-[#AFAFAF] rounded-[16px] w-full h-full gap-[30px] p-6 lg:p-[24px]"
          >
            <Flex className="gap-4 lg:grid lg:grid-cols-2 w-full">
              <Flex className="gap-[30px]">
                <Text bold className="lg:text-[20px]">
                  ชื่อ
                </Text>
                <Text className="lg:text-[20px]">
                  {patient?.titleTh}
                  {patient?.nameTh} {patient?.surnameTh}
                </Text>
              </Flex>
              <Flex>
                <Text className="lg:text-[20px]">
                  {patient?.titleEn}
                  {patient?.nameEn} {patient?.surnameEn}
                </Text>
              </Flex>
            </Flex>
            <Flex
              direction="column"
              className="gap-[24px] lg:grid lg:grid-cols-3 w-full"
            >
              <Flex className="gap-[30px] w-fit">
                <Text bold className="lg:text-[20px]">
                  เพศ
                </Text>
                <Text className="lg:text-[20px]">{patient?.sex}</Text>
              </Flex>
              <Flex className="gap-[30px] w-fit">
                <Text bold className="lg:text-[20px]">
                  สถานภาพ
                </Text>
                <Text className="lg:text-[20px]">{patient?.maritalStatus}</Text>
              </Flex>
              <Flex className="gap-1 lg:gap-[30px] ">
                <Text bold className="lg:text-[20px]">
                  เลขประจำตัวประชาชน
                </Text>
                <Text className="lg:text-[20px]">{patient?.idNo}</Text>
              </Flex>
            </Flex>
            <Flex
              direction="column"
              className="gap-[24px] lg:grid lg:grid-cols-3 w-full"
            >
              <Flex className="gap-[30px] w-fit">
                <Text bold className="lg:text-[20px]">
                  วันเกิด
                </Text>
                <Text className="lg:text-[20px]">{patient?.birthDate}</Text>
              </Flex>
              <Flex className="gap-[30px] w-fit">
                <Text bold className="lg:text-[20px]">
                  อายุ
                </Text>
                <Text className="lg:text-[20px]">{patient?.age}</Text>
              </Flex>
              <Flex className="gap-[30px] w-full">
                <Text bold className="lg:text-[20px]">
                  อาชีพ
                </Text>
                <Text className="lg:text-[20px]">{patient?.occupation}</Text>
              </Flex>
            </Flex>
            <Flex className="gap-[30px] w-fit">
              <Text bold className="lg:text-[20px]">
                ที่อยู่ติดต่อได้
              </Text>
              <Text className="lg:text-[20px]">{patient?.address}</Text>
            </Flex>
            <Flex
              direction="column"
              className="gap-[24px] lg:grid lg:grid-cols-2 w-full"
            >
              <Flex className="gap-[30px]">
                <Text bold className="lg:text-[20px]">
                  เบอร์ติดต่อ
                </Text>
                <Text className="lg:text-[20px]">{patient?.phoneHome}</Text>
              </Flex>
              <Flex className="gap-[30px]">
                <Text bold className="lg:text-[20px]">
                  เบอร์ที่ทำงาน
                </Text>
                <Text className="lg:text-[20px]">{patient?.phoneOffice}</Text>
              </Flex>
            </Flex>
            <Flex
              direction="column"
              className="gap-[24px] lg:grid lg:grid-cols-2 w-full"
            >
              <Flex className="gap-[30px]">
                <Text bold className="lg:text-[20px]">
                  กรณีฉุกเฉินติดต่อ
                </Text>
                <Text className="lg:text-[20px]">{patient?.emerNotify}</Text>
              </Flex>
              <Flex className="gap-[30px]">
                <Text bold className="lg:text-[20px]">
                  เกี่ยวข้องเป็น
                </Text>
                <Text className="lg:text-[20px]">{patient?.parent}</Text>
              </Flex>
            </Flex>
            <Flex className="gap-[30px] w-fit">
              <Text bold className="lg:text-[20px]">
                ที่อยู่ติดต่อกรณีฉุกเฉิน
              </Text>
              <Text className="lg:text-[20px]">{patient?.emerAddress}</Text>
            </Flex>
            <Flex className="gap-[30px] w-fit">
              <Text bold className="lg:text-[20px]">
                เบอร์ติดต่อฉุกเฉิน
              </Text>
              <Text className="lg:text-[20px]">{patient?.parentPhone}</Text>
            </Flex>
          </Flex>

          {/**ประวัติการรักษา */}
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
              <Flex className="gap-4 transform transition-all duration-200 hover:p-2 rounded-lg hover:bg-purple-500 hover:text-white hover:cursor-pointer">
                <Text bold className="lg:text-[20px]">
                  03/04/2567
                </Text>
                <Text className="lg:text-[20px]">ผ่าฟันคุดซี่ 18</Text>
              </Flex>
              <Flex className="gap-4 transform transition-all duration-200 hover:p-2 rounded-lg hover:bg-purple-500 hover:text-white hover:cursor-pointer">
                <Text bold className="lg:text-[20px]">
                  03/04/2567
                </Text>
                <Text className="lg:text-[20px]">ผ่าฟันคุดซี่ 18</Text>
              </Flex>
              <Flex className="gap-4 transform transition-all duration-200 hover:p-2 rounded-lg hover:bg-purple-500 hover:text-white hover:cursor-pointer">
                <Text bold className="lg:text-[20px]">
                  03/04/2567
                </Text>
                <Text className="lg:text-[20px]">ผ่าฟันคุดซี่ 18</Text>
              </Flex>
              <Flex className="gap-4 transform transition-all duration-200 hover:p-2 rounded-lg hover:bg-purple-500 hover:text-white hover:cursor-pointer">
                <Text bold className="lg:text-[20px]">
                  03/04/2567
                </Text>
                <Text className="lg:text-[20px]">ผ่าฟันคุดซี่ 18</Text>
              </Flex>
              <Flex className="gap-4 transform transition-all duration-200 hover:p-2 rounded-lg hover:bg-purple-500 hover:text-white hover:cursor-pointer">
                <Text bold className="lg:text-[20px]">
                  03/04/2567
                </Text>
                <Text className="lg:text-[20px]">ผ่าฟันคุดซี่ 18</Text>
              </Flex>
              <Flex className="gap-4 transform transition-all duration-200 hover:p-2 rounded-lg hover:bg-purple-500 hover:text-white hover:cursor-pointer">
                <Text bold className="lg:text-[20px]">
                  03/04/2567
                </Text>
                <Text className="lg:text-[20px]">ผ่าฟันคุดซี่ 18</Text>
              </Flex>
              <Flex className="gap-4 transform transition-all duration-200 hover:p-2 rounded-lg hover:bg-purple-500 hover:text-white hover:cursor-pointer">
                <Text bold className="lg:text-[20px]">
                  03/04/2567
                </Text>
                <Text className="lg:text-[20px]">ผ่าฟันคุดซี่ 18</Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex direction="column" className="gap-[16px] lg:flex-row">
            <Flex
              direction="column"
              className="border border-[#AFAFAF] rounded-[16px] w-full h-full gap-[30px] p-6 lg:p-[24px]"
            >
              <img src={xray} alt="xray" />
            </Flex>
            <Flex
              direction="column"
              className="border border-[#AFAFAF] rounded-[16px] w-full h-full gap-[30px] p-6 lg:p-[24px]"
            >
              <img src={xray} alt="xray" />
            </Flex>
          </Flex>
        </Flex>
      </ScrollArea>
    </Flex>
  );
}

export default PatientInfo;

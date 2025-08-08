/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Flex from "@/components/Flex";
import Text from "@/components/Text";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate, useParams } from "react-router-dom";
import Medicalscreening from "./Medicalscreening";
import Treatmenthistory from "./Treatmenthistory";
import Teeth from "./Teeth";
import Screeningform from "./Screeningform";
import Personalinfo from "./Personalinfo";
import { useEffect, useState } from "react";
import axios from "axios";
import { ErrorModal } from "@/components/Modal";
import dayjs from "@/lib/dayjs";
import Loading from "@/components/Loading";

interface Props {
  onTreatment?: boolean;
}

export type PatientInfo = {
  dn: string | null;
  titleTh?: string | null;
  nameTh?: string | null;
  surnameTh?: string | null;
  titleEn?: string | null;
  nameEn?: string | null;
  surnameEn?: string | null;
  idNo?: string | null;
  priv?: string | null;
  birthDate?: string | null;
  age: string | null;
  sex?: string | null;
  maritalStatus?: string | null;
  occupation?: string | null;
  address?: string | null;
  phoneHome?: string | null;
  phoneOffice?: string | null;
  emerNotify?: string | null;
  parent?: string | null;
  emerAddress?: string | null;
  parentPhone?: string | null;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function PatientInfo({ onTreatment }: Props) {
  const { dn } = useParams<{ dn: string }>();
  const [patient, setPatient] = useState<PatientInfo>();

  // Modal State
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Navigate
  const nav = useNavigate();

  // Loading State
  const [patientLoading, setpatientLoading] = useState<boolean>(false);

  const patientinfoFetch = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/api/tpatient/${dn}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(response.data);
      setPatient(response.data);
    } catch (e: any) {
      let errorMessage = e.response?.data?.message;
      let errorStatus = e.response?.status;

      //console.error(errorStatus);
      if (errorStatus === 401) {
        setError("ไม่ได้รับอนุญาตให้ใช้งาน");
        setModalOn(true);
        sessionStorage.clear();

        return setTimeout(() => {
          setModalOn(false);
          setError("");
          nav("/");
        }, 2000);
      } else if (errorStatus === 403) {
        setError("ไม่มีสิทธิ์ในการเข้าใช้ฟีเจอร์นี้");
        setModalOn(true);

        return setTimeout(() => {
          setModalOn(false);
          setError("");
        }, 2000);
      } else if (errorStatus === 404) {
        setError("ไม่พบข้อมูลคนไข้");
        setModalOn(true);

        return setTimeout(() => {
          setModalOn(false);
          setError("");
          nav(-1);
        }, 2000);
      } else {
        setError(`เซิร์ฟเวอร์ขัดข้อง: ${errorMessage}`);
        setModalOn(true);

        return setTimeout(() => {
          setModalOn(false);
          setError("");
        }, 2000);
      }
    } finally {
      setpatientLoading(false);
    }
  };

  const patientscreeningFetch = async () => {
    try {
      await console.log("hello from treatment");
    } catch (e: any) {
      console.error(e?.response);
    } finally {
      setpatientLoading(false);
    }
  };

  useEffect(() => {
    setpatientLoading(true);
    if (onTreatment) {
      patientscreeningFetch();
    } else {
      patientinfoFetch();
    }

    // console.log(patient);
  }, []);

  return (
    <Flex
      direction="column"
      className="border-3 border-[#4B006E] rounded-[16px] w-full h-full gap-[18px]"
    >
      <Flex direction="column" className="bg-[#4B006E] rounded-t-lg p-2 lg:p-6">
        {onTreatment ? (
          <>
            <Flex alignItems="center" className="gap-2">
              <Text bold className="text-white text-[20px] lg:text-[32px]">
                DN: {dn} | {patient?.titleTh}
                {patient?.nameTh} {patient?.surnameTh}
              </Text>
            </Flex>
            <Flex direction="column" className="gap-[16px]">
              <Flex direction="column" className="md:grid md:grid-cols-2">
                <Flex className="gap-4">
                  <Text bold className="text-white text-[18px] lg:text-[24px]">
                    เพศ:
                  </Text>
                  <Text className="text-white text-[18px] lg:text-[24px]">
                    {patient?.sex}
                  </Text>
                </Flex>
                <Flex className="gap-4">
                  <Text
                    bold
                    className="text-red-500  text-[18px] xl:text-[24px] text-shadow-sm text-shadow-black"
                  >
                    โรคประจำตัว:
                  </Text>
                  <Text className="text-red-500  text-[18px] xl:text-[24px] text-shadow-sm text-shadow-black">
                    -
                  </Text>
                </Flex>
              </Flex>
              <Flex direction="column" className="md:grid md:grid-cols-2">
                <Flex className="lg:gap-4">
                  <Text bold className="text-white text-[18px] xl:text-[24px]">
                    สิทธิการรักษา:
                  </Text>
                  <Text className="text-white text-[18px] xl:text-[24px]">
                    {patient?.priv}
                  </Text>
                </Flex>
                <Flex className="lg:gap-4">
                  <Text
                    bold
                    className="text-red-500  text-[18px] xl:text-[24px] text-shadow-sm text-shadow-black"
                  >
                    แพ้ยา / อาการ:
                  </Text>
                  <Text className="text-red-500  text-[18px] xl:text-[24px] text-shadow-sm text-shadow-black">
                    -
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </>
        ) : (
          <>
            <Flex alignItems="center" className="gap-2">
              <Text bold className="text-white text-[20px] lg:text-[32px]">
                DN: {dn} | <br className="md:hidden" /> {patient?.titleTh}
                {patient?.nameTh} {patient?.surnameTh}
              </Text>
            </Flex>
          </>
        )}
      </Flex>

      <ScrollArea className="overflow-y-hidden pr-6 max-h-full p-2 lg:p-6 ">
        <Flex direction="column" className="gap-[12px]">
          <Personalinfo
            dn={dn}
            onTreatment={onTreatment}
            patientInfo={patient}
          />
          {onTreatment ? (
            <>
              <Text className="lg:text-[22px]" bold>
                {dayjs().format("DD/MM/BBBB")}
              </Text>
              <Screeningform />
              <Medicalscreening />
            </>
          ) : (
            <>
              <Treatmenthistory dn={patient?.dn} />
              <Teeth />
            </>
          )}
        </Flex>
      </ScrollArea>
      {patientLoading && (
        <Loading isOpen message={`กำลังโหลดข้อมูลคนไข้ DN:${dn}`} />
      )}
      {modalOn && !!error && <ErrorModal message={error} isVisible={modalOn} />}
    </Flex>
  );
}

export default PatientInfo;

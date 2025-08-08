/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Flex from "@/components/Flex";
import Text from "@/components/Text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowBigDown, ArrowBigRight, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ErrorModal, SuccessModal, VerifyModal } from "@/components/Modal";
import axios from "axios";
import Loading from "@/components/Loading";
import dayjs from "dayjs";

type Patient = {
  dn: string;
  titleTh: string;
  nameTh: string;
  surnameTh: string;
};
interface Props {
  onClose: () => void;
  patientData: Patient;
}

type ScreeningRecord = {
  screeningId: number;
  dn: string;
  createdAt: Date;
};

function Referpatient({ onClose, patientData }: Props) {
  const [screening, setScreening] = useState<ScreeningRecord>();
  const [referFrom, setReferFrom] = useState<string>(
    sessionStorage.getItem("clinicId") || ""
  );
  const [referTo, setReferTo] = useState<string>("");
  const roleName = sessionStorage.getItem("roleName");
  const [referModalOn, setReferModalOn] = useState<boolean>(false);
  const [referVerifyOn, setReferVerifyOn] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Loading State
  const [loading, setLoading] = useState<boolean>(false);
  const patient = {
    dn: patientData.dn,
    titleTh: patientData.titleTh,
    nameTh: patientData.nameTh,
    surnameTh: patientData.surnameTh,
  };

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const clinicOptions = [
    { value: "1", label: "Occlusion" },
    { value: "2", label: "Oral Health Promotion" },
    { value: "3", label: "Periodontic" },
    { value: "4", label: "Operative" },
    { value: "5", label: "Endodontic" },
    { value: "6", label: "Prosthodontic" },
    { value: "7", label: "Oral Surgery" },
    { value: "8", label: "Oral Diagnosis" },
    { value: "9", label: "Orthodontic" },
    { value: "10", label: "Pedodontic" },
    { value: "11", label: "บริการในเวลาราชการ" },
    { value: "12", label: "Oral Radiology" },
    { value: "13", label: "คลินิกพิเศษ" },
    { value: "14", label: "บัณฑิตศึกษา" },
    { value: "15", label: "รากเทียม" },
  ];

  const handleModal = () => {
    setReferVerifyOn(!referVerifyOn);
  };

  const handleReferPatient = async () => {
    setReferVerifyOn(false);
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.post(
        `${API_BASE_URL}/api/clinicrefer`,
        {
          screeningId: screening?.screeningId,
          dn: patient.dn,
          referFrom: referFrom,
          referTo: referTo,
          titleTh: patient.titleTh,
          nameTh: patient.nameTh,
          surnameTh: patient.surnameTh,
          // createdAt: dayjs(),
          // updateAt: dayjs(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status == 201) {
        setError("");
        setSuccessMessage("ส่งตัวคนไข้สำเร็จ");
        setReferModalOn(true);

        setTimeout(() => {
          setReferModalOn(false);
          onClose();
        }, 1000);
      }
    } catch (e: any) {
      let errorMessage = e?.response?.data;
      console.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const screeningFetch = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const today = dayjs().format("YYYY-MM-DD");

      const response = await axios.get(
        `${API_BASE_URL}/api/screeningrecord/clinicrefer`,
        {
          params: {
            dn: patient.dn,
            createdAt: today,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response?.data);
      setScreening(response?.data);
    } catch (e: any) {
      console.error(e?.response);
      const errorMessage = e?.response?.data?.message;
      const errorStatus = e?.response?.status;
      console.log(errorMessage, errorStatus);
    }
  };

  useEffect(() => {
    screeningFetch();
  }, [patient.dn]);

  return (
    <Flex
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transform transition-all duration-300  p-6 lg:p-12 xl:p-36"
      justifyContent="center"
      alignItems="center"
    >
      {/**Mobile */}
      <Card className="w-full lg:p-8 md:hidden">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>
            <Text className="lg:text-[30px]" bold>
              DN : {patient.dn}
            </Text>
          </CardTitle>
          <X
            onClick={onClose}
            color="grey"
            className="cursor-pointer"
            width={30}
            height={30}
          />
        </CardHeader>
        <CardContent>
          <Flex direction="column" className="gap-[18px]">
            <Text className="lg:text-[20px]" semibold>
              ส่งตัวจาก
            </Text>
            <Flex
              alignItems="center"
              justifyContent="center"
              direction="column"
              className="gap-[12px]"
            >
              <Select
                value={referFrom}
                onValueChange={setReferFrom}
                disabled={roleName !== "Administrator"}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="ระบุคลินิก" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {clinicOptions.map((clinic) => (
                      <SelectItem key={clinic.value} value={clinic.value}>
                        {clinic.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <ArrowBigDown width={60} height={60} color="#4B006E" />
              <Select value={referTo} onValueChange={setReferTo}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="ระบุคลินิก" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {clinicOptions.map((clinic) => (
                      <SelectItem key={clinic.value} value={clinic.value}>
                        {clinic.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Flex>
            <Flex alignItems="center" justifyContent="center">
              <Button size={"sm"} className="w-[120px]" onClick={handleModal}>
                <Text>ยืนยัน</Text>
              </Button>
            </Flex>
          </Flex>
        </CardContent>
      </Card>

      {/**Tablet Mini, Tablet Pro, Desktop */}
      <Card className="w-full lg:p-8 hidden md:flex">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>
            <Text className="lg:text-[30px]" bold>
              DN : {patient.dn}
            </Text>
          </CardTitle>
          <X
            onClick={onClose}
            color="grey"
            className="cursor-pointer"
            width={30}
            height={30}
          />
        </CardHeader>
        <CardContent>
          <Flex direction="column">
            <Text className="lg:text-[20px]" semibold>
              ส่งตัวจาก
            </Text>
            <Flex
              alignItems="center"
              justifyContent="center"
              className="gap-[12px]"
            >
              <Select
                value={referFrom}
                onValueChange={setReferFrom}
                disabled={roleName !== "Administrator"}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="ระบุคลินิก" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {clinicOptions.map((clinic) => (
                      <SelectItem key={clinic.value} value={clinic.value}>
                        {clinic.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <ArrowBigRight width={120} height={120} color="#4B006E" />
              <Select value={referTo} onValueChange={setReferTo}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="ระบุคลินิก" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {clinicOptions.map((clinic) => (
                      <SelectItem key={clinic.value} value={clinic.value}>
                        {clinic.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Flex>
            <Flex alignItems="center" justifyContent="center">
              <Button size={"sm"} className="w-[120px]" onClick={handleModal}>
                <Text>ยืนยัน</Text>
              </Button>
            </Flex>
          </Flex>
        </CardContent>
      </Card>

      {loading && <Loading isOpen message="กำลังส่งตัวคนไข้" />}

      {referVerifyOn == true && (
        <Flex
          className="fixed inset-0 z-50 bg-black/40"
          justifyContent="center"
          alignItems="center"
        >
          <VerifyModal
            message="ยืนยันการส่งตัว"
            onCancel={handleModal}
            onVerify={handleReferPatient}
          />
        </Flex>
      )}

      {referModalOn && !error && (
        <SuccessModal message={successMessage} isVisible={referModalOn} />
      )}
      {referModalOn && !!error && (
        <ErrorModal message={error} isVisible={referModalOn} />
      )}
    </Flex>
  );
}

export default Referpatient;

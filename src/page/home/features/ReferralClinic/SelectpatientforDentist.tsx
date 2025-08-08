/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Flex from "@/components/Flex";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Text from "@/components/Text";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { ErrorModal, SuccessModal, VerifyModal } from "@/components/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Props {
  dn: string;
  onClose: () => void;
}

type Dentist = {
  userId: number;
  tname: string;
  fname: string;
  lname: string;
};

function SelectpatientforDentist({ dn, onClose }: Props) {
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [selectedDentist, setSelectedDentist] = useState<string>("");
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [verifyOn, setVerifyOn] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const nav = useNavigate();

  const handleModal = () => {
    setVerifyOn(!verifyOn);
  };

  const handleSelectPatientToDentist = () => {
    if (!selectedDentist) {
      setError("กรุณาระบุทันตแพทย์");
      setVerifyOn(!verifyOn);
      setModalOn(true);

      return setTimeout(() => {
        setModalOn(false);
      }, 2000);
    }

    setVerifyOn(!verifyOn);
    setSuccessMessage("ส่งคนไข้ให้ทันตแพทย์สำเร็จ");
    setModalOn(true);

    setTimeout(() => {
      setModalOn(false);
      onClose();
    }, 1000);
  };

  const dentistListFetch = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.get(
        `${API_BASE_URL}/api/tbdentalrecorduser/teacher`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        // console.log(response?.data);
        setDentists(response?.data ?? []);
      }
    } catch (e: any) {
      let errorMessage = e.response?.data;
      let errorStatus = e.response?.status;
      console.error(e.response);

      if (errorStatus == 401) {
        setError("ไม่ได้รับอนุญาตเข้าใช้งาน");
        setModalOn(true);

        return setTimeout(() => {
          setModalOn(false);
          setError("");
          sessionStorage.clear();
          nav("/");
        }, 2000);
      } else if (errorStatus == 403) {
        setError("ไม่มีสิทธิ์เข้าถึงฟีเจอร์นี้");
      } else if (errorStatus == 404) {
        if (errorMessage == "Tbdentalrecorduser not found") {
          setError("ไม่มีข้อมูลอาจารย์");
        }
      } else {
        setError(`เซิร์ฟเวอร์ขัดข้อง: ${errorMessage}`);
      }

      setModalOn(true);

      setTimeout(() => {
        setModalOn(false);
        setError("");
      }, 2000);
    }
  };

  useEffect(() => {
    dentistListFetch();
  }, []);
  return (
    <Flex
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transform transition-all duration-300  p-6 md:p-24 lg:p-36 xl:p-72"
      justifyContent="center"
      alignItems="center"
    >
      <Card className="w-full lg:p-8 ">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>
            <Text className="lg:text-[30px]" bold>
              DN : {dn}
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
          <Flex direction="column" className="gap-[20px]">
            <Text className="lg:text-[20px]" semibold>
              ทันตแพทย์
            </Text>
            <Flex
              alignItems="center"
              justifyContent="center"
              className="gap-[12px]"
            >
              <Select
                value={selectedDentist}
                onValueChange={setSelectedDentist}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="ระบุทันตแพทย์" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {dentists.map((dentist) => (
                      <SelectItem
                        key={dentist.userId}
                        value={dentist.userId.toString()}
                      >
                        {dentist.tname} {dentist.fname} {dentist.lname}
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

      {verifyOn == true && (
        <VerifyModal
          message="ยืนยันการเลือกทันตแพทย์"
          onCancel={handleModal}
          onVerify={handleSelectPatientToDentist}
        />
      )}

      {modalOn && !error && (
        <SuccessModal message={successMessage} isVisible={modalOn} />
      )}
      {modalOn && !!error && <ErrorModal message={error} isVisible={modalOn} />}
    </Flex>
  );
}

export default SelectpatientforDentist;

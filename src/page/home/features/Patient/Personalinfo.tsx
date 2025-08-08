/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Flex from "@/components/Flex";
import Text from "@/components/Text";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ErrorModal, SuccessModal, VerifyModal } from "@/components/Modal";
import axios from "axios";
import type { PatientInfo } from "./Patientinfo";
import { API_BASE_URL } from "@/page/login/LoginCard";

// type Patient = {
//   dn: string | null;
//   titleTh?: string | null;
//   nameTh?: string | null;
//   surnameTh?: string | null;
//   titleEn?: string | null;
//   nameEn?: string | null;
//   surnameEn?: string | null;
//   sex?: string | null;
//   maritalStatus?: string | null;
//   idNo?: string | null;
//   birthDate?: string | null;
//   age?: string | null;
//   occupation?: string | null;
//   address?: string | null;
//   phoneHome?: string | null;
//   phoneOffice?: string | null;
//   emerNotify?: string | null;
//   parent?: string | null;
//   emerAddress?: string | null;
//   parentPhone?: string | null;
//   priv?: string | null;
// };

interface Props {
  dn: string | undefined;
  onTreatment?: boolean;
  patientInfo?: PatientInfo | undefined;
}

function Personalinfo({ dn, onTreatment, patientInfo }: Props) {
  const [patient, setPatient] = useState<PatientInfo | undefined>(patientInfo);
  const [editedPatient, setEditedPatient] = useState<PatientInfo>();
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [verifyOn, setVerifyOn] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const thPrefixes = [
    { value: "นาย", label: "นาย" },
    { value: "นาง", label: "นาง" },
    { value: "นางสาว", label: "นางสาว" },
    { value: "ด.ช.", label: "ด.ช." },
    { value: "ด.ญ.", label: "ด.ญ." },
  ];

  const enPrefixes = [
    { value: "Mr.", label: "Mr." },
    { value: "Mrs.", label: "Mrs." },
    { value: "Master", label: "Master" },
    { value: "Miss", label: "Miss" },
  ];

  const sexOptions = [
    { value: "ชาย", label: "ชาย" },
    { value: "หญิง", label: "หญิง" },
  ];

  const maritalStatusOptions = [
    { value: "โสด", label: "โสด" },
    { value: "แต่งงาน", label: "แต่งงาน" },
    { value: "หม้าย", label: "หม้าย" },
    { value: "หย่า", label: "หย่า" },
  ];

  const occupationOptions = [
    { value: "ข้าราชการ", label: "ข้าราชการ" },
    {
      value: "ข้าราชการ/ พนง.ปกครองส่วนท้องถิ่น",
      label: "ข้าราชการ/ พนง.ปกครองส่วนท้องถิ่น",
    },
    {
      value: "ข้าราชการบำนาญ",
      label: "ข้าราชการบำนาญ",
    },
    {
      value: "ค้าขาย/ ธุรกิจส่วนตัว",
      label: "ค้าขาย/ ธุรกิจส่วนตัว",
    },
    {
      value: "นักบวช/ พระ/ แม่ชี",
      label: "นักบวช/ พระ/ แม่ชี",
    },
    { value: "นักเรียน/นักศึกษา", label: "นักเรียน/นักศึกษา" },
    { value: "พนักงานบริษัทเอกชน", label: "พนักงานบริษัทเอกชน" },
    { value: "พนักงานมหาวิทยาลัย", label: "พนักงานมหาวิทยาลัย" },
    { value: "รัฐวิสาหกิจ", label: "รัฐวิสาหกิจ" },
    { value: "รับจ้างทั่วไป/ อาชีพอิสระ", label: "รับจ้างทั่วไป/ อาชีพอิสระ" },
    {
      value: "ลูกจ้างประจำ/ ลูกจ้างชั่วคราว",
      label: "ลูกจ้างประจำ/ ลูกจ้างชั่วคราว",
    },
    {
      value: "ว่างงาน",
      label: "ว่างงาน",
    },
    { value: "เกษตรกร", label: "เกษตรกร" },
    { value: "เจ้าหน้าที่รัฐ", label: "เจ้าหน้าที่รัฐ" },
  ];

  const privOptions = [
    { value: "ชำระเงินเอง", label: "ชำระเงินเอง" },
    {
      value: "ชำระเงินเอง/ เบิกต้นสังกัด",
      label: "ชำระเงินเอง/ เบิกต้นสังกัด",
    },
    { value: "สิทธิการรักษาบัตรทอง", label: "บัตรทอง" },
    { value: "ประกันสังคม", label: "ประกันสังคม" },
    { value: "เบิกได้จ่ายตรง", label: "เบิกได้จ่ายตรง" },
  ];

  const hospitalPrivOptions = [
    {
      value: "โรงพยาบาลมหาวิทยาลัยนเรศวร",
      label: "โรงพยาบาลมหาวิทยาลัยนเรศวร",
    },
  ];

  // กำหนด array สำหรับสิทธิที่ไม่ต้องแสดง Select hospitalPrivOptions
  const excludedPrivs = [
    privOptions[0].value,
    privOptions[1].value,
    privOptions[3].value,
    privOptions[4].value,
  ];

  const handleInputChange = (field: keyof PatientInfo, value: string) => {
    setEditedPatient((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleCancel = () => {
    setEditedPatient(patient); // Reset to original data
    setOnEdit(false);
  };

  const handleModal = () => {
    setVerifyOn(!verifyOn);
  };

  const handleEdit = () => {
    setEditedPatient(patient); // Initialize with current patient data
    setOnEdit(true);
  };

  const handleSave = async () => {
    if (!editedPatient) return;

    try {
      const token = sessionStorage.getItem("token");
      const updatedFields: Partial<PatientInfo> = {};

      Object.keys(editedPatient).forEach((key) => {
        if (
          editedPatient[key as keyof PatientInfo] !==
          patient?.[key as keyof PatientInfo]
        ) {
          updatedFields[key as keyof PatientInfo] =
            editedPatient[key as keyof PatientInfo];
        }
      });

      // เงื่อนไขสำหรับ priv: ถ้าเลือก "สิทธิการรักษาบัตรทอง" ให้ส่ง hospitalPrivOptions[0].value
      if (
        updatedFields.priv === "สิทธิการรักษาบัตรทอง" &&
        hospitalPrivOptions.length > 0
      ) {
        updatedFields.priv = hospitalPrivOptions[0].value;
      }

      if (Object.keys(updatedFields).length === 0) {
        setOnEdit(false);
        return;
      }

      const response = await axios.patch(
        `${API_BASE_URL}/api/tpatient/${dn}`,
        updatedFields,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setPatient({
          ...patient,
          ...updatedFields,
        } as PatientInfo);
        setOnEdit(false);
        setVerifyOn(false);
        setError("");
        setSuccessMessage("อัปเดทข้อมูลคนไข้สำเร็จ");
        setModalOn(true);

        setTimeout(() => {
          setModalOn(false);
        }, 1000);
      }
    } catch (e: any) {
      let errorStatus = e?.response?.status;
      if (errorStatus) {
        if (errorStatus == 401) {
          setError("ไม่ได้รับอนุญาตให้เข้าใช้งาน");
          setModalOn(true);

          setTimeout(() => {
            setError("");
            setModalOn(false);
          }, 2000);

          // nav("/home");
        } else if (errorStatus == 403)
          setError("ไม่มีสิทธิ์ในการเข้าใช้ฟีเจอร์นี้");
        else if (errorStatus == 404) setError("ไม่พบคนไข้");
        else setError("เซิร์ฟเวอร์ขัดข้อง");
      }

      setModalOn(true);

      setTimeout(() => {
        setError("");
        setModalOn(false);
      }, 2000);
    }
  };

  useEffect(() => {
    if (patientInfo) {
      setPatient(patientInfo);
    }
  }, [patientInfo]);

  const currentPatient = onEdit ? editedPatient : patient;
  return (
    <>
      <Flex
        direction="column"
        className="border border-[#AFAFAF] rounded-[16px] w-full h-full gap-[30px] p-6 lg:p-[24px]"
      >
        <Flex direction="column" className="gap-4 2xl:grid 2xl:grid-cols-2">
          <Flex direction="column" className="gap-4 ">
            <Flex
              direction="column"
              className="gap-4 md:gap-[30px] md:flex-row md:items-center"
            >
              <Text bold className=" lg:text-[20px] ">
                {"เลขประจำตัวประชาชน/Passport No."}
              </Text>
              {onEdit ? (
                <Input
                  name="idNo"
                  value={currentPatient?.idNo || ""}
                  onChange={(e) => handleInputChange("idNo", e.target.value)}
                  className="w-full flex-1"
                />
              ) : (
                <Text className="lg:text-[20px] w-full flex-1">
                  {currentPatient?.idNo}
                </Text>
              )}
            </Flex>
          </Flex>
          <Flex
            direction="column"
            className="gap-4 md:gap-[36px] md:flex-row md:items-center"
          >
            <Text bold className="lg:text-[20px]">
              สิทธิการรักษา
            </Text>
            {onEdit ? (
              <Flex className="gap-[8px]">
                <Select
                  onValueChange={(value) => handleInputChange("priv", value)}
                  value={
                    hospitalPrivOptions.some(
                      (option) => option.value === currentPatient?.priv
                    )
                      ? "สิทธิการรักษาบัตรทอง"
                      : currentPatient?.priv || ""
                  }
                >
                  <SelectTrigger className="w-full flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>สิทธิการรักษา</SelectLabel>
                      {privOptions.map((option, index) => (
                        <SelectItem key={index} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {!excludedPrivs.includes(currentPatient?.priv || "") && (
                  <Select
                    onValueChange={(value) => handleInputChange("priv", value)}
                    value={currentPatient?.priv || ""}
                  >
                    <SelectTrigger className="w-full flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>โรงพยาบาล</SelectLabel>
                        {hospitalPrivOptions.map((option, index) => (
                          <SelectItem key={index} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              </Flex>
            ) : (
              <Text className="lg:text-[20px]">{currentPatient?.priv}</Text>
            )}
          </Flex>
        </Flex>

        <Flex
          direction="column"
          className="gap-4 md:grid md:grid-cols-2 w-full"
        >
          <Flex className="gap-[30px]">
            <Text bold className="lg:text-[20px]">
              ชื่อ
            </Text>
            {onEdit ? (
              <Flex className="gap-[8px]">
                <Select
                  onValueChange={(value) => handleInputChange("titleTh", value)}
                  value={currentPatient?.titleTh || ""}
                >
                  <SelectTrigger className="w-full flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>คำนำหน้า</SelectLabel>
                      {thPrefixes.map((option, index) => (
                        <SelectItem key={index} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Input
                  name="nameTh"
                  value={currentPatient?.nameTh || ""}
                  onChange={(e) => handleInputChange("nameTh", e.target.value)}
                />
                <Input
                  name="surnameTh"
                  value={currentPatient?.surnameTh || ""}
                  onChange={(e) =>
                    handleInputChange("surnameTh", e.target.value)
                  }
                />
              </Flex>
            ) : (
              <Text className="lg:text-[20px]">
                {currentPatient?.titleTh}
                {currentPatient?.nameTh} {currentPatient?.surnameTh}
              </Text>
            )}
          </Flex>
          <Flex>
            {onEdit ? (
              <Flex className="gap-[8px]">
                <Select
                  onValueChange={(value) => handleInputChange("titleEn", value)}
                  value={currentPatient?.titleEn || ""}
                >
                  <SelectTrigger className="w-full flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>คำนำหน้าภาษาอังกฤษ</SelectLabel>
                      {enPrefixes.map((option, index) => (
                        <SelectItem key={index} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Input
                  name="nameEn"
                  value={currentPatient?.nameEn || ""}
                  onChange={(e) => handleInputChange("nameEn", e.target.value)}
                />
                <Input
                  name="surnameEn"
                  value={currentPatient?.surnameEn || ""}
                  onChange={(e) =>
                    handleInputChange("surnameEn", e.target.value)
                  }
                />
              </Flex>
            ) : (
              <Text className="lg:text-[20px]">
                {currentPatient?.titleEn}
                {currentPatient?.nameEn} {currentPatient?.surnameEn}
              </Text>
            )}
          </Flex>
        </Flex>

        <Flex
          direction="column"
          className="gap-[24px] md:grid md:grid-cols-2 w-full flex-1 md:items-center"
        >
          <Flex direction="row" className="gap-[30px]  md:items-center">
            <Text bold className=" lg:text-[20px]">
              วันเกิด
            </Text>
            <Text className="lg:text-[20px] w-full flex-1">
              {currentPatient?.birthDate}
            </Text>
          </Flex>
          <Flex
            direction="row"
            className="gap-[30px]  w-full flex-1 md:items-center"
          >
            <Text bold className="lg:text-[20px]">
              อายุ
            </Text>
            <Text className="lg:text-[20px] ">{currentPatient?.age}</Text>
          </Flex>
        </Flex>
        <Flex
          direction="column"
          className="gap-[24px] md:grid md:grid-cols-2 w-full md:items-center"
        >
          <Flex
            direction="row"
            className="gap-[30px] w-fit md:flex-row md:items-center"
          >
            <Text bold className="lg:text-[20px]">
              เพศ
            </Text>
            {onEdit ? (
              <Select
                onValueChange={(value) => handleInputChange("sex", value)}
                value={currentPatient?.sex || ""}
              >
                <SelectTrigger className="w-full flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>เพศ</SelectLabel>
                    {sexOptions.map((option, index) => (
                      <SelectItem key={index} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <Text className="lg:text-[20px]">{patient?.sex}</Text>
            )}
          </Flex>
          <Flex direction="row" className="gap-[30px] w-fit  md:items-center">
            <Text bold className="lg:text-[20px]">
              สถานภาพ
            </Text>
            {onEdit ? (
              <Select
                onValueChange={(value) =>
                  handleInputChange("maritalStatus", value)
                }
                value={currentPatient?.maritalStatus || ""}
              >
                <SelectTrigger className="w-full flex-1">
                  <SelectValue placeholder="เลือกสถานภาพ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>สถานภาพ</SelectLabel>
                    {maritalStatusOptions.map((option, index) => (
                      <SelectItem key={index} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <Text className="lg:text-[20px]">
                {currentPatient?.maritalStatus}
              </Text>
            )}
          </Flex>
          <Flex direction="row" className="gap-[30px]  md:items-center">
            <Text bold className="lg:text-[20px]">
              อาชีพ
            </Text>
            {onEdit ? (
              <Select
                onValueChange={(value) =>
                  handleInputChange("occupation", value)
                }
                value={currentPatient?.occupation || ""}
              >
                <SelectTrigger className="w-full flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>อาชีพ</SelectLabel>
                    {occupationOptions.map((option, index) => (
                      <SelectItem key={index} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <Text className="lg:text-[20px]">
                {currentPatient?.occupation}
              </Text>
            )}
          </Flex>
        </Flex>

        <Flex
          direction="column"
          className="gap-[30px] w-full md:flex-row md:items-center"
        >
          <Text bold className="lg:text-[20px]">
            ที่อยู่ติดต่อได้
          </Text>
          {onEdit ? (
            <Input
              name="emerNotify"
              value={currentPatient?.address || ""}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="w-full flex-1"
            />
          ) : (
            <Text className="lg:text-[20px]">{currentPatient?.address}</Text>
          )}
        </Flex>
        <Flex
          direction="column"
          className="gap-[24px] md:grid md:grid-cols-2 w-full "
        >
          <Flex
            direction="row"
            className="gap-[30px] md:flex-row md:items-center"
          >
            <Text bold className="lg:text-[20px] ">
              เบอร์ติดต่อ
            </Text>
            {onEdit ? (
              <Input
                name="phoneHome"
                value={currentPatient?.phoneHome || ""}
                onChange={(e) => handleInputChange("phoneHome", e.target.value)}
                className="w-full flex-1"
              />
            ) : (
              <Text className="lg:text-[20px]">
                {currentPatient?.phoneHome}
              </Text>
            )}
          </Flex>
          <Flex
            direction="row"
            className="gap-[30px] md:flex-row md:items-center"
          >
            <Text
              bold
              className="lg:text-[20px] md:min-w-[100px] lg:min-w-[120px]"
            >
              เบอร์ที่ทำงาน
            </Text>
            {onEdit ? (
              <Input
                name="phoneOffice"
                value={currentPatient?.phoneOffice || ""}
                onChange={(e) =>
                  handleInputChange("phoneOffice", e.target.value)
                }
              />
            ) : (
              <Text className="lg:text-[20px]">
                {currentPatient?.phoneOffice}
              </Text>
            )}
          </Flex>
        </Flex>
        <Flex
          direction="column"
          className="gap-[24px] lg:grid lg:grid-cols-2 w-full"
        >
          <Flex direction="row" className="gap-[30px] ">
            <Text bold className="lg:text-[20px] ">
              กรณีฉุกเฉินติดต่อ
            </Text>
            {onEdit ? (
              <Input
                name="emerNotify"
                value={currentPatient?.emerNotify || ""}
                onChange={(e) =>
                  handleInputChange("emerNotify", e.target.value)
                }
                className="w-full flex-1"
              />
            ) : (
              <Text className="lg:text-[20px]">
                {currentPatient?.emerNotify}
              </Text>
            )}
          </Flex>
          <Flex direction="row" className="gap-[30px]  md:items-center">
            <Text
              bold
              className="lg:text-[20px] md:min-w-[90px] lg:min-w-[120px]"
            >
              เกี่ยวข้องเป็น
            </Text>
            {onEdit ? (
              <Input
                name="parent"
                value={currentPatient?.parent || ""}
                onChange={(e) => handleInputChange("parent", e.target.value)}
              />
            ) : (
              <Text className="lg:text-[20px]">{currentPatient?.parent}</Text>
            )}
          </Flex>
        </Flex>
        <Flex
          direction="column"
          className="gap-[30px] w-full md:flex-row md:items-center"
        >
          <Text bold className="lg:text-[20px] lg:min-w-[200px]">
            ที่อยู่ติดต่อกรณีฉุกเฉิน
          </Text>
          {onEdit ? (
            <Input
              name="emerAddress"
              value={currentPatient?.emerAddress || ""}
              onChange={(e) => handleInputChange("emerAddress", e.target.value)}
              className="w-full flex-1"
            />
          ) : (
            <Text className="lg:text-[20px]">
              {currentPatient?.emerAddress}
            </Text>
          )}
        </Flex>
        <Flex direction="row" className="gap-[30px] w-fit md:items-center">
          <Text bold className="lg:text-[20px]">
            เบอร์ติดต่อฉุกเฉิน
          </Text>
          {onEdit ? (
            <Input
              name="emerContact"
              value={currentPatient?.parentPhone || ""}
              onChange={(e) => handleInputChange("parentPhone", e.target.value)}
            />
          ) : (
            <Text className="lg:text-[20px]">
              {currentPatient?.parentPhone}
            </Text>
          )}
        </Flex>

        {onTreatment ? (
          <></>
        ) : (
          <Flex justifyContent="end">
            {onEdit ? (
              <Flex className="gap-4">
                <Button variant={"destructive"} onClick={handleCancel}>
                  <X />
                </Button>
                <Button onClick={handleModal}>
                  <Save />
                  <Text>บันทึกข้อมูล</Text>
                </Button>
              </Flex>
            ) : (
              <Button
                className="bg-[#DEA344] hover:bg-[#DEA344]/70"
                onClick={handleEdit}
              >
                <Edit />
                <Text>แก้ไขข้อมูล</Text>
              </Button>
            )}
          </Flex>
        )}
      </Flex>

      {verifyOn == true && (
        <VerifyModal
          message="ยืนยันการอัปเดทข้อมูลคนไข้"
          onCancel={handleModal}
          onVerify={handleSave}
        />
      )}

      {modalOn && !error && (
        <SuccessModal message={successMessage} isVisible={modalOn} />
      )}
      {modalOn && !!error && <ErrorModal message={error} isVisible={modalOn} />}
    </>
  );
}

export default Personalinfo;

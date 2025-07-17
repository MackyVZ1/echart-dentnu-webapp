import Flex from "@/components/Flex";
import Text from "@/components/Text";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import xray from "@/assets/jpg/x-ray.jpg";
import { Edit, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ErrorModal, SuccessModal, VerifyModal } from "@/components/Modal";

type Patient = {
  dn: string | null;
  titleTh?: string | null;
  nameTh?: string | null;
  surnameTh?: string | null;
  titleEn?: string | null;
  nameEn?: string | null;
  surnameEn?: string | null;
  sex?: string | null;
  maritalStatus?: string | null;
  idNo?: string | null;
  birthDate?: string | null;
  age?: string | null;
  occupation?: string | null;
  address?: string | null;
  phoneHome?: string | null;
  phoneOffice?: string | null;
  emerNotify?: string | null;
  parent?: string | null;
  emerAddress?: string | null;
  parentPhone?: string | null;
  priv?: string | null;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function PatientInfo() {
  const { dn } = useParams<{ dn: string }>();
  const [patient, setPatient] = useState<Patient>();
  const [editedPatient, setEditedPatient] = useState<Patient>();
  const [onEdit, setOnEdit] = useState<boolean>(false);

  const [modalOn, setModalOn] = useState<boolean>(false);
  const [verifyOn, setVerifyOn] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const nav = useNavigate();

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
    { value: "พนักงานเอกชน", label: "พนักงานเอกชน" },
    { value: "เกษตรกร", label: "เกษตรกร" },
    { value: "นักเรียน/นักศึกษา", label: "นักเรียน/นักศึกษา" },
    { value: "อื่นๆ", label: "อื่นๆ" },
  ];

  const privOptions = [
    { value: "ชำระเงินเอง", label: "ชำระเงินเอง" },
    {
      value: "ชำระเงินเอง/ เบิกต้นสังกัด",
      label: "ชำระเงินเอง/ เบิกต้นสังกัด",
    },
    { value: "บัตรทอง", label: "บัตรทอง" },
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

  const patientinfoFetch = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/api/tpatient/${dn}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      setPatient(response.data);
    } catch (e: any) {
      let errorMessage = e.response?.data?.message;
      console.error(errorMessage);
    }
  };

  const handleCancel = () => {
    setEditedPatient(patient); // Reset to original data
    setOnEdit(false);
  };

  const handleInputChange = (field: keyof Patient, value: string) => {
    setEditedPatient((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleEdit = () => {
    setEditedPatient(patient); // Initialize with current patient data
    setOnEdit(true);
  };

  const handleModal = () => {
    setVerifyOn(!verifyOn);
  };

  const handleSave = async () => {
    if (!editedPatient) return;

    try {
      const token = sessionStorage.getItem("token");
      const updatedFields: Partial<Patient> = {};

      Object.keys(editedPatient).forEach((key) => {
        if (
          editedPatient[key as keyof Patient] !==
          patient?.[key as keyof Patient]
        ) {
          updatedFields[key as keyof Patient] =
            editedPatient[key as keyof Patient];
        }
      });

      // เงื่อนไขสำหรับ priv: ถ้าเลือก "สิทธิการรักษาบัตรทอง" ให้ส่ง hospitalPrivOptions[0].value
      if (updatedFields.priv === "บัตรทอง" && hospitalPrivOptions.length > 0) {
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
          dn: patient?.dn ?? null,
        });
        setOnEdit(false);
        setVerifyOn(false);
        setError("");
        setSuccessMessage("อัปเดทข้อมูลคนไข้สำเร็จ");
        setModalOn(true);

        setTimeout(() => {
          setModalOn(false);
        }, 1000);

        patientinfoFetch();
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

          nav("/home");
        } else if (errorStatus == 403) setError("ไม่มีสิทธิ์ใช้งานฟังก์ชันนี้");
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
    patientinfoFetch();
    console.log(patient);
  }, []);

  const currentPatient = onEdit ? editedPatient : patient;

  return (
    <Flex
      direction="column"
      className="border-3 border-[#4B006E] rounded-[16px] w-full h-full gap-[18px] p-2 lg:p-6 "
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
                      onValueChange={(value) =>
                        handleInputChange("titleTh", value)
                      }
                      value={currentPatient?.titleTh || ""}
                    >
                      <SelectTrigger className="w-full">
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
                      onChange={(e) =>
                        handleInputChange("nameTh", e.target.value)
                      }
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
                      onValueChange={(value) =>
                        handleInputChange("titleEn", value)
                      }
                      value={currentPatient?.titleEn || ""}
                    >
                      <SelectTrigger className="w-full">
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
                      onChange={(e) =>
                        handleInputChange("nameEn", e.target.value)
                      }
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
              className="gap-[24px] md:flex-row md:justify-between w-full"
            >
              <Flex
                direction="column"
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
                    <SelectTrigger className="w-full">
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
              <Flex
                direction="column"
                className="gap-[30px] w-fit md:flex-row md:items-center"
              >
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
                    <SelectTrigger className="w-full">
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
              <Flex
                direction="column"
                className="gap-1 md:gap-[30px] md:flex-row md:items-center"
              >
                <Text
                  bold
                  className="max-sm:whitespace-pre-line lg:text-[20px] xl:min-w-[220px]"
                >
                  {"เลขประจำตัวประชาชน/\nPassport No."}
                </Text>
                {onEdit ? (
                  <Input
                    name="idNo"
                    value={currentPatient?.idNo || ""}
                    onChange={(e) => handleInputChange("idNo", e.target.value)}
                  />
                ) : (
                  <Text className="lg:text-[20px]">{currentPatient?.idNo}</Text>
                )}
              </Flex>
            </Flex>
            <Flex
              direction="column"
              className="gap-[24px] md:flex-row md:justify-between w-full md:items-center"
            >
              <Flex
                direction="column"
                className="gap-[30px]  md:flex-row md:items-center"
              >
                <Text bold className="lg:min-w-[80px] lg:text-[20px]">
                  วันเกิด
                </Text>
                <Text className="lg:text-[20px] w-[150px]">
                  {currentPatient?.birthDate}
                </Text>
              </Flex>
              <Flex
                direction="column"
                className="gap-[30px] md:flex-row w-fit md:items-center"
              >
                <Text bold className="lg:text-[20px]">
                  อายุ
                </Text>
                <Text className="lg:text-[20px] lg:min-w-[50px]">
                  {currentPatient?.age}
                </Text>
              </Flex>
              <Flex
                direction="column"
                className="gap-[30px] md:flex-row md:items-center"
              >
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
                    <SelectTrigger className="w-fit">
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
              <Text
                bold
                className="lg:text-[20px] md:min-w-[90px] lg:min-w-[120px]"
              >
                ที่อยู่ติดต่อได้
              </Text>
              {onEdit ? (
                <Input
                  name="emerNotify"
                  value={currentPatient?.address || ""}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="w-full"
                />
              ) : (
                <Text className="lg:text-[20px]">
                  {currentPatient?.address}
                </Text>
              )}
            </Flex>
            <Flex
              direction="column"
              className="gap-[24px] md:grid md:grid-cols-2 w-full "
            >
              <Flex
                direction="column"
                className="gap-[30px] md:flex-row md:items-center"
              >
                <Text
                  bold
                  className="lg:text-[20px] md:min-w-[90px] lg:min-w-[120px]"
                >
                  เบอร์ติดต่อ
                </Text>
                {onEdit ? (
                  <Input
                    name="phoneHome"
                    value={currentPatient?.phoneHome || ""}
                    onChange={(e) =>
                      handleInputChange("phoneHome", e.target.value)
                    }
                  />
                ) : (
                  <Text className="lg:text-[20px]">
                    {currentPatient?.phoneHome}
                  </Text>
                )}
              </Flex>
              <Flex
                direction="column"
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
              <Flex
                direction="column"
                className="gap-[30px] md:flex-row md:items-center"
              >
                <Text bold className="lg:text-[20px] md:min-w-[120px]">
                  กรณีฉุกเฉินติดต่อ
                </Text>
                {onEdit ? (
                  <Input
                    name="emerNotify"
                    value={currentPatient?.emerNotify || ""}
                    onChange={(e) =>
                      handleInputChange("emerNotify", e.target.value)
                    }
                  />
                ) : (
                  <Text className="lg:text-[20px]">
                    {currentPatient?.emerNotify}
                  </Text>
                )}
              </Flex>
              <Flex
                direction="column"
                className="gap-[30px] md:flex-row md:items-center"
              >
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
                    onChange={(e) =>
                      handleInputChange("parent", e.target.value)
                    }
                  />
                ) : (
                  <Text className="lg:text-[20px]">
                    {currentPatient?.parent}
                  </Text>
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
                  onChange={(e) =>
                    handleInputChange("emerAddress", e.target.value)
                  }
                />
              ) : (
                <Text className="lg:text-[20px]">
                  {currentPatient?.emerAddress}
                </Text>
              )}
            </Flex>
            <Flex
              direction="column"
              className="gap-[30px] w-fit md:flex-row md:items-center"
            >
              <Text bold className="lg:text-[20px]">
                เบอร์ติดต่อฉุกเฉิน
              </Text>
              {onEdit ? (
                <Input
                  name="emerContact"
                  value={currentPatient?.parentPhone || ""}
                  onChange={(e) =>
                    handleInputChange("parentPhone", e.target.value)
                  }
                />
              ) : (
                <Text className="lg:text-[20px]">
                  {currentPatient?.parentPhone}
                </Text>
              )}
            </Flex>
            <Flex
              direction="column"
              className="gap-[36px]  md:flex-row md:items-center"
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
                        ? "บัตรทอง"
                        : currentPatient?.priv || ""
                    }
                  >
                    <SelectTrigger className="w-full">
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
                      onValueChange={(value) =>
                        handleInputChange("priv", value)
                      }
                      value={currentPatient?.priv || ""}
                    >
                      <SelectTrigger className="w-full">
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

        {verifyOn == true && (
          <Flex
            className="fixed inset-0 z-50 bg-black/40"
            justifyContent="center"
            alignItems="center"
          >
            <VerifyModal
              message="ยืนยันการอัปเดทข้อมูลคนไข้"
              onCancel={handleModal}
              onVerify={handleSave}
            />
          </Flex>
        )}

        {modalOn && !error && (
          <SuccessModal message={successMessage} isVisible={modalOn} />
        )}
        {modalOn && !!error && (
          <ErrorModal message={error} isVisible={modalOn} />
        )}
      </ScrollArea>
    </Flex>
  );
}

export default PatientInfo;

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { useState } from "react";
import Flex from "@/components/Flex";
import Text from "@/components/Text";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import axios from "axios";
import { ErrorModal, SuccessModal, VerifyModal } from "@/components/Modal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

import { CirclePlusIcon } from "lucide-react";
import Screeninginfo from "./Screeningform";
import Personalform from "./Personalform";
import Infectedform from "./Infectedform";
import Deceaseissuesform from "./Deceaseissuesform";
import Loading from "@/components/Loading";
import Referpatient from "./Referpatient";

type PatientData = {
  dn: string;
  titleTh: string;
  nameTh: string;
  surnameTh: string;
};

const patientSchema = z.object({
  dn: z.string().min(1, "กรุณากรอก DN"),
  nickname: z.string().min(1, "กรุณากรอกชื่อเล่น"),
  thPrefix: z.string().min(1, "กรุณาเลือกคำนำหน้า"),
  thName: z.string().min(1, "กรุณากรอกชื่อ"),
  thSurname: z.string().min(1, "กรุณากรอกนามสกุล"),
  enPrefix: z.string().min(1, "กรุณาเลือกคำนำหน้าภาษาอังกฤษ"),
  enName: z.string().min(1, "กรุณากรอกชื่อภาษาอังกฤษ"),
  enSurname: z.string().min(1, "กรุณากรอกนามสกุลภาษาอังกฤษ"),
  sex: z.string().min(1, "กรุณาเลือกเพศ"),
  maritalStatus: z.string().min(1, "กรุณาเลือกสถานภาพ"),
  idNo: z.string().min(13, "กรุณากรอกเลขประจำตัวประชาชนให้ครบ 13 หลัก"),
  birthdate: z.date({
    required_error: "กรุณาเลือกวันเกิด",
  }),
  age: z.number(),
  occupation: z.string().min(1, "กรุณาเลือกอาชีพ"),
  address: z.string().min(1, "กรุณากรอกที่อยู่ติดต่อ"),
  phoneNum: z.string().min(1, "กรุณากรอกเบอร์ติดต่อ"),
  officeNum: z.string().min(1, "กรุณากรอกเบอร์ที่ทำงาน"),
  emergencyContact: z.string().min(1, "กรุณากรอกชื่อผู้ติดต่อฉุกเฉิน"),
  parent: z.string().min(1, "กรุณากรอกความเกี่ยวข้อง"),
  emergencyAddress: z.string().min(1, "กรุณากรอกที่อยู่ติดต่อฉุกเฉิน"),
  emergencyPhone: z.string().min(1, "กรุณากรอกเบอร์ติดต่อฉุกเฉิน"),
  priv: z.string().min(1, "กรุณาเลือกสิทธิการรักษา"),
  hospitalPriv: z.string().optional(),
  sys: z.string().min(2, "กรุณากรอกเลขความดันโลหิต"),
  dia: z.string().min(2, "กรุณากรอกความดันโลหิต"),
  pr: z.string().min(2, "กรุณากรอกเลขชีพจร"),
  temperature: z.string().min(2, "กรุณากรอกอุณหภูมิ"),
  urgentLevel: z.string(),
  patientType: z.string(),
  healthConditions: z.object({
    highBP: z.boolean(),
    diabetes: z.boolean(),
    heart: z.boolean(),
    thyroid: z.boolean(),
    stroke: z.boolean(),
    immuno: z.boolean(),
    pregnant: z.boolean(),
    pregnantWeeks: z.string(),
    other: z.string(),
    otherChecked: z.boolean(),
    drug: z.boolean(),
    drugName: z.string(),
    drugDesc: z.string(),
  }),
});

export type PatientFormData = z.infer<typeof patientSchema>;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Patientform() {
  const [addPatientModalOn, setAddPatientModalOn] = useState<boolean>(false);
  const [addPatientVerifyOn, setAddPatientVerifyOn] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [referClinicOn, setreferClinicOn] = useState<boolean>(false);
  const [addLoading, setaddLoading] = useState<boolean>(false);

  const [patient, setPatient] = useState<PatientData>({
    dn: "",
    titleTh: "",
    nameTh: "",
    surnameTh: "",
  });

  const form = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      dn: "",
      nickname: "",
      thPrefix: "",
      thName: "",
      thSurname: "",
      enPrefix: "",
      enName: "",
      enSurname: "",
      sex: "",
      maritalStatus: "",
      idNo: "",
      birthdate: new Date(),
      occupation: "",
      address: "",
      phoneNum: "",
      officeNum: "",
      emergencyContact: "",
      parent: "",
      emergencyAddress: "",
      emergencyPhone: "",
      priv: "",
      hospitalPriv: "",
      urgentLevel: "2",
      patientType: "Normal",
      sys: "",
      dia: "",
      pr: "",
      temperature: "",
      healthConditions: {
        highBP: false,
        diabetes: false,
        heart: false,
        thyroid: false,
        stroke: false,
        immuno: false,
        pregnant: false,
        pregnantWeeks: "",
        other: "",
        otherChecked: false,
        drug: false,
        drugName: "",
        drugDesc: "",
      },
    },
  });

  const handleReferClinicOn = () => {
    setreferClinicOn(false);
    setAddPatientVerifyOn(false);
  };

  const handleModal = async () => {
    const isValid = await form.trigger();

    if (isValid) {
      setAddPatientVerifyOn(!addPatientVerifyOn);
    } else {
      console.log("Form errors:", form.formState.errors);
    }
  };

  const handleAddPatient = async () => {
    const formData = form.getValues();
    setPatient({
      dn: formData.dn,
      titleTh: formData.thPrefix,
      nameTh: formData.thName,
      surnameTh: formData.thSurname,
    });
    if (formData.patientType == "Aware") {
      setError(
        "ไม่สามารถเพิ่มคนไข้ได้เนื่องจากมีความเสี่ยงต่อการแพร่กระจายเชื้อ"
      );

      setAddPatientModalOn(true);

      return setTimeout(() => {
        setAddPatientModalOn(false);
      }, 2000);
    }
    setAddPatientVerifyOn(false);
    setaddLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const userId = sessionStorage.getItem("userId");

      if (!token) console.error("Token not found");

      dayjs.extend(buddhistEra);

      const now = dayjs().toISOString();
      const regDate = dayjs().format("DD/MM/BBBB");
      const rDate = dayjs().format("YYYY-MM-DD");
      const bDate = dayjs(formData.birthdate).format("YYYY-MM-DD");
      const birthDate = dayjs(formData.birthdate).format("DD/MM/BBBB");

      const response = await axios.post(
        `${API_BASE_URL}/api/tpatient`,
        {
          tpatient: {
            dn: formData.dn,
            nickname: formData.nickname,
            titleTh: formData.thPrefix,
            nameTh: formData.thName,
            surnameTh: formData.thSurname,
            titleEn: formData.enPrefix,
            nameEn: formData.enName,
            surnameEn: formData.enSurname,
            sex: formData.sex,
            maritalStatus: formData.maritalStatus,
            idNo: formData.idNo,
            age: formData.age?.toString(),
            occupation: formData.occupation,
            address: formData.address,
            phoneHome: formData.phoneNum,
            phoneOffice: formData.officeNum,
            emerNotify: formData.emergencyContact,
            emerAddress: formData.emergencyAddress,
            parent: formData.parent,
            parentPhone: formData.emergencyPhone,
            physician: "-",
            physicianOffice: "-",
            physicianPhone: "-",
            regDate: regDate,
            birthDate: birthDate,
            rDate: rDate,
            bDate: bDate,
            priv:
              formData.priv === "สิทธิการรักษาบัตรทอง"
                ? formData.hospitalPriv
                : formData.priv,
            otherAddress: "-",
            updateByUserId: userId,
            updateTime: now,
          },
          screening: {
            dn: formData.dn,
            sys: Number(formData.sys),
            dia: Number(formData.dia),
            pr: Number(formData.pr),
            temperature: Number(formData.temperature),
            treatmentUrgency: Number(formData.urgentLevel),
            bloodpressure:
              formData.healthConditions.highBP == false
                ? null
                : formData.healthConditions.highBP,
            diabete:
              formData.healthConditions.diabetes == false
                ? null
                : formData.healthConditions.diabetes,
            heartdisease:
              formData.healthConditions.heart == false
                ? null
                : formData.healthConditions.heart,
            thyroid:
              formData.healthConditions.thyroid == false
                ? null
                : formData.healthConditions.thyroid,
            stroke:
              formData.healthConditions.stroke == false
                ? null
                : formData.healthConditions.stroke,
            immunodeficiency:
              formData.healthConditions.immuno == false
                ? null
                : formData.healthConditions.immuno,
            pregnant:
              formData.healthConditions.pregnantWeeks == ""
                ? null
                : formData.healthConditions.pregnantWeeks,
            other:
              formData.healthConditions.other == ""
                ? null
                : formData.healthConditions.other,
            drugName:
              formData.healthConditions.drug == false
                ? null
                : formData.healthConditions.drugName,
            drugDesc:
              formData.healthConditions.drug == false
                ? null
                : formData.healthConditions.drugDesc,
            createdAt: now,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        // console.log("Patient added successfully");
        //form.reset();
        setError("");
        setSuccessMessage("เพิ่มข้อมูลคนไข้สำเร็จ");
        setAddPatientModalOn(true);

        setTimeout(() => {
          setAddPatientModalOn(false);
        }, 1000);

        setTimeout(() => {
          setreferClinicOn(true);
        }, 1000);
      }
    } catch (e: any) {
      let errorMessage = e.response?.data;
      let errorStatus = e.response?.status;
      // console.error(errorMessage);
      // console.error(errorStatus);
      if (errorStatus == 400) {
        if (errorMessage == "Tpatient data cannot be null") {
          setError("ข้อมูลคนไข้ไม่สามารถว่างเปล่าได้");
        } else if (errorMessage == "dn cannot be null") {
          setError("กรุณากรอก DN");
        } else if (errorMessage == "titleEn cannot be null") {
          setError("กรุณากรอกคำนำหน้าภาษาอังกฤษ");
        } else if (errorMessage == "nameEn cannot be null") {
          setError("กรุณากรอกชื่อภาษาอังกฤษ");
        } else if (errorMessage == "surnameEn cannot be null") {
          setError("กรุณากรอกนามสกุลภาษาอังกฤษ");
        } else if (errorMessage == "sex cannot be null") {
          setError("กรุณาระบุเพศกำเนิด");
        } else if (errorMessage == "maritalStatus cannot be null") {
          setError("กรุณาระบุสถานภาพ");
        } else if (errorMessage == "idNo cannot be null") {
          setError("กรุณากรอกเลขบัตรประชำตัวประชาชนหรือ Passport No.");
        } else if (errorMessage == "age cannot be null") {
          setError("กรุณาระบุอายุ");
        } else if (errorMessage == "occupation cannot be null") {
          setError("กรุณาระบุอาชีพ");
        } else if (errorMessage == "phoneOffice cannot be null") {
          setError("กรุณากรอกเบอร์ติดต่อที่ทำงาน");
        } else if (errorMessage == "emerNotify cannot be null") {
          setError("กรุณากรอกข้อมูลผู้ต่อติดกรณีฉุกเฉิน");
        } else if (errorMessage == "emerAddress cannot be null") {
          setError("กรุณากรอกที่อยู่ติดต่อกรณีฉุกเฉิน");
        } else if (errorMessage == "parent cannot be null") {
          setError("กรุณากรอกความเกี่ยวข้อง");
        } else if (errorMessage == "parentPhone cannot be null") {
          setError("กรุณากรอกเบอร์ติดต่อกรณีฉุกเฉิน");
        } else if (errorMessage == "physician cannot be null") {
          setError("กรุณากรอกชื่อแพทย์ประจำตัว");
        } else if (errorMessage == "physicianOffice cannot be null") {
          setError("กรุณากรอกเบอร์ติดต่อที่ทำงานแพทย์ประจำตัว");
        } else if (errorMessage == "physicianPhone cannot be null") {
          setError("กรุณากรอกเบอร์ติดต่อแพทย์ประจำตัว");
        } else if (errorMessage == "otherAddress cannot be null") {
          setError("กรูณากรอกที่อยู่อื่นๆ");
        }
      } else if (errorStatus == 401) {
        setError("ไม่ได้รับอนุญาตให้ใช้งาน");
      } else if (errorStatus == 403) {
        setError("ไม่มีสิทธิ์ในการเข้าใช้ฟีเจอร์นี้");
      } else {
        setError(`เซิร์ฟเวอร์ขัดข้อง: ${errorMessage}`);
      }

      setAddPatientVerifyOn(false);
      setAddPatientModalOn(true);

      setTimeout(() => {
        setError("");
        setAddPatientModalOn(false);
      }, 1000);
    } finally {
      setaddLoading(false);
    }
  };

  return (
    <Flex direction="column">
      <ScrollArea className="py-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleModal)}
            className="flex-1 flex flex-col min-h-0 gap-4"
          >
            <Personalform form={form} />
            <Screeninginfo form={form} />
            <Infectedform form={form} />
            <Deceaseissuesform form={form} />
            {/**ยืนยันข้อมูล */}
            <Flex className="w-full max-lg:gap-[20px]" direction="column">
              <Flex justifyContent="end">
                <Button type="submit" size={"sm"}>
                  <CirclePlusIcon />
                  <Text>เพิ่มคนไข้</Text>
                </Button>
              </Flex>
            </Flex>

            {addPatientVerifyOn == true && referClinicOn == false && (
              <VerifyModal
                message="ยืนยันการเพิ่มคนไข้"
                onCancel={handleModal}
                onVerify={handleAddPatient}
              />
            )}

            {addPatientModalOn && !error && !referClinicOn && (
              <SuccessModal
                message={successMessage}
                isVisible={addPatientModalOn}
              />
            )}
            {addPatientModalOn && !!error && !referClinicOn && (
              <ErrorModal message={error} isVisible={addPatientModalOn} />
            )}

            {referClinicOn && (
              <Referpatient
                patientData={patient}
                onClose={handleReferClinicOn}
              />
            )}
          </form>
        </Form>
      </ScrollArea>

      {addLoading && <Loading isOpen message="กำลังเพิ่มคนไข้" />}
    </Flex>
  );
}

export default Patientform;

import { useEffect, useState } from "react";
import Flex from "@/components/Flex";
import { Input } from "@/components/ui/input";
import Text from "@/components/Text";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import axios from "axios";
import { ErrorModal, SuccessModal, VerifyModal } from "@/components/Modal";
import { Checkbox } from "@/components/ui/checkbox";
import { Datepicker } from "@/components/ui/datepicker";
import { ScrollArea } from "@/components/ui/scroll-area";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CirclePlusIcon } from "lucide-react";

const patientSchema = z.object({
  dn: z.string().min(1, "กรุณากรอก DN"),
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
  isVerified: z.boolean().refine((val) => val === true, {
    message: "กรุณายืนยันข้อมูลก่อนเพิ่มคนไข้",
  }),
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
  }),
});

type PatientFormData = z.infer<typeof patientSchema>;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Patientform() {
  const [age, setAge] = useState<number | undefined>(undefined);
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [verifyOn, setVerifyOn] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [dropletChecks, setDropletChecks] = useState<boolean[]>(
    Array(6).fill(false)
  );
  const [airborneChecks, setAirborneChecks] = useState<boolean[]>(
    Array(8).fill(false)
  );
  const [contactChecks, setContactChecks] = useState<boolean[]>(
    Array(6).fill(false)
  );

  const [checklistSummary, setChecklistSummary] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

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

  const form = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      dn: "",
      thPrefix: thPrefixes[0].value,
      thName: "",
      thSurname: "",
      enPrefix: enPrefixes[0].value,
      enName: "",
      enSurname: "",
      sex: sexOptions[0].value,
      maritalStatus: maritalStatusOptions[0].value,
      idNo: "",
      birthdate: undefined,
      occupation: occupationOptions[0].value,
      address: "",
      phoneNum: "",
      officeNum: "",
      emergencyContact: "",
      parent: "",
      emergencyAddress: "",
      emergencyPhone: "",
      priv: privOptions[0].value,
      hospitalPriv: hospitalPrivOptions[0].value,
      isVerified: false,
      urgentLevel: "Non-Urgency",
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
      },
    },
  });

  const watchedBirthdate = form.watch("birthdate");
  const watchedPriv = form.watch("priv");

  const handleModal = () => {
    form.trigger().then((isValid) => {
      if (isValid) {
        setVerifyOn(!verifyOn);
      }
    });
  };

  const handleAddPatient = async () => {
    const formData = form.getValues();
    try {
      const token = sessionStorage.getItem("token");
      const roleId = sessionStorage.getItem("roleId");

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
          dn: formData.dn,
          titleTh: formData.thPrefix,
          nameTh: formData.thName,
          surnameTh: formData.thSurname,
          titleEn: formData.enPrefix,
          nameEn: formData.enName,
          surnameEn: formData.enSurname,
          sex: formData.sex,
          maritalStatus: formData.maritalStatus,
          idNo: formData.idNo,
          age: age?.toString(),
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
          updateByUserId: roleId,
          updateTime: now,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("Patient added successfully");
        form.reset();
        setAge(undefined);
        setVerifyOn(false);
        setError("");
        setSuccessMessage("เพิ่มข้อมูลคนไข้สำเร็จ");
        setModalOn(true);

        setTimeout(() => {
          setModalOn(false);
        }, 1000);
      }
    } catch (e: any) {
      let errorMessage = e.response?.data?.message;
      if (errorMessage === "DN required.") {
        setError("กรุณากรอก DN");
        console.error(errorMessage);
      } else if (errorMessage === "EN title required.") {
        setError("กรุณากรอกคำนำหน้าภาษาอังกฤษ");
        console.error(errorMessage);
      } else if (errorMessage === "EN name required.") {
        setError("กรุณากรอกชื่อภาษาอังกฤษ");
        console.error(errorMessage);
      } else if (errorMessage === "EN surname required.") {
        setError("กรุณากรอกนามสกุลภาษาอังกฤษ");
        console.error(errorMessage);
      } else if (errorMessage === "Sex required.") {
        setError("กรุณากรอกเพศ");
        console.error(errorMessage);
      } else if (errorMessage === "Marital Status required.") {
        setError("กรุณากรอกสถานภาพ");
        console.error(errorMessage);
      } else if (errorMessage === "Age required.") {
        setError("กรุณากรอกอายุ");
        console.error(errorMessage);
      } else if (errorMessage === "Occupation required.") {
        setError("กรุณากรอกอาชีพ");
        console.error(errorMessage);
      } else if (errorMessage === "Phone Office required.") {
        setError("กรุณากรอกเบอร์ที่ทำงาน");
        console.error(errorMessage);
      } else if (errorMessage === "Emergency Contact required.") {
        setError("กรุณากรอกเบอร์ติดต่อฉุกเฉิน");
        console.error(errorMessage);
      } else if (errorMessage === "Emergency Address required.") {
        setError("กรุณากรอกที่อยู่ติดต่อฉุกเฉิน");
        console.error(errorMessage);
      } else if (errorMessage === "Parent required.") {
        setError("กรุณาความเกี่ยวข้องของผู้ติดต่อฉุกเฉิน");
        console.error(errorMessage);
      } else if (errorMessage === "Parent phone required.") {
        setError("กรุณากรอกเบอร์โทรศัพท์ของผู้ติดต่อฉุกเฉิน");
        console.error(errorMessage);
      } else if (errorMessage === "Physician required.") {
        setError("กรุณากรอกชื่อแพทย์");
        console.error(errorMessage);
      } else if (errorMessage === "Physician phone required.") {
        setError("กรุณากรอกเบอร์โทรศัพท์ของแพทย์");
        console.error(errorMessage);
      } else if (errorMessage === "Other Address required.") {
        setError("กรุณากรอกที่อยู่อื่นๆ");
        console.error(errorMessage);
      } else {
        errorMessage = "เซิร์ฟเวอร์ขัดข้อง";
        setError(errorMessage);
        console.error(errorMessage);
      }
      setVerifyOn(false);
      setModalOn(true);

      setTimeout(() => {
        setError("");
        setModalOn(false);
      }, 1000);
    }
  };

  useEffect(() => {
    const dropletCount = dropletChecks.filter(Boolean).length;
    const airborneCount = airborneChecks.filter(Boolean).length;
    const contactCount = contactChecks.filter(Boolean).length;

    const meetsCriteria =
      dropletCount >= 2 || airborneCount >= 1 || contactCount >= 2;

    if (meetsCriteria) {
      form.setValue("patientType", "Aware"); // เฝ้าระวัง
    } else {
      form.setValue("patientType", "Normal"); // ไม่เข้าเกณฑ์
    }

    // อัปเดตติ๊ก checkbox "เข้าเกณฑ์อย่างน้อย X ข้อ"
    setChecklistSummary([
      dropletCount >= 2,
      airborneCount >= 1,
      contactCount >= 2,
    ]);
  }, [dropletChecks, airborneChecks, contactChecks]);

  useEffect(() => {
    if (watchedBirthdate) {
      const calculatedAge = dayjs().diff(dayjs(watchedBirthdate), "year");
      setAge(calculatedAge);
    } else {
      setAge(undefined);
    }
  }, [watchedBirthdate, watchedPriv]);

  return (
    <Flex direction="column">
      <ScrollArea className="py-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleModal)}
            className="flex-1 flex flex-col min-h-0 gap-4"
          >
            <Flex
              className="w-full h-full border border-[#848484] rounded-[16px] p-6  lg:py-[15px] lg:px-[30px]  gap-[20px] "
              direction="column"
            >
              <Flex
                justifyContent="start"
                alignItems="center"
                className="gap-[12px] md:justify-end"
              >
                <Text className="lg:text-[22px]">DN</Text>
                <FormField
                  control={form.control}
                  name="dn"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="68xxxx"
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Flex>
              <Flex
                className="w-full  gap-[20px] md:grid md:grid-cols-3"
                direction="column"
                justifyContent="between"
              >
                <Flex alignItems="center" className=" gap-[12px]">
                  <Text className="lg:text-[22px] md:min-w-[60px] lg:min-w-[90px]">
                    คำนำหน้า
                  </Text>
                  <FormField
                    control={form.control}
                    name="thPrefix"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="นาย" />
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
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Flex>
                <Flex alignItems="center" className="gap-[12px]">
                  <Text className="lg:text-[22px]">ชื่อ</Text>
                  <FormField
                    control={form.control}
                    name="thName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input {...field} placeholder="สมปอง" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Flex>
                <Flex alignItems="center" className="gap-[12px]">
                  <Text className="lg:text-[22px]">นามสกุล</Text>
                  <FormField
                    control={form.control}
                    name="thSurname"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input {...field} placeholder="อ้ะย้ะ" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Flex>
              </Flex>
              <Flex
                className="w-full  gap-[20px] md:grid md:grid-cols-3"
                justifyContent="between"
                direction="column"
              >
                <Flex alignItems="center" className="gap-[12px]">
                  <Text className="lg:text-[22px]">Title</Text>
                  <FormField
                    control={form.control}
                    name="enPrefix"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Mr." />
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
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Flex>
                <Flex alignItems="center" className="gap-[12px]">
                  <Text className="lg:text-[22px]">Name</Text>
                  <FormField
                    control={form.control}
                    name="enName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input {...field} placeholder="Sompong" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Flex>
                <Flex alignItems="center" className="gap-[12px]">
                  <Text className="lg:text-[22px]">Surname</Text>
                  <FormField
                    control={form.control}
                    name="enSurname"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input {...field} placeholder="Aya" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Flex>
              </Flex>
              <Flex
                className="w-full  gap-[20px] md:grid md:grid-cols-3"
                justifyContent="between"
                direction="column"
              >
                <Flex alignItems="center" className="gap-[12px]">
                  <Text className="lg:text-[22px]">เพศ</Text>
                  <FormField
                    control={form.control}
                    name="sex"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="ชาย" />
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
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Flex>
                <Flex alignItems="center" className="gap-[12px]">
                  <Text className="lg:text-[22px]">สถานภาพ</Text>
                  <FormField
                    control={form.control}
                    name="maritalStatus"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
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
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Flex>
                <Flex alignItems="center" className="gap-[12px]">
                  <Text className="lg:text-[22px] md:min-w-[76px] lg:min-w-[120px]">
                    เลขประจำตัวประชาชน/ Passport No.
                  </Text>
                  <FormField
                    control={form.control}
                    name="idNo"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input {...field} placeholder="x-xxxx-xxxxx-xx-x" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Flex>
              </Flex>
              <Flex
                className="w-full gap-[20px] md:grid md:grid-cols-2"
                justifyContent="between"
                direction="column"
              >
                <Flex className="max-md:flex-col gap-[20px] md:gap-6">
                  <Flex alignItems="center" className="gap-[12px]">
                    <Text className="lg:text-[22px] min-w-[42px] md:min-w-[40px]">
                      วันเกิด
                    </Text>
                    <FormField
                      control={form.control}
                      name="birthdate"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Datepicker
                              date={field.value}
                              onDateChange={field.onChange}
                              placeholder="วว/ดด/ปปปป"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Flex>
                  <Flex alignItems="center" className="gap-[12px]">
                    <Text className="lg:text-[22px]">อายุ</Text>
                    <Input
                      name="age"
                      type="readonly"
                      value={age !== undefined ? age : ""}
                      onChange={() => {}}
                      placeholder="99"
                      className="max-xl:w-[45px] w-[50px]"
                      disabled
                    />
                    <Text className="lg:text-[22px]">ปี</Text>
                  </Flex>
                </Flex>
                <Flex alignItems="center" className="gap-[12px]">
                  <Text className="lg:text-[22px]">อาชีพ</Text>
                  <FormField
                    control={form.control}
                    name="occupation"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="เลือกอาชีพ" />
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
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Flex>
              </Flex>
              <Flex className="w-full gap-[12px]" alignItems="center">
                <Text className="lg:text-[22px] md:min-w-[70px] lg:min-w-[100px]">
                  ที่อยู่ติดต่อ
                </Text>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="บ้านพี่อยู่ฝั่งทางนู่น บ้านน้องอยู่ฝั่งทางนี้"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Flex>
              <Flex
                className="w-full gap-[12px] max-lg:gap-[20px] md:grid md:grid-cols-2"
                direction="column"
              >
                <Flex alignItems="center" className="gap-[12px]">
                  <Text className="lg:text-[22px] md:min-w-[76px] lg:min-w-[100px]">
                    เบอร์ติดต่อ
                  </Text>
                  <FormField
                    control={form.control}
                    name="phoneNum"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input {...field} placeholder="08x-xxxxxxx" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Flex>
                <Flex alignItems="center" className="gap-[12px]">
                  <Text className="lg:text-[22px] md:min-w-[90px] lg:min-w-[130px]">
                    เบอร์ที่ทำงาน
                  </Text>
                  <FormField
                    control={form.control}
                    name="officeNum"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input {...field} placeholder="08x-xxxxxxx" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Flex>
              </Flex>
              <Flex
                className="w-full gap-[12px] max-lg:gap-[20px] md:grid md:grid-cols-2"
                direction="column"
              >
                <Flex alignItems="center" className="gap-[12px]">
                  <Text className="lg:text-[22px] md:min-w-[110px] lg:min-w-[180px]">
                    กรณีฉุกเฉินติดต่อ
                  </Text>
                  <FormField
                    control={form.control}
                    name="emergencyContact"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input {...field} placeholder="นายอภิชาต ตะบุตร" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Flex>
                <Flex alignItems="center" className="gap-[12px]">
                  <Text className="lg:text-[22px] md:min-w-[80px] lg:min-w-[120px]">
                    เกี่ยวข้องเป็น
                  </Text>
                  <FormField
                    control={form.control}
                    name="parent"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input {...field} placeholder="บิดา" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Flex>
              </Flex>
              <Flex
                className="w-full max-lg:gap-[20px] gap-[12px] md:flex-row md:items-center"
                alignItems="start"
                direction="column"
              >
                <Text className="lg:text-[22px] md:min-w-[110px] lg:min-w-[170px]">
                  ที่อยู่ติดต่อฉุกเฉิน
                </Text>
                <FormField
                  control={form.control}
                  name="emergencyAddress"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="บ้านพี่อยู่ฝั่งทางนู่น บ้านน้องอยู่ฝั่งทางนี้"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Flex>
              <Flex
                className="w-full gap-[12px] max-lg:gap-[20px] md:grid md:grid-cols-2"
                alignItems="start"
                direction="column"
              >
                <Flex alignItems="center">
                  <Text className="lg:text-[22px] md:min-w-[120px] lg:min-w-[170px]">
                    เบอร์ติดต่อฉุกเฉิน
                  </Text>
                  <FormField
                    control={form.control}
                    name="emergencyPhone"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input {...field} placeholder="08x-xxxxxxx" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Flex>
              </Flex>
              <Flex alignItems="start" className="gap-[12px] h-full w-full">
                <Text className="lg:text-[22px] md:mt-3">สิทธิการรักษา</Text>
                <Flex direction="column" className="gap-[12px] xl:flex-row">
                  <FormField
                    control={form.control}
                    name="priv"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="สิทธิการรักษา" />
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
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {form.getValues("priv") === "บัตรทอง" && (
                    <FormField
                      control={form.control}
                      name="hospitalPriv"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="เลือกสถานที่ที่ใช้สิทธิ" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {hospitalPrivOptions.map((option, index) => (
                                    <SelectItem
                                      key={index}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </Flex>
              </Flex>
            </Flex>

            {/**คัดกรองเบื้องต้น */}
            <Flex
              className="w-full h-full border border-[#848484] rounded-[16px] p-6  lg:py-[15px] lg:px-[30px]  gap-[32px] "
              direction="column"
            >
              <Flex direction="column" className="gap-[12px]">
                <Text className="lg:text-[22px]">ความดันโลหิต</Text>
                <Flex
                  direction="column"
                  className="gap-[12px] md:gap-[72px] md:flex-row"
                >
                  <Flex alignItems="center" className="gap-[12px]">
                    <Text className="lg:text-[22px]">{"Systolic (SYS)"}</Text>
                    <FormField
                      control={form.control}
                      name="sys"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="120"
                              className="w-16"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Text className="lg:text-[22px]">mmHg</Text>
                  </Flex>
                  <Flex
                    direction="row"
                    alignItems="center"
                    className="gap-[12px]"
                  >
                    <Text className="lg:text-[22px]">{"Diastolic (DIA)"}</Text>
                    <FormField
                      control={form.control}
                      name="dia"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="80"
                              className="w-16"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Text className="lg:text-[22px]">mmHg</Text>
                  </Flex>
                </Flex>
                <Flex
                  direction="column"
                  className="gap-[12px] md:gap-[64px] md:flex-row"
                >
                  <Flex alignItems="center" className="gap-[12px]">
                    <Text className="lg:text-[22px]">{"Pulse Rate (PR)"}</Text>
                    <FormField
                      control={form.control}
                      name="pr"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="95"
                              className="w-16"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Text className="lg:text-[22px]">ครั้ง/นาที</Text>
                  </Flex>
                  <Flex alignItems="center" className="gap-[12px]">
                    <Text className="lg:text-[22px]">อุณหภูมิ</Text>
                    <FormField
                      control={form.control}
                      name="temperature"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="34"
                              className="w-16"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Text className="lg:text-[22px]">°C</Text>
                  </Flex>
                </Flex>
              </Flex>
              <Flex direction="column" className="gap-[24px]">
                <Text className="lg:text-[22px]" bold>
                  ความเร่งด่วนในการรักษา
                </Text>
                <Flex direction="column" className="md:px-6">
                  <FormField
                    control={form.control}
                    name="urgentLevel"
                    render={({ field }) => (
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="md:flex md:flex-row md:gap-[50px]"
                      >
                        <Flex alignItems="center" className="gap-[8px]">
                          <RadioGroupItem value="Emergency" id="emergency" />
                          <Text
                            className="text-red-600 lg:text-[18px] xl:text-[20px]"
                            bold
                          >
                            Emergency
                          </Text>
                        </Flex>
                        <Flex alignItems="center" className="gap-[8px]">
                          <RadioGroupItem value="Urgency" id="urgency" />
                          <Text
                            className="text-amber-600 lg:text-[18px] xl:text-[20px]"
                            bold
                          >
                            Urgency
                          </Text>
                        </Flex>
                        <Flex alignItems="center" className="gap-[8px]">
                          <RadioGroupItem value="Non-Urgency" id="nonUrgency" />
                          <Text
                            className="text-green-600 lg:text-[18px] xl:text-[20px]"
                            bold
                          >
                            Non-Urgency
                          </Text>
                        </Flex>
                      </RadioGroup>
                    )}
                  />
                </Flex>
              </Flex>
            </Flex>

            {/**คัดกรองจริงๆนะ */}
            <Flex
              className="w-full h-full border border-[#848484] rounded-[16px] p-6  lg:py-[15px] lg:px-[30px]  gap-[32px] "
              direction="column"
            >
              <Text className="lg:text-[22px]" bold>
                เกณฑ์การแพร่กระจายเชื้อ
              </Text>
              <Flex
                direction="column"
                className="gap-[30px] md:grid md:grid-cols-3"
              >
                <Flex direction="column" className="gap-[20px] md:text-center">
                  <Text className="lg:text-[18px] xl:text-[20px]" bold>
                    การแพร่กระจายเชื้อผ่านละอองฝอย
                  </Text>
                  <Flex direction="column" className="gap-[10px]">
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={dropletChecks[0]}
                        onCheckedChange={(value) => {
                          const updated = [...dropletChecks];
                          updated[0] = !!value;
                          setDropletChecks(updated);
                        }}
                      />
                      <Text className="lg:text-[18px]">
                        {"1. มีไข้ (อุณหภูมิ > 37.5 °C"}
                      </Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={dropletChecks[1]}
                        onCheckedChange={(value) => {
                          const updated = [...dropletChecks];
                          updated[1] = !!value;
                          setDropletChecks(updated);
                        }}
                      />
                      <Text className="lg:text-[18px]">
                        {"2. ไอ จาม น้ำมูก"}
                      </Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={dropletChecks[2]}
                        onCheckedChange={(value) => {
                          const updated = [...dropletChecks];
                          updated[2] = !!value;
                          setDropletChecks(updated);
                        }}
                      />
                      <Text className="lg:text-[18px]">
                        {"3. มีเสมหะ เจ็บคอ"}
                      </Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={dropletChecks[3]}
                        onCheckedChange={(value) => {
                          const updated = [...dropletChecks];
                          updated[3] = !!value;
                          setDropletChecks(updated);
                        }}
                      />
                      <Text className="lg:text-[18px]">{"4. ปวดศีรษะ"}</Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={dropletChecks[4]}
                        onCheckedChange={(value) => {
                          const updated = [...dropletChecks];
                          updated[4] = !!value;
                          setDropletChecks(updated);
                        }}
                      />
                      <Text className="lg:text-[18px]">{"5. อ่อนเพลีย"}</Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={dropletChecks[5]}
                        onCheckedChange={(value) => {
                          const updated = [...dropletChecks];
                          updated[5] = !!value;
                          setDropletChecks(updated);
                        }}
                      />
                      <Text className="lg:text-[18px]">
                        {"6. ปวดกล้ามเนื้อ"}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex direction="column" className="gap-[20px] md:text-center">
                  <Text className="lg:text-[18px] xl:text-[20px]" bold>
                    การแพร่เชื้อทางอากาศ
                  </Text>
                  <Flex direction="column" className="gap-[10px]">
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={airborneChecks[0]}
                        onCheckedChange={(value) => {
                          const updated = [...airborneChecks];
                          updated[0] = !!value;
                          setAirborneChecks(updated);
                        }}
                      />
                      <Text className="lg:text-[18px]">
                        {"1. ไอเรื้อรัง เกิน 2 สัปดาห์"}
                      </Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={airborneChecks[1]}
                        onCheckedChange={(value) => {
                          const updated = [...airborneChecks];
                          updated[1] = !!value;
                          setAirborneChecks(updated);
                        }}
                      />
                      <Text className="lg:text-[18px]">{"2. ไอมีเลือดปน"}</Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={airborneChecks[2]}
                        onCheckedChange={(value) => {
                          const updated = [...airborneChecks];
                          updated[2] = !!value;
                          setAirborneChecks(updated);
                        }}
                      />
                      <Text className="lg:text-[18px]">
                        {"3. น้ำหนักลด 3-5 กก./เดือน โดยไม่ทราบสาเหตุ"}
                      </Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={airborneChecks[3]}
                        onCheckedChange={(value) => {
                          const updated = [...airborneChecks];
                          updated[3] = !!value;
                          setAirborneChecks(updated);
                        }}
                      />
                      <Text className="lg:text-[18px]">
                        {"4. มีไข้ตอนบ่าย เกิน 2 สัปดาห์"}
                      </Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={airborneChecks[4]}
                        onCheckedChange={(value) => {
                          const updated = [...airborneChecks];
                          updated[4] = !!value;
                          setAirborneChecks(updated);
                        }}
                      />
                      <Text className="lg:text-[18px]">
                        {"5. มีเหงือออกกลางคืนใน 1 เดือน"}
                      </Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={airborneChecks[5]}
                        onCheckedChange={(value) => {
                          const updated = [...airborneChecks];
                          updated[5] = !!value;
                          setAirborneChecks(updated);
                        }}
                      />
                      <Text className="lg:text-[18px]">
                        {"6. มีประวัติสัมผัสกีบผู้ป่วยวัณโรค"}
                      </Text>
                    </Flex>
                    <Flex direction="column" className="gap-[6px]">
                      <Flex alignItems="center" className="gap-[6px]">
                        <Checkbox
                          checked={airborneChecks[6]}
                          onCheckedChange={(value) => {
                            const updated = [...airborneChecks];
                            updated[6] = !!value;
                            setAirborneChecks(updated);
                          }}
                        />
                        <Text className="lg:text-[18px]">
                          {"7. กำลังรักษาวัณโรค"}
                        </Text>
                      </Flex>
                      {airborneChecks[6] == true && (
                        <Flex alignItems="center" className="gap-2">
                          <Text className="lg:text-[18px]">รักษามาแล้ว</Text>
                          <Input className="w-12" />
                          <Text className="lg:text-[18px]">เดือน</Text>
                        </Flex>
                      )}
                    </Flex>
                  </Flex>
                  <Flex direction="column" className="gap-[10px]">
                    <Text className="lg:text-[20px]" bold>
                      ประวัติผู้ป่วยวัณโรค
                    </Text>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={airborneChecks[7]}
                        onCheckedChange={(value) => {
                          const updated = [...airborneChecks];
                          updated[7] = !!value;
                          setAirborneChecks(updated);
                        }}
                      />
                      <Text className="lg:text-[18px]">
                        มีใบรับรองแพทย์ระยะเวลาไม่เกิน 1 เดือนว่าไม่พบเชื้อแล้ว
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex direction="column" className="gap-[20px] md:text-center">
                  <Text className="lg:text-[18px] xl:text-[20px]" bold>
                    การแพร่เชื้อทางการสัมผัส
                  </Text>
                  <Flex direction="column" className="gap-[10px]">
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={contactChecks[0]}
                        onCheckedChange={(value) => {
                          const updated = [...contactChecks];
                          updated[0] = !!value;
                          setContactChecks(updated);
                        }}
                      />
                      <Text className="lg:text-[18px]">
                        {"1. มีตุ่มน้ำที่ริมฝีปาก"}
                      </Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={contactChecks[1]}
                        onCheckedChange={(value) => {
                          const updated = [...contactChecks];
                          updated[1] = !!value;
                          setContactChecks(updated);
                        }}
                      />
                      <Text className="lg:text-[18px]">
                        {"2. มีแผลเจ็บ แสบ ร้อนที่ริมฝีปาก"}
                      </Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={contactChecks[2]}
                        onCheckedChange={(value) => {
                          const updated = [...contactChecks];
                          updated[2] = !!value;
                          setContactChecks(updated);
                        }}
                      />
                      <Text>{"3. มีตุ่มน้ำใสแนวยาวตามผิวหนังร่างกาย"}</Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={contactChecks[3]}
                        onCheckedChange={(value) => {
                          const updated = [...contactChecks];
                          updated[3] = !!value;
                          setContactChecks(updated);
                        }}
                      />
                      <Text className="lg:text-[18px]">
                        {"4. รู้สึกเจ็บแปลบบริเวณผิวหนัง"}
                      </Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={contactChecks[4]}
                        onCheckedChange={(value) => {
                          const updated = [...contactChecks];
                          updated[4] = !!value;
                          setContactChecks(updated);
                        }}
                      />
                      <Text className="lg:text-[18px]">
                        {"5. รู้สึกคัน ปวดแสบ ปวดร้อนบริเวณผิวหนัง"}
                      </Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={contactChecks[5]}
                        onCheckedChange={(value) => {
                          const updated = [...contactChecks];
                          updated[5] = !!value;
                          setContactChecks(updated);
                        }}
                      />
                      <Text className="lg:text-[18px]">
                        {"6. มีประวัติเคยเป็นเริมหรืองูสวัด"}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              <Flex
                direction="column"
                alignItems="start"
                className="gap-[6px] md:grid md:grid-cols-3 md:items-center"
              >
                <Flex alignItems="center" className="gap-[6px]">
                  <Checkbox checked={checklistSummary[0]} disabled />
                  <Text className="lg:text-[18px]">
                    เข้าเกณฑ์อย่างน้อย 2 ข้อ
                  </Text>
                </Flex>
                <Flex alignItems="center" className="gap-[6px]">
                  <Checkbox checked={checklistSummary[1]} disabled />
                  <Text className="lg:text-[18px]">
                    เข้าเกณฑ์อย่างน้อย 1 ข้อ
                  </Text>
                </Flex>
                <Flex alignItems="center" className="gap-[6px]">
                  <Checkbox checked={checklistSummary[2]} disabled />
                  <Text className="lg:text-[18px]">
                    เข้าเกณฑ์อย่างน้อย 2 ข้อ
                  </Text>
                </Flex>
              </Flex>
              <Flex direction="column" className="gap-[20px]">
                <Text className="lg:text-[22px]" bold>
                  ประเภทผู้ป่วย
                </Text>
                <FormField
                  control={form.control}
                  name="patientType"
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="md:flex md:flex-row"
                    >
                      <Flex alignItems="center" className="gap-[6px]">
                        <RadioGroupItem value="Normal" />
                        <Text className="lg:text-[18px]">
                          ผู้ป่วยไม่เข้าเกณฑ์การแพร่กระจายเชื่อ
                        </Text>
                      </Flex>
                      <Flex alignItems="center" className="gap-[6px]">
                        <RadioGroupItem value="Aware" />
                        <Text className="lg:text-[18px] text-purple-700">
                          ผู้ป่วยเฝ้าระวังการแพร่กระจายเชื้อ
                        </Text>
                      </Flex>
                    </RadioGroup>
                  )}
                />
              </Flex>
            </Flex>

            <Flex
              className="w-full h-full border border-[#848484] rounded-[16px] p-6  lg:py-[15px] lg:px-[30px]  gap-[32px] "
              direction="column"
            >
              <Text className="lg:text-[22px]" bold>
                ภาวะสุขภาพทางระบบ
              </Text>
              <Flex
                direction="column"
                className="gap-[32px] md:gap-[20px] md:grid md:grid-cols-4"
              >
                <Flex alignItems="center" className="gap-[6px]">
                  <Checkbox
                    checked={form.watch("healthConditions.highBP")}
                    onCheckedChange={(val) =>
                      form.setValue("healthConditions.highBP", !!val)
                    }
                  />
                  <Text className="lg:text-[18px]">ความดันโลหิตสูง</Text>
                </Flex>
                <Flex alignItems="center" className="gap-[6px]">
                  <Checkbox
                    checked={form.watch("healthConditions.diabetes")}
                    onCheckedChange={(val) =>
                      form.setValue("healthConditions.diabetes", !!val)
                    }
                  />
                  <Text className="lg:text-[18px]">เบาหวาน</Text>
                </Flex>
                <Flex alignItems="center" className="gap-[6px]">
                  <Checkbox
                    checked={form.watch("healthConditions.heart")}
                    onCheckedChange={(val) =>
                      form.setValue("healthConditions.heart", !!val)
                    }
                  />
                  <Text className="lg:text-[18px]">โรคหัวใจ</Text>
                </Flex>
                <Flex alignItems="center" className="gap-[6px]">
                  <Checkbox
                    checked={form.watch("healthConditions.thyroid")}
                    onCheckedChange={(val) =>
                      form.setValue("healthConditions.thyroid", !!val)
                    }
                  />
                  <Text className="lg:text-[18px]">โรคไทรอยด์</Text>
                </Flex>
              </Flex>
              <Flex
                direction="column"
                className="gap-[32px] md:gap-[20px] md:flex-row"
              >
                <Flex alignItems="center" className="gap-[6px]">
                  <Checkbox
                    checked={form.watch("healthConditions.stroke")}
                    onCheckedChange={(val) =>
                      form.setValue("healthConditions.stroke", !!val)
                    }
                  />
                  <Text className="lg:text-[18px]">
                    {"มีประวัติเป็นโรคหลอดเลือดสมอง (stroke) หรือเคยมีอาการ"}
                  </Text>
                </Flex>
                <Flex alignItems="center" className="gap-[6px]">
                  <Checkbox
                    checked={form.watch("healthConditions.immuno")}
                    onCheckedChange={(val) =>
                      form.setValue("healthConditions.immuno", !!val)
                    }
                  />
                  <Text className="lg:text-[18px]">ภาวะภูมิคุ้มกันบกพร่อง</Text>
                </Flex>
              </Flex>
              <Flex
                direction="column"
                className="gap-[32px] md:gap-[20px] md:flex-row"
              >
                <Flex alignItems="center" className="gap-[6px]">
                  <Checkbox
                    checked={form.watch("healthConditions.pregnant")}
                    onCheckedChange={(val) =>
                      form.setValue("healthConditions.pregnant", !!val)
                    }
                  />
                  <Text className="lg:text-[18px] lg:min-w-[80px]">
                    ตั้งครรภ์{" "}
                  </Text>
                  {form.getValues("healthConditions.pregnant") == true && (
                    <>
                      <Input
                        name="pregnantWeek"
                        value={form.watch("healthConditions.pregnantWeeks")}
                        onChange={(e) =>
                          form.setValue(
                            "healthConditions.pregnantWeeks",
                            e.target.value
                          )
                        }
                      />
                      <Text className="lg:text-[18px] ">สัปดาห์</Text>
                    </>
                  )}
                </Flex>
                <Flex alignItems="center" className="gap-[6px]">
                  <Checkbox
                    checked={form.watch("healthConditions.otherChecked")}
                    onCheckedChange={(val) =>
                      form.setValue("healthConditions.otherChecked", !!val)
                    }
                  />
                  <Text className="lg:text-[18px] lg:min-w-[50px]">
                    {" "}
                    อื่น ๆ
                  </Text>
                  {form.getValues("healthConditions.otherChecked") == true && (
                    <Input
                      name="other"
                      value={form.watch("healthConditions.other")}
                      onChange={(e) =>
                        form.setValue("healthConditions.other", e.target.value)
                      }
                    />
                  )}
                </Flex>
              </Flex>
            </Flex>

            <Flex
              className="w-full max-lg:gap-[20px] md:flex-row"
              alignItems="center"
              justifyContent="between"
              direction="column"
            >
              <Flex className="gap-[12px]" alignItems="center">
                <FormField
                  control={form.control}
                  name="isVerified"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Text className="text-[14px] lg:text-[20px]" medium>
                  ข้าพเจ้ายินยอมเปิดเผยข้อมูลส่วนตัวและยืนยันว่าข้อมูลข้างต้นเป็นความจริง
                </Text>
              </Flex>
              <Flex>
                <Button type="submit" size={"sm"}>
                  <CirclePlusIcon />
                  <Text>เพิ่มคนไข้</Text>
                </Button>
              </Flex>
            </Flex>

            {verifyOn == true && (
              <VerifyModal
                message="ยืนยันการเพิ่มคนไข้"
                onCancel={handleModal}
                onVerify={handleAddPatient}
              />
            )}

            {modalOn && !error && (
              <SuccessModal message={successMessage} isVisible={modalOn} />
            )}
            {modalOn && !!error && (
              <ErrorModal message={error} isVisible={modalOn} />
            )}
          </form>
        </Form>
      </ScrollArea>
    </Flex>
  );
}

export default Patientform;

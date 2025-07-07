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
import { AddIcon } from "@/assets/svg/index";
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
  isVerified: z.boolean().refine((val) => val === true, {
    message: "กรุณายืนยันข้อมูลก่อนเพิ่มคนไข้",
  }),
});

type PatientFormData = z.infer<typeof patientSchema>;

function Patientform() {
  const [age, setAge] = useState<number | undefined>(undefined);
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [verifyOn, setVerifyOn] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const thPrefixes = [
    { value: "นาย", label: "นาย" },
    { value: "นาง", label: "นาง" },
    { value: "นางสาว", label: "นางสาว" },
    { value: "เด็กชาย", label: "เด็กชาย" },
    { value: "เด็กหญิง", label: "เด็กหญิง" },
  ];

  const enPrefixes = [
    { value: "Mr.", label: "Mr." },
    { value: "Mrs.", label: "Mrs." },
    { value: "Ms.", label: "Ms." },
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
    { value: "ประกันสังคม", label: "ประกันสังคม" },
    { value: "ประกันสุขภาพ", label: "ประกันสุขภาพ" },
    { value: "สิทธิการรักษาบัตรทอง", label: "สิทธิการรักษาบัตรทอง" },
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
        "https://localhost:7017/api/tpatient",
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
    if (watchedBirthdate) {
      const calculatedAge = dayjs().diff(dayjs(watchedBirthdate), "year");
      setAge(calculatedAge);
    } else {
      setAge(undefined);
    }
  }, [watchedBirthdate, watchedPriv]);

  return (
    <Flex direction="column" className="xl:h-screen ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleModal)}
          className="flex-1 flex flex-col min-h-0 gap-4"
        >
          <ScrollArea className=" lg:h-[calc(100vh-150px)] rounded-md ">
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
                    เลขประจำตัวประชาชน
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
                  {/* <Select
                    name="priv"
                    onValueChange={(e) => setPriv(e as string)}
                  >
                    <SelectTrigger className="border-[3px] border-[#A861D4]">
                      <SelectValue placeholder="เลือกสิทธิการรักษา" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>
                          <Text className="min-w-[500px]"> สิทธิการรักษา</Text>
                        </SelectLabel>
                        {privOptions.map((option, index) => (
                          <SelectItem key={index} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {priv === "สิทธิการรักษาบัตรทอง" && (
                    <Select
                      name="hospitalPriv"
                      onValueChange={(e) => sethospitalPriv(e as string)}
                    >
                      <SelectTrigger className="border-[3px] border-[#A861D4] w-full">
                        <SelectValue placeholder="เลือกสถานที่ที่ใช้สิทธิ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {hospitalPrivOptions.map((option, index) => (
                            <SelectItem key={index} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )} */}
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
                  {form.getValues("priv") === "สิทธิการรักษาบัตรทอง" && (
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
          </ScrollArea>
          <Flex
            className="w-full max-lg:gap-[20px] md:flex-row"
            alignItems="center"
            justifyContent="between"
            direction="column"
          >
            <Flex className="gap-[12px]" alignItems="center">
              {/* <Checkbox
                    checked={isVerified}
                    onCheckedChange={(checked) =>
                      setIsVerified(checked as boolean)
                    }
                  /> */}
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
              <Button
                size={"sm"}
                className="bg-[#A861D4] hover:bg-[#A861D4]/70"
                // onClick={handleModal}
              >
                <AddIcon />
                <Text>เพิ่มคนไข้</Text>
              </Button>
            </Flex>
          </Flex>

          {verifyOn == true && (
            <Flex
              className="fixed inset-0 z-50 bg-black/40"
              justifyContent="center"
              alignItems="center"
            >
              <VerifyModal
                message="ยืนยันการเพิ่มคนไข้"
                onCancel={handleModal}
                onVerify={handleAddPatient}
              />
            </Flex>
          )}

          {modalOn && !error && (
            <SuccessModal message={successMessage} isVisible={modalOn} />
          )}
          {modalOn && !!error && (
            <ErrorModal message={error} isVisible={modalOn} />
          )}
        </form>
      </Form>
    </Flex>
  );
}

export default Patientform;

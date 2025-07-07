import { useEffect, useState } from "react";
import Flex from "@/components/Flex";
import { Input } from "@/components/ui/input";
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
import { Button } from "@/components/ui/button";
import { ErrorModal, SuccessModal, VerifyModal } from "@/components/Modal";
import axios from "axios";
import { AddIcon, SaveIcon } from "@/assets/svg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type Staff = {
  staffCode: string;
  license: string;
  title: "นาย" | "นางสาว" | "นาง" | "อื่น ๆ";
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  role: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  sort: 0;
  type: "ไม่ระบุ";
  clinic:
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "11"
    | "12"
    | "13"
    | "14"
    | "15"
    | "-";
};

interface Props {
  onClose: () => void;
  onUserAdded?: () => void;
  onEdit?: boolean;
  user?: number | null;
}

const formSchema = z.object({
  firstname: z.string().min(1, {
    message: "กรุณากรอกชื่อ",
  }),
  lastname: z.string().min(1, {
    message: "กรุณากรอกนามสกุล",
  }),
  username: z.string().min(1, {
    message: "กรุณากรอกชื่อผู้ใช้",
  }),
  password: z.string().min(1, {
    message: "กรุณากรอกรหัสผ่าน",
  }),
});

function Addstaffform({ onClose, onUserAdded, onEdit, user }: Props) {
  const [staffCode, setStaffCode] = useState<Staff["staffCode"]>("");
  const [license, setLicense] = useState<Staff["license"]>("");
  const [title, setTitle] = useState<Staff["title"]>("นาย");
  const [role, setRole] = useState<Staff["role"]>(1);
  const [sort, setSort] = useState<Staff["sort"]>(0);
  const [type, setType] = useState<Staff["type"]>("ไม่ระบุ");
  const [clinic, setClinic] = useState<Staff["clinic"]>("1");
  const [verifyOn, setVerifyOn] = useState<boolean>(false);
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
    },
  });

  const titleOptions = [
    { value: "นาย", label: "นาย" },
    { value: "นางสาว", label: "นางสาว" },
    { value: "นาง", label: "นาง" },
    { value: "อื่น ๆ", label: "อื่น ๆ" },
  ];

  const roleOptions = [
    { value: 1, label: "Administrator" },
    { value: 2, label: "ระบบนัดหมาย" },
    { value: 3, label: "การเงิน" },
    { value: 4, label: "เวชระเบียน" },
    { value: 5, label: "อาจารย์" },
    { value: 6, label: "ปริญญาตรี" },
    { value: 7, label: "ระบบยา" },
    { value: 8, label: "ผู้ใช้งานทั่วไป" },
    { value: 9, label: "ปริญญาโท" },
    { value: 10, label: "RequirementDiag" },
    { value: 11, label: "หัวหน้าผู้ช่วยทันตแพทย์" },
    { value: 12, label: "ผู้ช่วยทันตแพทย์" },
  ];

  const sortOptions = [{ value: 0, label: "ไม่ระบุ" }];

  const typeOptions = [{ value: "ไม่ระบุ", label: "ไม่ระบุ" }];

  const clinincOptions = [
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
    { value: "-", label: "ไม่ระบุ" },
  ];

  const handleModal = () => {
    setVerifyOn(!verifyOn);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Trigger validation first
    const isValid = await form.trigger();
    if (!isValid) {
      return;
    }

    // Show verification modal if validation passes
    setVerifyOn(true);
  };

  const handleAddOrUpdateStaff = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const formValues = form.getValues();

      const staffPayload = {
        license: license,
        fName: formValues.firstname,
        lName: formValues.lastname,
        studentID: staffCode,
        roleID: role,
        status: 0,
        users: formValues.username,
        passw: formValues.password,
        tName: title,
        sort: sort === 0 ? null : sort,
        type: type === "ไม่ระบุ" ? null : type,
        clinicid: clinic === "-" ? null : clinic,
      };

      let response;

      if (onEdit && user) {
        console.log("กำลังดำเนินการอัปเดทข้อมูล...");
        response = await axios.patch(
          `https://localhost:7017/api/tbdentalrecorduser/${user}`,
          staffPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response) {
          setVerifyOn(false);
          setError("");
          setSuccessMessage("อัปเดทข้อมูลเจ้าหน้าที่สำเร็จ");
          setModalOn(true);

          setTimeout(() => {
            setModalOn(false);
            if (onUserAdded) {
              onUserAdded(); // เรียกใช้ onUserAdded (handleAfterEdit) ที่นี่
            }
            onClose();
          }, 1000);
        }
      } else {
        response = await axios.post(
          "https://localhost:7017/api/tbdentalrecorduser",
          staffPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response) {
          setVerifyOn(false);
          setError("");
          setSuccessMessage("เพิ่มเจ้าหน้าที่สำเร็จ");
          setModalOn(true);

          setTimeout(() => {
            setModalOn(false);
            if (onUserAdded) {
              onUserAdded();
            }
            onClose();
          }, 1000);
        }
      }
    } catch (e: any) {
      let errorMessage = e.response?.data?.message;
      if (errorMessage == "Firstname required.") {
        setError("กรุณากรอกชื่อ");
      } else if (errorMessage == "Role ID required.") {
        setError("กรุณากรอกตำแหน่ง");
      } else if (errorMessage == "Username required.") {
        setError("กรุณากรอกชื่อผู้ใช้");
      } else if (errorMessage == "Password required.") {
        setError("กรุณากรอกรหัสผ่าน");
      } else {
        setError("เซิร์ฟเวอร์ขัดข้อง");
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
    if (onEdit && user) {
      const staffFetch = async () => {
        try {
          const token = sessionStorage.getItem("token");
          const response = await axios.get(
            `https://localhost:7017/api/tbdentalrecorduser/${user}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log(response?.data);
          if (response?.data) {
            setStaffCode(response?.data.studentID || "");
            setLicense(response?.data.license || "");
            setTitle((response?.data.tname as Staff["title"]) || "นาย");
            setRole((response?.data.roleID as Staff["role"]) || 1);
            setSort((response?.data.sort as Staff["sort"]) || 0);
            setType((response?.data.type as Staff["type"]) || "ไม่ระบุ");
            setClinic((response?.data.clinicid as Staff["clinic"]) || "1");

            // Set form values for controlled inputs
            form.setValue("firstname", response?.data.fname || "");
            form.setValue("lastname", response?.data.lname || "");
            form.setValue("username", response?.data.users || "");
            form.setValue("password", response?.data.passw || "");
          }
        } catch (e: any) {
          let errorMessage = e.response?.data;
          // console.error(errorMessage);
          if (errorMessage == "Unauthorized") {
            setError("ไม่มีสิทธิ์เข้าถึงข้อมูล");
          } else if (errorMessage == "Tbdentalrecorduser not found.") {
            setError("ไม่พบผู้ใช้");
          } else setError("เซิร์ฟเวอร์ขัดข้อง");

          setVerifyOn(false);
          setModalOn(true);

          setTimeout(() => {
            setError("");
            setModalOn(false);
          }, 1000);
        }
      };

      staffFetch();
    }
  }, [onEdit, user, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Flex direction="column" justifyContent="center" className="gap-6">
          <Flex className="gap-6 w-full max-lg:flex-col">
            <Flex alignItems="center" className="gap-[16px] ">
              <Text className="min-w-[100px] text-black lg:text-[20px]">
                รหัสนิสิต
              </Text>
              <Input
                type="text"
                name="staffcode"
                value={staffCode}
                onChange={(e) => setStaffCode(e.target.value)}
                placeholder="68xxxxxx"
              />
            </Flex>
            <Flex alignItems="center" className="gap-[16px]">
              <Text className="min-w-[120px] md:min-w-[200px] text-black lg:text-[20px]">
                เลขที่ใบประกอบวิชาชีพ
              </Text>
              <Input
                type="text"
                name="license"
                value={license}
                onChange={(e) => setLicense(e.target.value)}
                placeholder="x-xxx-xxxxx-xx"
              />
            </Flex>
          </Flex>
          <Flex className="gap-6 max-lg:flex-col">
            <Flex alignItems="center" className="gap-[16px]">
              <Text className="min-w-[90px] text-black lg:text-[20px]">
                คำนำหน้า
              </Text>
              <Select
                name="title"
                value={onEdit ? title : undefined}
                onValueChange={(e) => setTitle(e as Staff["title"])}
              >
                <SelectTrigger className="border-[3px] border-[#A861D4] rounded-[6px] w-full">
                  <SelectValue placeholder="เลือกคำนำหน้า" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>คำนำหน้า</SelectLabel>
                    {titleOptions.map((option, index) => (
                      <SelectItem key={index} value={option.value.toString()}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Flex>
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <Text className="text-black lg:text-[20px]">ชื่อ</Text>
                  <Flex
                    direction="column"
                    alignItems="start"
                    className="max-lg:flex-row max-lg:gap-4"
                  >
                    <FormControl>
                      <Input type="text" placeholder="ยิ่งอยู่" {...field} />
                    </FormControl>
                    <FormMessage />
                  </Flex>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <Text className="text-black lg:text-[20px]">นามสกุล</Text>
                  <Flex
                    direction="column"
                    alignItems="start"
                    className="max-lg:flex-row max-lg:gap-4"
                  >
                    <FormControl>
                      <Input type="text" placeholder="ยิ่งเจริญ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </Flex>
                </FormItem>
              )}
            />
          </Flex>
          <Flex className="gap-6 max-lg:flex-col">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <Text className="min-w-[60px] text-black lg:text-[20px]">
                    ชื่อผู้ใช้
                  </Text>
                  <Flex
                    direction="column"
                    alignItems="start"
                    className="max-lg:flex-row max-lg:gap-4"
                  >
                    <FormControl>
                      <Input type="text" placeholder="inwza007" {...field} />
                    </FormControl>
                    <FormMessage />
                  </Flex>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <Text className="min-w-[80px] text-black lg:text-[20px]">
                    รหัสผ่าน
                  </Text>
                  <Flex
                    direction="column"
                    alignItems="start"
                    className="max-lg:flex-row max-lg:gap-4"
                  >
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </Flex>
                </FormItem>
              )}
            />
          </Flex>
          <Flex className="gap-6 max-md:flex-col">
            <Flex alignItems="center" className="gap-[16px]">
              <Text className="text-black lg:text-[20px]">ตำแหน่ง</Text>
              <Select
                name="role"
                value={onEdit ? role.toString() : undefined}
                onValueChange={(e) => setRole(Number(e) as Staff["role"])}
              >
                <SelectTrigger className="border-[3px] border-[#A861D4] rounded-[6px] w-full">
                  <SelectValue placeholder="เลือกตำแหน่ง" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>บทบาท</SelectLabel>
                    {roleOptions.map((option, index) => (
                      <SelectItem key={index} value={option.value.toString()}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Flex>
            <Flex alignItems="center" className="gap-[16px]">
              <Text className="text-black lg:text-[20px]">Sort</Text>

              <Select
                name="sort"
                value={onEdit ? sort.toString() : undefined}
                onValueChange={(e) => setSort(Number(e) as Staff["sort"])}
              >
                <SelectTrigger className="border-[3px] border-[#A861D4] rounded-[6px] w-full">
                  <SelectValue placeholder="เลือกประเภท" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort</SelectLabel>
                    {sortOptions.map((option, index) => (
                      <SelectItem key={index} value={option.value.toString()}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Flex>
          </Flex>
          <Flex className="gap-6 max-md:flex-col">
            <Flex alignItems="center" className="gap-[16px]">
              <Text className="text-black lg:text-[20px]">Type</Text>

              <Select
                name="type"
                value={onEdit ? type : undefined}
                onValueChange={(e) => setType(e as Staff["type"])}
              >
                <SelectTrigger className="border-[3px] border-[#A861D4] rounded-[6px] w-full">
                  <SelectValue placeholder="เลือกชนิด" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Type</SelectLabel>
                    {typeOptions.map((option, index) => (
                      <SelectItem key={index} value={option.value.toString()}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Flex>
            <Flex alignItems="center" className="gap-[16px]">
              <Text className="text-black lg:text-[20px]">Clinic</Text>
              <Select
                name="clinic"
                value={onEdit ? clinic.toString() : undefined}
                onValueChange={(e) => setClinic(e as Staff["clinic"])}
              >
                <SelectTrigger className="border-[3px] border-[#A861D4] rounded-[6px] w-full">
                  <SelectValue placeholder="เลือกคลินิก" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Clinic</SelectLabel>
                    {clinincOptions.map((option, index) => (
                      <SelectItem key={index} value={option.value.toString()}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Flex>
          </Flex>
          <Flex justifyContent="center">
            <Button
              type="submit"
              size={"sm"}
              className="bg-[#A861D4] hover:bg-[#A861D4]/70"
            >
              {onEdit ? <SaveIcon /> : <AddIcon />}
              <Text className="lg:text-[20px]">
                {onEdit ? "บันทึก" : "เพิ่มเจ้าหน้าที่"}
              </Text>
            </Button>
          </Flex>
        </Flex>
      </form>

      {verifyOn == true && (
        <Flex
          className="fixed inset-0 z-50 bg-black/40"
          justifyContent="center"
          alignItems="center"
        >
          <VerifyModal
            message={onEdit ? "ยืนยันการอัปเดทข้อมูล" : "ยืนยันการเพิ่มข้อมูล"}
            onCancel={handleModal}
            onVerify={handleAddOrUpdateStaff}
          />
        </Flex>
      )}

      {modalOn && !error && (
        <SuccessModal message={successMessage} isVisible={modalOn} />
      )}
      {modalOn && !!error && <ErrorModal message={error} isVisible={modalOn} />}
    </Form>
  );
}

export default Addstaffform;

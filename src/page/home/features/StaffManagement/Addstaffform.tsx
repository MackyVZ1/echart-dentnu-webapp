/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { CirclePlusIcon, Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/Loading";

type Staff = {
  studentID: string;
  license: string;
  tname: string;
  fname: string;
  lname: string;
  users: string;
  passw: string;
  roleID: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | null;
  sort: number | null;
  type: string;
  clinicid: string | null;
};

export type Clinic = {
  clinicid: number;
  clinicName: string;
};

interface Props {
  onClose: () => void;
  onUserAdded?: () => void;
  onEdit?: boolean;
  user?: number | null;
}

const formSchema = z.object({
  fname: z.string().min(1, {
    message: "กรุณากรอกชื่อ",
  }),
  lname: z.string().min(1, {
    message: "กรุณากรอกนามสกุล",
  }),
  users: z.string().min(1, {
    message: "กรุณากรอกชื่อผู้ใช้",
  }),
  passw: z.string().min(1, {
    message: "กรุณากรอกรหัสผ่าน",
  }),
});

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Addstaffform({ onClose, onUserAdded, onEdit, user }: Props) {
  const [staff, setStaff] = useState<Staff>({
    studentID: "",
    license: "",
    tname: "นาย",
    fname: "",
    lname: "",
    users: "",
    passw: "",
    roleID: null,
    sort: null,
    type: "",
    clinicid: "",
  });

  // Modal Management
  const [verifyOn, setVerifyOn] = useState<boolean>(false);
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Navigate
  const nav = useNavigate();

  // Loading State
  const [fetchLoading, setfetchLoading] = useState<boolean>(false);
  const [addLoading, setaddLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      users: staff.users,
      passw: staff.passw,
      fname: staff.fname,
      lname: staff.lname,
    },
  });

  const titleOptions = [
    { value: "นาย", label: "นาย" },
    { value: "นางสาว", label: "นางสาว" },
    { value: "นาง", label: "นาง" },
    { value: "อื่น ๆ", label: "อื่น ๆ" },
  ];

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

  const isCustomTitle = !titleOptions.some(
    (option) => option.value === staff.tname
  );

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

  const updateStaff = (updates: Partial<Staff>) => {
    const formValues = form.getValues();
    setStaff((prev) => ({ ...prev, ...formValues, ...updates }));
  };

  const handleModal = () => {
    setVerifyOn(!verifyOn);
  };

  const onSubmit = async () => {
    // Trigger validation first
    const isValid = await form.trigger();
    if (!isValid) {
      return;
    }

    // Show verification modal if validation passes
    setVerifyOn(true);
  };

  const handleAddOrUpdateStaff = async () => {
    setVerifyOn(false);
    setaddLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const formValues = form.getValues();

      const staffPayload = {
        license: staff.license || null,
        fName: formValues.fname,
        lName: formValues.lname,
        studentID: staff.studentID || null,
        roleID: staff.roleID,
        status: 0,
        users: formValues.users,
        passw: formValues.passw,
        tName: staff.tname,
        sort: staff.sort === 0 ? null : staff.sort,
        type: staff.type === "ไม่ระบุ" ? null : staff.type,
        clinicid: staff.clinicid || null,
      };

      let response;

      if (onEdit && user) {
        // console.log("กำลังดำเนินการอัปเดทข้อมูล...");
        response = await axios.patch(
          `${API_BASE_URL}/api/tbdentalrecorduser/${user}`,
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
          `${API_BASE_URL}/api/tbdentalrecorduser`,
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
      let errorStatus = e.response?.status;

      if (errorStatus == 400) {
        if (errorMessage == "Firstname required.") {
          setError("กรุณากรอกชื่อ");
        } else if (errorMessage == "Role ID required.") {
          setError("กรุณากรอกตำแหน่ง");
        } else if (errorMessage == "Username required.") {
          setError("กรุณากรอกชื่อผู้ใช้");
        } else if (errorMessage == "Password required.") {
          setError("กรุณากรอกรหัสผ่าน");
        }
        setVerifyOn(false);
        setModalOn(true);

        return setTimeout(() => {
          setModalOn(false);
          setError("");
        }, 2000);
      } else if (errorStatus == 401) {
        setError("ไม่ได้รับอนุญาตให้ใช้งาน");
        setVerifyOn(false);
        setModalOn(true);
        sessionStorage.clear();

        return setTimeout(() => {
          setModalOn(false);
          setError("");
          nav("/");
        }, 2000);
      } else if (errorStatus === 403) {
        setError("ไม่มีสิทธิ์ในการเข้าใช้ฟีเจอร์นี้");
        setVerifyOn(false);
        setModalOn(true);

        return setTimeout(() => {
          setModalOn(false);
          setError("");
        }, 2000);
      } else if (errorStatus === 404) {
        setError("ไม่พบข้อมูลเจ้าหน้าที่");
        setVerifyOn(false);
        setModalOn(true);

        return setTimeout(() => {
          setModalOn(false);
          setError("");
        }, 2000);
      } else {
        setError(`เซิร์ฟเวอร์ขัดข้อง: ${errorMessage}`);
        setVerifyOn(false);
        setModalOn(true);

        return setTimeout(() => {
          setError("");
          setModalOn(false);
        }, 2000);
      }
    } finally {
      setaddLoading(false);
    }
  };

  const staffFetch = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(
        `${API_BASE_URL}/api/tbdentalrecorduser/${user}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(response?.data);
      if (response?.data) {
        const staffData = response?.data;

        const updatedStaff: Staff = {
          studentID: staffData.studentID || "",
          license: staffData.license || "",
          tname: staffData.tname || "นาย",
          fname: staffData.fname || "",
          lname: staffData.lname || "",
          users: staffData.users || "",
          passw: staffData.passw || "",
          roleID: staffData.roleID || 1,
          sort: staffData.sort || 0,
          type: staffData.type || "ไม่ระบุ",
          clinicid: staffData.clinicid,
        };

        setStaff(updatedStaff);
      }
    } catch (e: any) {
      let errorMessage = e.response?.data;
      let errorStatus = e.response?.status;
      // console.error(errorMessage);
      if (errorStatus == 401) {
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
        setError("ไม่พบข้อมูลเจ้าหน้าที่");
        setModalOn(true);

        return setTimeout(() => {
          setModalOn(false);
          setError("");
        }, 2000);
      } else {
        setError(`เซิร์ฟเวอร์ขัดข้อง: ${errorMessage}`);
        setModalOn(true);

        return setTimeout(() => {
          setError("");
          setModalOn(false);
        }, 2000);
      }
    } finally {
      setfetchLoading(false);
    }
  };

  useEffect(() => {
    form.setValue("fname", staff.fname);
    form.setValue("lname", staff.lname);
    form.setValue("users", staff.users);
    form.setValue("passw", staff.passw);
  }, [staff, form]);

  useEffect(() => {
    if (onEdit && user) {
      setfetchLoading(true);
      staffFetch();
    }
    // console.log(staff);
  }, [onEdit, user]);

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
                name="studentID"
                value={staff.studentID}
                onChange={(e) => updateStaff({ studentID: e.target.value })}
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
                value={staff.license}
                onChange={(e) => updateStaff({ license: e.target.value })}
                placeholder="x-xxx-xxxxx-xx"
              />
            </Flex>
          </Flex>
          <Flex className="gap-6 max-lg:flex-col">
            <Flex alignItems="center" className="gap-[16px]">
              <Text className="min-w-[90px] text-black lg:text-[20px]">
                คำนำหน้า
              </Text>
              {staff.tname === "อื่น ๆ" || isCustomTitle ? (
                <Flex alignItems="center" className="gap-2">
                  <Input
                    type="text"
                    name="title"
                    value={staff.tname === "อื่น ๆ" ? "" : staff.tname}
                    onChange={(e) => updateStaff({ tname: e.target.value })}
                    placeholder="กรอกคำนำหน้า"
                  />
                  <Button
                    variant={"destructive"}
                    onClick={() => updateStaff({ tname: "นาย" })}
                  >
                    <X color="white" />
                  </Button>
                </Flex>
              ) : (
                <Select
                  name="title"
                  value={staff.tname}
                  onValueChange={(e) => updateStaff({ tname: e })}
                >
                  <SelectTrigger className="rounded-[6px] w-full">
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
              )}
            </Flex>
            <FormField
              control={form.control}
              name="fname"
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
              name="lname"
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
              name="users"
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
              name="passw"
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
                value={staff?.roleID?.toString()}
                onValueChange={(e) =>
                  updateStaff({ roleID: Number(e) as Staff["roleID"] })
                }
              >
                <SelectTrigger className="rounded-[6px] w-full">
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
                value={staff?.sort?.toString()}
                onValueChange={(e) => updateStaff({ sort: Number(e) })}
              >
                <SelectTrigger className="rounded-[6px] w-full">
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
                value={staff.type}
                onValueChange={(e) => updateStaff({ type: e })}
              >
                <SelectTrigger className="rounded-[6px] w-full">
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
                value={staff?.clinicid?.toString() || ""}
                onValueChange={(e) => updateStaff({ clinicid: e })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="เลือกคลินิก" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Clinic</SelectLabel>
                    {clinicOptions.map((clinic) => (
                      <SelectItem key={clinic.value} value={clinic.value}>
                        {clinic.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Flex>
          </Flex>
          <Flex justifyContent="center">
            <Button type="submit" size={"sm"}>
              {onEdit ? <Save /> : <CirclePlusIcon />}
              <Text className="lg:text-[20px]">
                {onEdit ? "บันทึก" : "เพิ่มเจ้าหน้าที่"}
              </Text>
            </Button>
          </Flex>
        </Flex>
      </form>

      {fetchLoading && <Loading isOpen message="กำลังโหลดเจ้าหน้าที่" />}
      {addLoading && (
        <Loading
          isOpen
          message={onEdit ? "กำลังอัปเดทเจ้าหน้าที่" : "กำลังเพิ่มเจ้าหน้าที่"}
        />
      )}

      {verifyOn == true && (
        <VerifyModal
          message={onEdit ? "ยืนยันการอัปเดทข้อมูล" : "ยืนยันการเพิ่มข้อมูล"}
          onCancel={handleModal}
          onVerify={handleAddOrUpdateStaff}
        />
      )}

      {modalOn && !error && (
        <SuccessModal message={successMessage} isVisible={modalOn} />
      )}
      {modalOn && !!error && <ErrorModal message={error} isVisible={modalOn} />}
    </Form>
  );
}

export default Addstaffform;

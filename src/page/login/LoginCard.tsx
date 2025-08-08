/* eslint-disable react-refresh/only-export-components */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Flex from "../../components/Flex";
import { Input } from "@/components/ui/input";
import Text from "../../components/Text";
import LogoBackground from "./LogoBackground";
import { useState } from "react";
import axios from "axios";
import { SuccessModal, ErrorModal } from "../../components/Modal";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loading from "@/components/Loading";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function LoginCard() {
  // Navigate
  const nav = useNavigate();

  // Modal State
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLoginSuccess, setIsLoginSuccess] = useState<boolean>(false);

  // Loading State
  const [loading, setLoading] = useState<boolean>(false);

  // Default Value Login Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSignup = async (values: z.infer<typeof formSchema>) => {
    setError("");
    setIsLoginSuccess(false);
    setModalOn(false);
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        users: values.username,
        passw: values.password,
      });

      if (response?.data) {
        // console.log(response?.data);
        const user = response?.data;
        const token = user.accessToken;

        sessionStorage.setItem("userId", user.userId);
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("users", user.users);
        sessionStorage.setItem("roleName", user.role);
        sessionStorage.setItem("roleId", user.roleID);
        sessionStorage.setItem("clinicId", user.clinicId);

        setIsLoginSuccess(true); // ตั้งค่าเป็น true เมื่อเข้าสู่ระบบสำเร็จ
        setModalOn(true); // เปิด modal สำหรับ SuccessModal

        setTimeout(() => {
          setModalOn(false);
          nav("/home");
        }, 1000);
      } else {
        // กรณีที่ response ไม่มีข้อมูล (ไม่น่าจะเกิดขึ้นถ้าสำเร็จ) หรือมี response แต่ไม่มี data
        setError("เกิดข้อผิดพลาดที่ไม่รู้จัก");
        setModalOn(true);
        setTimeout(() => {
          setError("");
          setModalOn(false);
        }, 2000);
      }
    } catch (e: any) {
      // ตรวจสอบชนิดของ error
      if (axios.isAxiosError(e)) {
        // นี่คือข้อผิดพลาดจาก Axios
        if (e.response) {
          // มี response กลับมา (เช่น 4xx, 5xx)
          let errorStatus = e.response.status;
          let errorMessage = e.response.data;

          if (errorStatus === 400) {
            if (errorMessage === "Username and password are required") {
              setError("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");
            } else {
              setError("รหัสผ่านผิด");
            }
            setModalOn(true);
            setTimeout(() => {
              setError("");
              setModalOn(false);
            }, 2000);
          } else if (errorStatus === 404) {
            setError("ไม่พบผู้ใช้");
            setModalOn(true);
            setTimeout(() => {
              setError("");
              setModalOn(false);
            }, 2000);
          } else {
            // ข้อผิดพลาด Server อื่นๆ ที่มี response
            setError(`เซิร์ฟเวอร์ขัดข้อง: ${errorStatus})`);
            setModalOn(true);
            setTimeout(() => {
              setError("");
              setModalOn(false);
            }, 2000);
          }
        } else if (e.request) {
          // นี่คือกรณีที่ `err_network_refused` หรือไม่มีการเชื่อมต่อเลย
          setError(
            "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ โปรดตรวจสอบการเชื่อมต่ออินเทอร์เน็ตหรือลองใหม่อีกครั้ง"
          );
          setModalOn(true);
          setTimeout(() => {
            setError("");
            setModalOn(false);
          }, 2000);
        } else {
          // ข้อผิดพลาดอื่นๆ ที่ไม่ใช่ Axios error หรือเป็น error ในการตั้งค่า request
          setError("เกิดข้อผิดพลาดที่ไม่รู้จักในการส่งคำขอ");
          setModalOn(true);
          setTimeout(() => {
            setError("");
            setModalOn(false);
          }, 2000);
        }
      } else {
        // ข้อผิดพลาดที่ไม่ใช่ Axios error (เช่น TypeError)
        setError("เกิดข้อผิดพลาดที่ไม่คาดคิด");
        setModalOn(true);
        setTimeout(() => {
          setError("");
          setModalOn(false);
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LogoBackground>
        <Card
          className={`w-[340px] p-[20px] rounded-4xl bg-[#4B006E]/60 gap-[20px] shadow-lg shadow-[#75389b] 
        md:w-[600px] md:h-[480px] md:p-[40px]
        lg:h-[550px] border-0`}
        >
          <CardHeader>
            <CardTitle className="text-center">
              <Text
                semibold
                className={`text-white text-[28px] md:text-[36px]`}
              >
                .: e-Chart :.
              </Text>
            </CardTitle>
            <CardDescription className="text-center">
              <Text
                semibold
                className={`text-white  text-[18px] md:text-[28px] `}
              >
                เข้าสู่ระบบ
              </Text>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSignup)}
                className="space-y-10 "
              >
                <Flex
                  direction="column"
                  justifyContent="between"
                  className="gap-6 lg:gap-12 mt-4"
                >
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="ชื่อผู้ใช้"
                            className="rounded-[36px] "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="รหัสผ่าน"
                            className="rounded-[36px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <Flex justifyContent="center">
                    <Button
                      variant="default"
                      size="lg"
                      type="submit"
                      className="bg-[#4B006E] hover:bg-[#4B006E]/70"
                    >
                      <Text className="text-white text-[16px] lg:text-[20px]">
                        ลงชื่อเข้าใช้
                      </Text>
                    </Button>
                  </Flex>
                </Flex>
              </form>
            </Form>
          </CardContent>
        </Card>
      </LogoBackground>

      {loading && <Loading isOpen message="กำลังลงชื่อเข้าใช้" />}

      {modalOn && isLoginSuccess && (
        <SuccessModal message="เข้าสู่ระบบสำเร็จ" isVisible={modalOn} />
      )}
      {modalOn && !isLoginSuccess && error && (
        <ErrorModal message={error} isVisible={modalOn} />
      )}
    </>
  );
}

export default LoginCard;

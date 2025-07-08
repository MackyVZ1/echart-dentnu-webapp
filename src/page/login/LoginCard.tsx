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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function LoginCard() {
  const nav = useNavigate();
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSignup = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        users: values.username,
        passw: values.password,
      });

      console.log(response?.data);

      if (response?.data) {
        const user = response?.data;
        const token = user.accessToken;

        sessionStorage.setItem("token", token);
        sessionStorage.setItem("users", user.users);
        sessionStorage.setItem("roleName", user.role);
        sessionStorage.setItem("roleId", user.roleID);

        setModalOn(true);

        setTimeout(() => {
          setModalOn(false);
          nav("/home");
        }, 1000);
      }
    } catch (e: any) {
      let errorMessage = e?.response?.data;
      // ที่console.error(errorMessage);
      if (errorMessage == "Username and password are required") {
        errorMessage = "กรุณากรอกชื่อผู้ใช้\nและรหัสผ่าน";
        setError(errorMessage);
      } else if (errorMessage == "Wrong password") {
        errorMessage = "รหัสผ่านผิด";
        setError(errorMessage);
      } else if (errorMessage == "Tbdentalrecorduser not found") {
        errorMessage = "ไม่พบผู้ใช้";
        setError(errorMessage);
      } else errorMessage = "เซิร์ฟเวอร์ขัดข้อง";
      setError(errorMessage);
      setModalOn(true);

      setTimeout(() => {
        setError("");
        setModalOn(false);
      }, 2000);
    }
  };

  return (
    <>
      <LogoBackground>
        <Card
          className={`w-[340px] p-[20px] rounded-4xl bg-[#A861D4]/60 gap-[20px] shadow-lg shadow-[#7C22B4] 
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
                      className="bg-[#9C53C9] hover:bg-[#9C53C9]/70"
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

        {/* </Flex> */}
      </LogoBackground>
      {modalOn && !error && (
        <SuccessModal message="เข้าสู่ระบบสำเร็จ" isVisible={modalOn} />
      )}
      {modalOn && !!error && <ErrorModal message={error} isVisible={modalOn} />}
    </>
  );
}

export default LoginCard;

/* eslint-disable react-hooks/exhaustive-deps */
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
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Datepicker } from "@/components/ui/datepicker";
import { type UseFormReturn } from "react-hook-form";
import { useEffect } from "react";
import dayjs from "dayjs";
import type { PatientFormData } from "./Patientform";

interface Props {
  form: UseFormReturn<PatientFormData>;
}

function Personalform({ form }: Props) {
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

  const watchedBirthdate = form.watch("birthdate");
  const watchedPriv = form.watch("priv");

  useEffect(() => {
    if (watchedBirthdate) {
      const calculatedAge = dayjs().diff(dayjs(watchedBirthdate), "year");
      form.setValue("age", calculatedAge);
    }
  }, [watchedBirthdate, watchedPriv]);

  return (
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
                  placeholder="68xxxx / EXxxxx"
                  className="w-full flex-1"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Flex>
      <Flex
        justifyContent="start"
        alignItems="center"
        className="gap-[12px] md:justify-end"
      >
        <Text className="lg:text-[22px]">ชื่อเล่น</Text>
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="กรอกชื่อเล่น"
                  className="w-full flex-1"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Flex>
      <Flex
        direction="column"
        justifyContent="start"
        className="gap-[12px] md:flex-row md:justify-end md:items-center"
      >
        <Text className="lg:text-[22px] ">
          เลขประจำตัวประชาชน/ Passport No.
        </Text>
        <FormField
          control={form.control}
          name="idNo"
          render={({ field }) => (
            <FormItem className="w-full flex-1">
              <FormControl>
                <Input
                  {...field}
                  placeholder="กรอกเลขบัตรประจำตัวประชาชน"
                  className="w-full flex-1"
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
          <Text className="lg:text-[22px] ">คำนำหน้า</Text>
          <FormField
            control={form.control}
            name="thPrefix"
            render={({ field }) => (
              <FormItem className="w-full flex-1">
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full flex-1">
                      <SelectValue placeholder="เลือกคำนำหน้า" />
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
              <FormItem className="w-full flex-1">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="กรอกชื่อจริง"
                    className="w-full flex-1"
                  />
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
              <FormItem className="w-full flex-1">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="กรอกนามสกุล"
                    className="w-full flex-1"
                  />
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
              <FormItem className="w-full flex-1">
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full flex-1">
                      <SelectValue placeholder="Select EN Title" />
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
              <FormItem className="w-full flex-1">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Type Name"
                    className="w-full flex-1"
                  />
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
              <FormItem className="w-full flex-1">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Type Surname"
                    className="w-full flex-1"
                  />
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
          <Text className="lg:text-[22px]">เพศกำเนิด</Text>
          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem className="w-full flex-1">
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full flex-1">
                      <SelectValue placeholder="เลือกเพศ" />
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
              <FormItem className="w-full flex-1">
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Flex>
        <Flex className="max-md:flex-col gap-[20px] md:gap-6">
          <Flex alignItems="center" className="gap-[12px]">
            <Text className="lg:text-[22px]">วันเกิด</Text>
            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem className="w-full flex-1">
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
        </Flex>
      </Flex>
      <Flex className="w-full gap-[20px] md:flex-row" direction="column">
        <Flex alignItems="center" className="gap-[12px]">
          <Text className="lg:text-[22px]">อายุ</Text>
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="99"
                    className="max-xl:w-[45px] w-[50px]"
                    disabled
                  />
                </FormControl>
              </FormItem>
            )}
          ></FormField>

          <Text className="lg:text-[22px]">ปี</Text>
        </Flex>
        <Flex alignItems="center" className="gap-[12px]">
          <Text className="lg:text-[22px]">อาชีพ</Text>
          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
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
        <Flex className="w-full gap-[12px]" alignItems="center">
          <Text className="lg:text-[22px] ">ที่อยู่ติดต่อ</Text>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full flex-1">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="กรอกที่อยู่"
                    className="w-full flex-1"
                  />
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
          <Text className="lg:text-[22px] ">เบอร์ติดต่อ</Text>
          <FormField
            control={form.control}
            name="phoneNum"
            render={({ field }) => (
              <FormItem className="w-full flex-1">
                <FormControl>
                  <Input {...field} placeholder="08x-xxxxxxx" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Flex>
        <Flex alignItems="center" className="gap-[12px]">
          <Text className="lg:text-[22px] ">เบอร์ที่ทำงาน</Text>
          <FormField
            control={form.control}
            name="officeNum"
            render={({ field }) => (
              <FormItem className="w-full flex-1">
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
          <Text className="lg:text-[22px]">กรณีฉุกเฉินติดต่อ</Text>
          <FormField
            control={form.control}
            name="emergencyContact"
            render={({ field }) => (
              <FormItem className="w-full flex-1">
                <FormControl>
                  <Input {...field} placeholder="กรอกผู้ติดต่อกรณีฉุกเฉิน" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Flex>
        <Flex alignItems="center" className="gap-[12px]">
          <Text className="lg:text-[22px] ">เกี่ยวข้องเป็น</Text>
          <FormField
            control={form.control}
            name="parent"
            render={({ field }) => (
              <FormItem className="w-full flex-1">
                <FormControl>
                  <Input {...field} placeholder="กรอกความเกี่ยวข้อง" />
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
        <Text className="lg:text-[22px]">ที่อยู่ติดต่อฉุกเฉิน</Text>
        <FormField
          control={form.control}
          name="emergencyAddress"
          render={({ field }) => (
            <FormItem className="w-full flex-1">
              <FormControl>
                <Input {...field} placeholder="กรอกที่อยู่ติดต่อกรณีฉุกเฉิน" />
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
        <Flex alignItems="center" className="gap-[12px]">
          <Text className="lg:text-[22px]">เบอร์ติดต่อฉุกเฉิน</Text>
          <FormField
            control={form.control}
            name="emergencyPhone"
            render={({ field }) => (
              <FormItem className="w-full flex-1">
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
        alignItems="start"
        className="gap-[12px] h-full w-full xl:items-center"
      >
        <Text className="lg:text-[22px] max-lg:mt-3">สิทธิการรักษา</Text>
        <Flex direction="column" className="gap-[12px] md:flex-row">
          <FormField
            control={form.control}
            name="priv"
            render={({ field }) => (
              <FormItem className="w-full flex-1">
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="">
                      <SelectValue placeholder="เลือกสิทธิการรักษา" />
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
                <FormItem className="w-full flex-1">
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="max-sm:w-50">
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Personalform;

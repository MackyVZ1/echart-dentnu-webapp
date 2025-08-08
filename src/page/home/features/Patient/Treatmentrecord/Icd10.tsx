/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { treatmentRecordFormData } from "./Treatmentrecordform";
import { FormField, FormItem } from "@/components/ui/form";
import Flex from "@/components/Flex";
import Text from "@/components/Text";
import type { Clinic } from "../../StaffManagement/Addstaffform";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Icd10 = {
  id: number;
  code: string;
  codeSet: string;
  descp: string;
};

type Icd10Response = {
  data: Icd10[];
  total: number;
  pageCount: number;
};

interface Props {
  form: UseFormReturn<treatmentRecordFormData>;
}

function Icd10({ form }: Props) {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [selectedClinic, setSelectedClinic] = useState<string>("");
  const [icd, setIcd] = useState<Icd10[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(100);
  // const [total, setTotal] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>("");

  const [open, setOpen] = useState<boolean>(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const icdList = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get<Icd10Response>(
        `${API_BASE_URL}/api/tbicd10tm?page=${page}&limit=${limit}&keyword=${keyword}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data) {
        // console.log("API Response Data:", response.data.data);
        setIcd(response.data.data);
        // setTotal(response.data.total);
        // แก้ไข: ใช้ pageCount ที่ส่งมาจาก API โดยตรง
        setPageCount(response.data.pageCount);
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  const clinicFetch = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.get(`${API_BASE_URL}/api/tbclinic`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(response?.data);
      if (response?.data) {
        setClinics(response?.data);
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      icdList();
    }, 500); // Debounce เพื่อลดการยิง API ขณะพิมพ์
    clinicFetch();

    return () => clearTimeout(debounceTimer);
  }, [page, keyword]);

  // console.log("Current ICD state for rendering:", icd);
  return (
    <Flex direction="column" className=" gap-4">
      <Flex alignItems="center" className="gap-[8px]">
        <Text bold className="lg:text-[20px]">
          ICD10 for
        </Text>
        <Select value={selectedClinic} onValueChange={setSelectedClinic}>
          <SelectTrigger className="w-full flex-1">
            <SelectValue placeholder="เลือกคลินิก" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Clinic</SelectLabel>
              {clinics.map((clinic) => (
                <SelectItem
                  key={clinic.clinicid}
                  value={clinic.clinicid.toString()}
                >
                  {clinic.clinicName}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Flex>
      <Flex alignItems="center" className="w-full gap-[8px]">
        <Text bold className="lg:text-[20px]">
          Often
        </Text>
        <FormField
          control={form.control}
          name="icd10"
          render={({ field }) => (
            <FormItem className="w-full flex-1">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between text-[16px] lg:text-[20px]"
                  >
                    {field.value
                      ? icd.find((item) => item.code === field.value)?.descp
                        ? `${field.value} - ${
                            icd.find((item) => item.code === field.value)?.descp
                          }`
                        : "กำลังโหลด..."
                      : "เลือก ICD-10"}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="max-md:w-[300px] md:w-[600px] lg:w-[780px] w-[--radix-popover-trigger-width] p-0 flex-1">
                  <Command>
                    <CommandInput
                      placeholder="ค้นหา Code หรือ Description..."
                      value={keyword}
                      onValueChange={(search) => {
                        setKeyword(search);
                        setPage(1);
                      }}
                    />
                    <CommandList>
                      <CommandEmpty>ไม่พบ ICD-10</CommandEmpty>
                      <CommandGroup>
                        {icd.map((item) => (
                          <CommandItem
                            key={item.id}
                            value={`${item.code} ${item.descp}`}
                            onSelect={(currentValue) => {
                              const selectedIcd = icd.find(
                                (i) =>
                                  `${i.code} ${i.descp}`.toLowerCase() ===
                                  currentValue.toLowerCase()
                              );

                              if (selectedIcd) {
                                form.setValue("icd10", selectedIcd.code, {
                                  // เก็บค่า code ลงใน form.icd10
                                  shouldValidate: true,
                                });
                                setOpen(false);
                              }
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                // 4. เช็คค่าที่ถูกเลือกจาก field.value
                                field.value === item.code
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {`${item.code} - ${item.descp}`}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                    <Flex
                      alignItems="center"
                      justifyContent="center"
                      className="p-2 gap-6"
                    >
                      <Button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className="w-[70px] xl:w-[100px]"
                      >
                        ก่อนหน้า
                      </Button>
                      <Text className="max-xl:text-[14px]">{`หน้า ${page} / ${pageCount}`}</Text>
                      <Button
                        onClick={() => setPage((prev) => prev + 1)}
                        disabled={page === pageCount}
                        className="w-[70px] xl:w-[100px]"
                      >
                        ถัดไป
                      </Button>
                    </Flex>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        ></FormField>
      </Flex>
    </Flex>
  );
}

export default Icd10;

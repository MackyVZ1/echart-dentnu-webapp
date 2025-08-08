import type { UseFormReturn } from "react-hook-form";
import type { treatmentRecordFormData } from "./Treatmentrecordform";
import Flex from "@/components/Flex";
import Text from "@/components/Text";
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

interface Props {
  form: UseFormReturn<treatmentRecordFormData>;
}

function Payment({ form }: Props) {
  const categoryOptions = [
    { value: "1", label: "ยา" },
    { value: "Orthodontic", label: "ทันตกรรมจัดฟัน" },
    { value: "Occlusion", label: "ทันตกรรมบดเคี้ยว" },
    { value: "Pedodontic", label: "ทันตกรรมสำหรับเด็ก" },
    { value: "Prosthodontic", label: "ทันตกรรมประดิษฐ์" },
    { value: "Oral Health Promotion", label: "ทันตกรรมป้องกัน" },
    { value: "2", label: "ทันตกรรมรากเทียม" },
    { value: "Operative", label: "ทันตกรรมหัตถการ" },
    { value: "Oral Radiology", label: "ทันตรังสีวิทยา" },
    { value: "3", label: "บริการเฉพาะกลุ่มเฉพาะ/พิเศษ" },
    { value: "Periodontic", label: "ปริทันตวิทยา" },
    { value: "Oral Surgery", label: "ศัลยศาสตร์ช่องปาก" },
    { value: "Oral Surgery 2", label: "ศัลยศาสตร์ช่องปาก 2" },
    { value: "4", label: "เวชศาสตร์ช่องปาก" },
    { value: "Endodontic", label: "เอ็นโดดอนติกส์" },
    { value: "5", label: "วัสดุสำหรับทำชิ้นงานทางทันตกรรม" },
    { value: "6", label: "เวชภัณฑ์ที่มิใช่ยา" },
    { value: "7", label: "อวัยวะเทียมและอุปกรณ์ในการบำบัดโรค" },
    { value: "8", label: "ประกันสังคม" },
    { value: "9", label: "บัตรทองซับซ้อน" },
  ];
  const listOptions = [{ value: "1", label: "Color modifier" }];
  return (
    <Flex direction="column" className="gap-[16px]">
      <Text bold className="lg:text-[20px]">
        ค่าบริการการรักษา
      </Text>
      <Flex alignItems="center" className="gap-2">
        <Text bold className="lg:text-[20px]">
          หมวด :
        </Text>
        <Select>
          <SelectTrigger className="w-full flex-1">
            <SelectValue placeholder="ระบุหมวด" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>หมวด</SelectLabel>
              {categoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Flex>
      <Flex alignItems="center" className="gap-2">
        <Text bold className="lg:text-[20px]">
          รายการ :
        </Text>
        <Select>
          <SelectTrigger className="w-full flex-1">
            <SelectValue placeholder="ระบุรายการ" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              {listOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Flex>
      <Flex className="md:grid md:grid-cols-3 gap-[16px]">
        <Flex
          direction="column"
          alignItems="center"
          className="md:flex-row gap-2"
        >
          <Text bold className="lg:text-[20px] ">
            {"ราคา (บาท) :"}
          </Text>
          <Input
            type="text"
            value={form.watch("price")}
            onChange={(e) => form.setValue("price", e.target.value)}
            placeholder="กรอกราคา"
            className="w-full flex-1"
          />
        </Flex>
        <Flex
          direction="column"
          alignItems="center"
          className="md:flex-row gap-2"
        >
          <Text bold className="lg:text-[20px] ">
            {"ลด (%) :"}
          </Text>
          <Input
            type="text"
            value={form.watch("sale")}
            onChange={(e) => form.setValue("sale", e.target.value)}
            placeholder="กรอกเปอร์เซนต์"
            className="w-full flex-1"
          />
        </Flex>
        <Flex
          direction="column"
          alignItems="center"
          className="md:flex-row gap-2"
        >
          <Text bold className="lg:text-[20px]">
            {"รวมค่าบริการ :"}
          </Text>
          <Input
            type="text"
            value={form.watch("totalPrice")}
            onChange={(e) => form.setValue("totalPrice", e.target.value)}
            placeholder="กรอกค่าบริการ"
            className="w-full flex-1"
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Payment;

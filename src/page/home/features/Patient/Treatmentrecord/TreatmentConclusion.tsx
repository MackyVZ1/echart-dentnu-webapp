import type { UseFormReturn } from "react-hook-form";
import type { treatmentRecordFormData } from "./Treatmentrecordform";
import Flex from "@/components/Flex";
import { Button } from "@/components/ui/button";
import Text from "@/components/Text";
import { Input } from "@/components/ui/input";
import { DentalChatIcon } from "@/assets/svg";
import { ArrowBigLeft, Banknote } from "lucide-react";

interface Props {
  form: UseFormReturn<treatmentRecordFormData>;
}

const handleDentalChart = () => {};
const handleReferDental = () => {};
const handleReferFinance = () => {};

function TreatmentConclusion({ form }: Props) {
  return (
    <Flex direction="column">
      <Flex justifyContent="between">
        <Flex
          alignItems="center"
          direction="column"
          className="bg-[#4B006E] rounded-[10px] px-[18px] py-[32px] max-w-[208px] max-h-[180] w-full h-full"
          onClick={handleDentalChart}
        >
          <DentalChatIcon />
          <Text bold className="text-white lg:text-[24px]">
            Dental Chart
          </Text>
        </Flex>
        <Flex
          alignItems="end"
          direction="column"
          justifyContent="between"
          className="gap-[20px]"
        >
          <Flex direction="row" alignItems="center" className="gap-[8px]">
            <Text bold className="lg:text-[18px]">
              {"ค่าบริการวันนี้ (บาท) : "}
            </Text>
            <Input
              type="text"
              value={form.watch("totalPrice")}
              onChange={(e) => form.setValue("totalPrice", e.target.value)}
              placeholder="กรอกราคา"
              className="flex-1 w-full"
            />
          </Flex>
          <Flex direction="row" alignItems="center" className="gap-[8px]">
            <Text bold className="lg:text-[18px]">
              {"DF Value : "}
            </Text>
            <Input
              value={form.watch("dfValue")}
              onChange={(e) => form.setValue("dfValue", e.target.value)}
              placeholder="กรอกราคา"
              className="flex-1 w-full"
            />
          </Flex>
          <Flex direction="row" className="gap-[26px]">
            <Button
              variant={"ghost"}
              className="border-2 border-[#4B006E]"
              onClick={handleReferDental}
            >
              <ArrowBigLeft className="text-[#4B006E]" />
              <Text bold className="text-[#4B006E] lg:text-[18px]">
                ส่งห้องทันตกกรม
              </Text>
            </Button>
            <Button
              variant={"ghost"}
              className="border-2 border-[#4B006E]"
              onClick={handleReferFinance}
            >
              <Banknote className="text-[#4B006E]" />
              <Text bold className="text-[#4B006E] lg:text-[18px]">
                ส่งการเงิน
              </Text>
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default TreatmentConclusion;

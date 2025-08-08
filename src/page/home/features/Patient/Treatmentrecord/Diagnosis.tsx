import Flex from "@/components/Flex";
import Text from "@/components/Text";
import type { UseFormReturn } from "react-hook-form";
import type { treatmentRecordFormData } from "./Treatmentrecordform";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  form: UseFormReturn<treatmentRecordFormData>;
}

function Diagnosis({ form }: Props) {
  return (
    <Flex direction="column" className="gap-[16px]">
      <Text bold className="lg:text-[18px]">
        Treatment Record / Diagnosis
      </Text>
      <Textarea
        name="diagnosis"
        value={form.watch("diagnosis")}
        onChange={(e) => form.setValue("diagnosis", e.target.value)}
        placeholder="พิมพ์ที่นี่"
        className="text-[16px] lg:text-[18px] border-3 border-[#4B006E]"
      />
    </Flex>
  );
}

export default Diagnosis;

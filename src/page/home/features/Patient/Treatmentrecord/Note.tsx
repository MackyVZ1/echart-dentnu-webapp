import Flex from "@/components/Flex";
import type { treatmentRecordFormData } from "./Treatmentrecordform";
import Text from "@/components/Text";
import { Textarea } from "@/components/ui/textarea";
import type { UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<treatmentRecordFormData>;
}

function Note({ form }: Props) {
  return (
    <Flex direction="column" className="gap-[16px]">
      <Text bold className="lg:text-[20px]">
        Note
      </Text>
      <Textarea
        name="note"
        value={form.watch("note")}
        onChange={(e) => form.setValue("note", e.target.value)}
        placeholder="พิมพ์ที่นี่"
        className="lg:text-[20px] border-3 border-[#4B006E]"
      />
    </Flex>
  );
}

export default Note;

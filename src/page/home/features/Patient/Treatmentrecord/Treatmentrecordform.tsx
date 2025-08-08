import Flex from "@/components/Flex";
import Text from "@/components/Text";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Icd10 from "./Icd10";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import Teethselect from "./Teethselect";
import Diagnosis from "./Diagnosis";
// import Teethimginput from "./Teethimginput";
import Payment from "./Payment";
import { Separator } from "@/components/ui/separator";
import Note from "./Note";
import TreatmentConclusion from "./TreatmentConclusion";

const treatmentRecordSchema = z.object({
  icd10: z.string().min(1, "กรุณาเลือก ICD-10"),
  teeth: z.string(),
  teethSide: z.string(),
  diagnosis: z.string(),
  category: z.string(),
  list: z.string(),
  price: z.string(),
  sale: z.string(),
  treatmentPrice: z.string(),
  note: z.string(),
  totalPrice: z.string(),
  dfValue: z.string(),
  dentalTeeth: z.string(),
});

export type treatmentRecordFormData = z.infer<typeof treatmentRecordSchema>;

function Treatmentrecordform() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const form = useForm<treatmentRecordFormData>({
    resolver: zodResolver(treatmentRecordSchema),
    defaultValues: {
      icd10: "",
      teeth: "",
      teethSide: "",
      diagnosis: "",
      category: "",
      list: "",
      price: "",
      sale: "",
      treatmentPrice: "",
      note: "",
      totalPrice: "",
      dfValue: "",
    },
  });

  return (
    <Flex
      direction="column"
      justifyContent="between"
      className={`shadow-lg border border-black/5 rounded-[16px] p-4 transform transition-all duration-200`}
    >
      <Flex alignItems="center" justifyContent="between">
        <Text bold className="lg:text-[20px]">
          Treatment Record
        </Text>
        <ChevronDown
          width={36}
          height={36}
          color="#4B006E"
          className={`transition-all transform cursor-pointer ${
            collapsed ? "rotate-180" : ""
          }`}
          onClick={handleCollapsed}
        />
      </Flex>

      {collapsed && (
        <Form {...form}>
          <form>
            <Flex direction="column" className="w-full gap-[16px] pt-[16px]">
              <Teethselect form={form} />
              <Diagnosis form={form} />
              <Icd10 form={form} />
              {/* <Teethimginput form={form} /> */}
              <Separator className="my-6 border-2 border-[#4B006E]" />
              <Payment form={form} />
              <Note form={form} />
              <TreatmentConclusion form={form} />
            </Flex>
          </form>
        </Form>
      )}
    </Flex>
  );
}

export default Treatmentrecordform;

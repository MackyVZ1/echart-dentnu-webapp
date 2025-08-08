import Flex from "@/components/Flex";
import Text from "@/components/Text";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { type UseFormReturn } from "react-hook-form";
import type { PatientFormData } from "./Patientform";

interface Props {
  form: UseFormReturn<PatientFormData>;
}

function Deceaseissuesform({ form }: Props) {
  return (
    <Flex
      className="w-full h-full border border-[#848484] rounded-[16px] p-6  lg:py-[15px] lg:px-[30px]  gap-[32px] "
      direction="column"
    >
      <Text className="lg:text-[22px]" bold>
        ภาวะสุขภาพทางระบบ
      </Text>
      <Flex
        direction="column"
        className="gap-[32px] md:gap-[20px] md:grid md:grid-cols-4"
      >
        <Flex alignItems="center" className="gap-[6px]">
          <Checkbox
            checked={form.watch("healthConditions.highBP")}
            onCheckedChange={(val) =>
              form.setValue("healthConditions.highBP", !!val)
            }
          />
          <Text className="lg:text-[18px]">ความดันโลหิตสูง</Text>
        </Flex>
        <Flex alignItems="center" className="gap-[6px]">
          <Checkbox
            checked={form.watch("healthConditions.diabetes")}
            onCheckedChange={(val) =>
              form.setValue("healthConditions.diabetes", !!val)
            }
          />
          <Text className="lg:text-[18px]">เบาหวาน</Text>
        </Flex>
        <Flex alignItems="center" className="gap-[6px]">
          <Checkbox
            checked={form.watch("healthConditions.heart")}
            onCheckedChange={(val) =>
              form.setValue("healthConditions.heart", !!val)
            }
          />
          <Text className="lg:text-[18px]">โรคหัวใจ</Text>
        </Flex>
        <Flex alignItems="center" className="gap-[6px]">
          <Checkbox
            checked={form.watch("healthConditions.thyroid")}
            onCheckedChange={(val) =>
              form.setValue("healthConditions.thyroid", !!val)
            }
          />
          <Text className="lg:text-[18px]">โรคไทรอยด์</Text>
        </Flex>
      </Flex>
      <Flex direction="column" className="gap-[32px] md:gap-[20px] md:flex-row">
        <Flex alignItems="center" className="gap-[6px]">
          <Checkbox
            checked={form.watch("healthConditions.stroke")}
            onCheckedChange={(val) =>
              form.setValue("healthConditions.stroke", !!val)
            }
          />
          <Text className="lg:text-[18px]">
            {"มีประวัติเป็นโรคหลอดเลือดสมอง (stroke) หรือเคยมีอาการ"}
          </Text>
        </Flex>
        <Flex alignItems="center" className="gap-[6px]">
          <Checkbox
            checked={form.watch("healthConditions.immuno")}
            onCheckedChange={(val) =>
              form.setValue("healthConditions.immuno", !!val)
            }
          />
          <Text className="lg:text-[18px]">ภาวะภูมิคุ้มกันบกพร่อง</Text>
        </Flex>
      </Flex>
      <Flex direction="column" className="gap-[32px] md:gap-[20px] md:flex-row">
        <Flex alignItems="center" className="gap-[6px]">
          <Checkbox
            checked={form.watch("healthConditions.pregnant")}
            onCheckedChange={(val) =>
              form.setValue("healthConditions.pregnant", !!val)
            }
          />
          <Text className="lg:text-[18px] lg:min-w-[80px]">ตั้งครรภ์ </Text>
          {form.getValues("healthConditions.pregnant") == true && (
            <>
              <Input
                name="pregnantWeek"
                value={form.watch("healthConditions.pregnantWeeks")}
                onChange={(e) =>
                  form.setValue(
                    "healthConditions.pregnantWeeks",
                    e.target.value
                  )
                }
              />
              <Text className="lg:text-[18px] ">สัปดาห์</Text>
            </>
          )}
        </Flex>
      </Flex>
      <Flex direction="column" className="gap-[32px] md:gap-[20px] md:flex-row">
        <Flex alignItems="center" className="gap-[6px]">
          <Checkbox
            checked={form.watch("healthConditions.drug")}
            onCheckedChange={(val) =>
              form.setValue("healthConditions.drug", !!val)
            }
          />
          <Text className="lg:text-[18px]">{"แพ้ยา"}</Text>
        </Flex>
        {form.getValues("healthConditions.drug") == true && (
          <Flex alignItems="center" className="gap-[6px]">
            <Input
              name="drugName"
              value={form.watch("healthConditions.drugName")}
              onChange={(e) =>
                form.setValue("healthConditions.drugName", e.target.value)
              }
            />
            <Text className="lg:text-[18px] lg:min-w-[80px]">อาการแพ้</Text>
            <Input
              name="drugDesc"
              value={form.watch("healthConditions.drugDesc")}
              onChange={(e) =>
                form.setValue("healthConditions.drugDesc", e.target.value)
              }
            />
          </Flex>
        )}
      </Flex>
      <Flex alignItems="center" className="gap-[6px]">
        <Checkbox
          checked={form.watch("healthConditions.otherChecked")}
          onCheckedChange={(val) =>
            form.setValue("healthConditions.otherChecked", !!val)
          }
        />
        <Text className="lg:text-[18px] lg:min-w-[50px]"> อื่น ๆ</Text>
        {form.getValues("healthConditions.otherChecked") == true && (
          <Input
            name="other"
            value={form.watch("healthConditions.other")}
            onChange={(e) =>
              form.setValue("healthConditions.other", e.target.value)
            }
          />
        )}
      </Flex>
    </Flex>
  );
}

export default Deceaseissuesform;

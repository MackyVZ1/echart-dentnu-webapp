/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Flex from "@/components/Flex";
import Text from "@/components/Text";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormField } from "@/components/ui/form";
import { type UseFormReturn } from "react-hook-form";
import type { PatientFormData } from "./Patientform";

interface Props {
  form: UseFormReturn<PatientFormData>;
}

function Infectedform({ form }: Props) {
  const [dropletChecks, setDropletChecks] = useState<boolean[]>(
    Array(6).fill(false)
  );
  const [airborneChecks, setAirborneChecks] = useState<boolean[]>(
    Array(8).fill(false)
  );
  const [contactChecks, setContactChecks] = useState<boolean[]>(
    Array(6).fill(false)
  );

  const [checklistSummary, setChecklistSummary] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  useEffect(() => {
    const dropletCount = dropletChecks.filter(Boolean).length;
    const airborneCount = airborneChecks.filter(Boolean).length;
    const contactCount = contactChecks.filter(Boolean).length;

    const meetsCriteria =
      dropletCount >= 2 || airborneCount >= 1 || contactCount >= 2;

    if (meetsCriteria) {
      form.setValue("patientType", "Aware"); // เฝ้าระวัง
    } else {
      form.setValue("patientType", "Normal"); // ไม่เข้าเกณฑ์
    }

    // อัปเดตติ๊ก checkbox "เข้าเกณฑ์อย่างน้อย X ข้อ"
    setChecklistSummary([
      dropletCount >= 2,
      airborneCount >= 1,
      contactCount >= 2,
    ]);
  }, [dropletChecks, airborneChecks, contactChecks]);

  return (
    <Flex
      className="w-full h-full border border-[#848484] rounded-[16px] p-6  lg:py-[15px] lg:px-[30px]  gap-[32px] "
      direction="column"
    >
      <Text className="lg:text-[22px]" bold>
        เกณฑ์การแพร่กระจายเชื้อ
      </Text>
      <Flex direction="column" className="gap-[30px] md:grid md:grid-cols-3">
        <Flex direction="column" className="gap-[20px] md:text-center">
          <Text className="lg:text-[18px] xl:text-[20px]" bold>
            การแพร่กระจายเชื้อผ่านละอองฝอย
          </Text>
          <Flex direction="column" className="gap-[10px]">
            <Flex alignItems="center" className="gap-[6px]">
              <Checkbox
                checked={dropletChecks[0]}
                onCheckedChange={(value) => {
                  const updated = [...dropletChecks];
                  updated[0] = !!value;
                  setDropletChecks(updated);
                }}
              />
              <Text className="lg:text-[18px]">
                {"1. มีไข้ (อุณหภูมิ > 37.5 °C"}
              </Text>
            </Flex>
            <Flex alignItems="center" className="gap-[6px]">
              <Checkbox
                checked={dropletChecks[1]}
                onCheckedChange={(value) => {
                  const updated = [...dropletChecks];
                  updated[1] = !!value;
                  setDropletChecks(updated);
                }}
              />
              <Text className="lg:text-[18px]">{"2. ไอ จาม น้ำมูก"}</Text>
            </Flex>
            <Flex alignItems="center" className="gap-[6px]">
              <Checkbox
                checked={dropletChecks[2]}
                onCheckedChange={(value) => {
                  const updated = [...dropletChecks];
                  updated[2] = !!value;
                  setDropletChecks(updated);
                }}
              />
              <Text className="lg:text-[18px]">{"3. มีเสมหะ เจ็บคอ"}</Text>
            </Flex>
            <Flex alignItems="center" className="gap-[6px]">
              <Checkbox
                checked={dropletChecks[3]}
                onCheckedChange={(value) => {
                  const updated = [...dropletChecks];
                  updated[3] = !!value;
                  setDropletChecks(updated);
                }}
              />
              <Text className="lg:text-[18px]">{"4. ปวดศีรษะ"}</Text>
            </Flex>
            <Flex alignItems="center" className="gap-[6px]">
              <Checkbox
                checked={dropletChecks[4]}
                onCheckedChange={(value) => {
                  const updated = [...dropletChecks];
                  updated[4] = !!value;
                  setDropletChecks(updated);
                }}
              />
              <Text className="lg:text-[18px]">{"5. อ่อนเพลีย"}</Text>
            </Flex>
            <Flex alignItems="center" className="gap-[6px]">
              <Checkbox
                checked={dropletChecks[5]}
                onCheckedChange={(value) => {
                  const updated = [...dropletChecks];
                  updated[5] = !!value;
                  setDropletChecks(updated);
                }}
              />
              <Text className="lg:text-[18px]">{"6. ปวดกล้ามเนื้อ"}</Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex direction="column" className="gap-[20px] md:text-center">
          <Text className="lg:text-[18px] xl:text-[20px]" bold>
            การแพร่เชื้อทางอากาศ
          </Text>
          <Flex direction="column" className="gap-[10px]">
            <Flex alignItems="center" className="gap-[6px]">
              <Checkbox
                checked={airborneChecks[0]}
                onCheckedChange={(value) => {
                  const updated = [...airborneChecks];
                  updated[0] = !!value;
                  setAirborneChecks(updated);
                }}
              />
              <Text className="lg:text-[18px]">
                {"1. ไอเรื้อรัง เกิน 2 สัปดาห์"}
              </Text>
            </Flex>
            <Flex alignItems="center" className="gap-[6px]">
              <Checkbox
                checked={airborneChecks[1]}
                onCheckedChange={(value) => {
                  const updated = [...airborneChecks];
                  updated[1] = !!value;
                  setAirborneChecks(updated);
                }}
              />
              <Text className="lg:text-[18px]">{"2. ไอมีเลือดปน"}</Text>
            </Flex>
            <Flex alignItems="center" className="gap-[6px]">
              <Checkbox
                checked={airborneChecks[2]}
                onCheckedChange={(value) => {
                  const updated = [...airborneChecks];
                  updated[2] = !!value;
                  setAirborneChecks(updated);
                }}
              />
              <Text className="lg:text-[18px]">
                {"3. น้ำหนักลด 3-5 กก./เดือน โดยไม่ทราบสาเหตุ"}
              </Text>
            </Flex>
            <Flex alignItems="center" className="gap-[6px]">
              <Checkbox
                checked={airborneChecks[3]}
                onCheckedChange={(value) => {
                  const updated = [...airborneChecks];
                  updated[3] = !!value;
                  setAirborneChecks(updated);
                }}
              />
              <Text className="lg:text-[18px]">
                {"4. มีไข้ตอนบ่าย เกิน 2 สัปดาห์"}
              </Text>
            </Flex>
            <Flex alignItems="center" className="gap-[6px]">
              <Checkbox
                checked={airborneChecks[4]}
                onCheckedChange={(value) => {
                  const updated = [...airborneChecks];
                  updated[4] = !!value;
                  setAirborneChecks(updated);
                }}
              />
              <Text className="lg:text-[18px]">
                {"5. มีเหงือออกกลางคืนใน 1 เดือน"}
              </Text>
            </Flex>
            <Flex alignItems="center" className="gap-[6px]">
              <Checkbox
                checked={airborneChecks[5]}
                onCheckedChange={(value) => {
                  const updated = [...airborneChecks];
                  updated[5] = !!value;
                  setAirborneChecks(updated);
                }}
              />
              <Text className="lg:text-[18px]">
                {"6. มีประวัติสัมผัสกีบผู้ป่วยวัณโรค"}
              </Text>
            </Flex>
            <Flex direction="column" className="gap-[6px]">
              <Flex alignItems="center" className="gap-[6px]">
                <Checkbox
                  checked={airborneChecks[6]}
                  onCheckedChange={(value) => {
                    const updated = [...airborneChecks];
                    updated[6] = !!value;
                    setAirborneChecks(updated);
                  }}
                />
                <Text className="lg:text-[18px]">{"7. กำลังรักษาวัณโรค"}</Text>
              </Flex>
              {airborneChecks[6] == true && (
                <Flex alignItems="center" className="gap-2">
                  <Text className="lg:text-[18px]">รักษามาแล้ว</Text>
                  <Input className="w-12" />
                  <Text className="lg:text-[18px]">เดือน</Text>
                </Flex>
              )}
            </Flex>
          </Flex>
          <Flex direction="column" className="gap-[10px]">
            <Text className="lg:text-[20px]" bold>
              ประวัติผู้ป่วยวัณโรค
            </Text>
            <Flex alignItems="center" className="gap-[6px]">
              <Checkbox
                checked={airborneChecks[7]}
                onCheckedChange={(value) => {
                  const updated = [...airborneChecks];
                  updated[7] = !!value;
                  setAirborneChecks(updated);
                }}
              />
              <Text className="lg:text-[18px]">
                มีใบรับรองแพทย์ระยะเวลาไม่เกิน 1 เดือนว่าไม่พบเชื้อแล้ว
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex direction="column" className="gap-[20px] md:text-center">
          <Text className="lg:text-[18px] xl:text-[20px]" bold>
            การแพร่เชื้อทางการสัมผัส
          </Text>
          <Flex direction="column" className="gap-[10px]">
            <Flex alignItems="center" className="gap-[6px]">
              <Checkbox
                checked={contactChecks[0]}
                onCheckedChange={(value) => {
                  const updated = [...contactChecks];
                  updated[0] = !!value;
                  setContactChecks(updated);
                }}
              />
              <Text className="lg:text-[18px]">
                {"1. มีตุ่มน้ำที่ริมฝีปาก"}
              </Text>
            </Flex>
            <Flex alignItems="center" className="gap-[6px]">
              <Checkbox
                checked={contactChecks[1]}
                onCheckedChange={(value) => {
                  const updated = [...contactChecks];
                  updated[1] = !!value;
                  setContactChecks(updated);
                }}
              />
              <Text className="lg:text-[18px]">
                {"2. มีแผลเจ็บ แสบ ร้อนที่ริมฝีปาก"}
              </Text>
            </Flex>
            <Flex alignItems="center" className="gap-[6px]">
              <Checkbox
                checked={contactChecks[2]}
                onCheckedChange={(value) => {
                  const updated = [...contactChecks];
                  updated[2] = !!value;
                  setContactChecks(updated);
                }}
              />
              <Text>{"3. มีตุ่มน้ำใสแนวยาวตามผิวหนังร่างกาย"}</Text>
            </Flex>
            <Flex alignItems="center" className="gap-[6px]">
              <Checkbox
                checked={contactChecks[3]}
                onCheckedChange={(value) => {
                  const updated = [...contactChecks];
                  updated[3] = !!value;
                  setContactChecks(updated);
                }}
              />
              <Text className="lg:text-[18px]">
                {"4. รู้สึกเจ็บแปลบบริเวณผิวหนัง"}
              </Text>
            </Flex>
            <Flex alignItems="center" className="gap-[6px]">
              <Checkbox
                checked={contactChecks[4]}
                onCheckedChange={(value) => {
                  const updated = [...contactChecks];
                  updated[4] = !!value;
                  setContactChecks(updated);
                }}
              />
              <Text className="lg:text-[18px]">
                {"5. รู้สึกคัน ปวดแสบ ปวดร้อนบริเวณผิวหนัง"}
              </Text>
            </Flex>
            <Flex alignItems="center" className="gap-[6px]">
              <Checkbox
                checked={contactChecks[5]}
                onCheckedChange={(value) => {
                  const updated = [...contactChecks];
                  updated[5] = !!value;
                  setContactChecks(updated);
                }}
              />
              <Text className="lg:text-[18px]">
                {"6. มีประวัติเคยเป็นเริมหรืองูสวัด"}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        direction="column"
        alignItems="start"
        className="gap-[6px] md:grid md:grid-cols-3 md:items-center"
      >
        <Flex alignItems="center" className="gap-[6px]">
          <Checkbox checked={checklistSummary[0]} disabled />
          <Text className="lg:text-[18px]">เข้าเกณฑ์อย่างน้อย 2 ข้อ</Text>
        </Flex>
        <Flex alignItems="center" className="gap-[6px]">
          <Checkbox checked={checklistSummary[1]} disabled />
          <Text className="lg:text-[18px]">เข้าเกณฑ์อย่างน้อย 1 ข้อ</Text>
        </Flex>
        <Flex alignItems="center" className="gap-[6px]">
          <Checkbox checked={checklistSummary[2]} disabled />
          <Text className="lg:text-[18px]">เข้าเกณฑ์อย่างน้อย 2 ข้อ</Text>
        </Flex>
      </Flex>
      <Flex direction="column" className="gap-[20px]">
        <Text className="lg:text-[22px]" bold>
          ประเภทผู้ป่วย
        </Text>
        <FormField
          control={form.control}
          name="patientType"
          render={({ field }) => (
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="md:flex md:flex-row"
            >
              <Flex alignItems="center" className="gap-[6px]">
                <RadioGroupItem value="Normal" />
                <Text className="lg:text-[18px]">
                  ผู้ป่วยไม่เข้าเกณฑ์การแพร่กระจายเชื่อ
                </Text>
              </Flex>
              <Flex alignItems="center" className="gap-[6px]">
                <RadioGroupItem value="Aware" />
                <Text className="lg:text-[18px] text-purple-700">
                  ผู้ป่วยเฝ้าระวังการแพร่กระจายเชื้อ
                </Text>
              </Flex>
            </RadioGroup>
          )}
        />
      </Flex>
    </Flex>
  );
}

export default Infectedform;

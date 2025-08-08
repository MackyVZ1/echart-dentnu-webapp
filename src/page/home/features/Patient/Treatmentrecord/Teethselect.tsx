import type { UseFormReturn } from "react-hook-form";
import type { treatmentRecordFormData } from "./Treatmentrecordform";
import Flex from "@/components/Flex";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FormField, FormItem } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import Text from "@/components/Text";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

interface Props {
  form: UseFormReturn<treatmentRecordFormData>;
}

function Teethselect({ form }: Props) {
  // State สำหรับ Popover และการค้นหาของซี่ฟัน
  const [openTeeth, setOpenTeeth] = useState<boolean>(false);
  const [keywordTeeth, setKeywordTeeth] = useState<string>("");

  // State สำหรับ Popover และการค้นหาของด้านฟัน
  const [openTeethSide, setOpenTeethSide] = useState<boolean>(false);
  const [keywordTeethSide, setKeywordTeethSide] = useState<string>("");

  const teethOptions = [
    { value: "11", label: "11" },
    { value: "12", label: "12" },
    { value: "13", label: "13" },
    { value: "14", label: "14" },
    { value: "15", label: "15" },
    { value: "16", label: "16" },
    { value: "17", label: "17" },
    { value: "18", label: "18" },
    { value: "21", label: "21" },
    { value: "22", label: "22" },
    { value: "23", label: "23" },
    { value: "24", label: "24" },
    { value: "25", label: "25" },
    { value: "26", label: "26" },
    { value: "27", label: "27" },
    { value: "28", label: "28" },
    { value: "31", label: "31" },
    { value: "32", label: "32" },
    { value: "33", label: "33" },
    { value: "34", label: "34" },
    { value: "35", label: "35" },
    { value: "36", label: "36" },
    { value: "37", label: "37" },
    { value: "38", label: "38" },
    { value: "41", label: "41" },
    { value: "42", label: "42" },
    { value: "43", label: "43" },
    { value: "44", label: "44" },
    { value: "45", label: "45" },
    { value: "46", label: "46" },
    { value: "47", label: "47" },
    { value: "48", label: "48" },
  ];

  const teethSideOptions = [
    { value: "M", label: "M" }, // Mesial
    { value: "D", label: "D" }, // Distal
    { value: "O", label: "O" }, // Occlusal
    { value: "B", label: "B" }, // Buccal (สำหรับฟันกราม)
    { value: "L", label: "L" }, // Labial (สำหรับฟันหน้า)
    { value: "Li", label: "Li" }, // Lingual
    { value: "P", label: "P" }, // Palatal (สำหรับฟันบน)
  ];

  // ฟังก์ชันกรองข้อมูลสำหรับ Command
  const filteredTeethOptions = teethOptions.filter((teeth) =>
    teeth.label.toLowerCase().includes(keywordTeeth.toLowerCase())
  );

  const filteredTeethSideOptions = teethSideOptions.filter((side) =>
    side.label.toLowerCase().includes(keywordTeethSide.toLowerCase())
  );

  return (
    <Flex direction="column" className="md:grid md:grid-cols-2 gap-4">
      <Flex alignItems="center" className="gap-[8px]">
        <Text bold className=" lg:text-[20px]">
          ซี่ฟัน
        </Text>
        <FormField
          control={form.control}
          name="teeth" // ชื่อ field ใน form data สำหรับซี่ฟัน
          render={({ field }) => (
            <FormItem className="w-full flex-1">
              <Popover open={openTeeth} onOpenChange={setOpenTeeth}>
                <PopoverTrigger asChild>
                  <Button
                    role="combobox"
                    aria-expanded={openTeeth}
                    className="w-full justify-between text-[16px] lg:text-[18px]"
                  >
                    {field.value
                      ? teethOptions.find(
                          (teeth) => teeth.value === field.value
                        )?.label
                      : "ระบุซี่ฟัน"}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                  <Command>
                    <CommandInput
                      placeholder="ค้นหาซี่ฟัน..."
                      value={keywordTeeth}
                      onValueChange={setKeywordTeeth}
                    />
                    <CommandList>
                      <CommandEmpty>ไม่พบซี่ฟัน</CommandEmpty>
                      <CommandGroup>
                        {filteredTeethOptions.map((teeth) => (
                          <CommandItem
                            key={teeth.value}
                            value={teeth.value}
                            onSelect={(currentValue) => {
                              // ใช้ form.setValue เพื่ออัปเดตค่าใน react-hook-form
                              form.setValue(
                                "teeth",
                                currentValue === field.value
                                  ? ""
                                  : currentValue,
                                {
                                  shouldValidate: true,
                                }
                              );
                              setOpenTeeth(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value === teeth.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {teeth.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
      </Flex>
      <Flex alignItems="center" className="gap-[8px]">
        <Text bold className="lg:text-[20px]">
          ด้านฟัน
        </Text>
        <FormField
          control={form.control}
          name="teethSide" // ชื่อ field ใน form data สำหรับด้านฟัน
          render={({ field }) => (
            <FormItem className="w-full flex-1">
              <Popover open={openTeethSide} onOpenChange={setOpenTeethSide}>
                <PopoverTrigger asChild>
                  <Button
                    role="combobox"
                    aria-expanded={openTeethSide}
                    className="w-full justify-between text-[16px] lg:text-[18px]"
                  >
                    {field.value
                      ? teethSideOptions.find(
                          (side) => side.value === field.value
                        )?.label
                      : "ระบุด้านฟัน"}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                  <Command>
                    <CommandInput
                      placeholder="ค้นหาด้านฟัน..."
                      value={keywordTeethSide}
                      onValueChange={setKeywordTeethSide}
                    />
                    <CommandList>
                      <CommandEmpty>ไม่พบด้านฟัน</CommandEmpty>
                      <CommandGroup>
                        {filteredTeethSideOptions.map((side) => (
                          <CommandItem
                            key={side.value}
                            value={side.value}
                            onSelect={(currentValue) => {
                              // ใช้ form.setValue เพื่ออัปเดตค่าใน react-hook-form
                              form.setValue(
                                "teethSide",
                                currentValue === field.value
                                  ? ""
                                  : currentValue,
                                {
                                  shouldValidate: true,
                                }
                              );
                              setOpenTeethSide(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value === side.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {side.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
      </Flex>
    </Flex>
  );
}

export default Teethselect;

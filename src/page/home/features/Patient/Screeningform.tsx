import Flex from "@/components/Flex";
import Text from "@/components/Text";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { type UseFormReturn } from "react-hook-form";
import type { PatientFormData } from "./Patientform";

interface Props {
  form?: UseFormReturn<PatientFormData>;
}

function Screeningform({ form }: Props) {
  return (
    <Flex
      className="w-full h-full border border-[#848484] rounded-[16px] p-6  lg:py-[15px] lg:px-[30px]  gap-[32px] "
      direction="column"
    >
      {form ? (
        <>
          <Flex direction="column" className="gap-[12px]">
            <Text className="lg:text-[22px]" bold>
              ความดันโลหิต
            </Text>
            <Flex
              direction="column"
              className="gap-[12px] md:gap-[72px] md:flex-row"
            >
              <Flex alignItems="center" className="gap-[12px]">
                <Text className="lg:text-[22px]" bold>
                  {"Systolic (SYS)"}
                </Text>
                <FormField
                  control={form.control}
                  name="sys"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="120"
                          className="w-16 flex-1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Text className="lg:text-[22px]" bold>
                  mmHg
                </Text>
              </Flex>
              <Flex direction="row" alignItems="center" className="gap-[12px]">
                <Text className="lg:text-[22px]" bold>
                  {"Diastolic (DIA)"}
                </Text>
                <FormField
                  control={form.control}
                  name="dia"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="80"
                          className="w-16 flex-1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Text className="lg:text-[22px]" bold>
                  mmHg
                </Text>
              </Flex>
            </Flex>
            <Flex
              direction="column"
              className="gap-[12px] md:gap-[64px] md:flex-row"
            >
              <Flex alignItems="center" className="gap-[12px]">
                <Text className="lg:text-[22px]" bold>
                  {"Pulse Rate (PR)"}
                </Text>
                <FormField
                  control={form.control}
                  name="pr"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="95"
                          className="w-16 flex-1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Text className="lg:text-[22px]" bold>
                  ครั้ง/นาที
                </Text>
              </Flex>
              <Flex alignItems="center" className="gap-[12px]">
                <Text className="lg:text-[22px]" bold>
                  อุณหภูมิ
                </Text>
                <FormField
                  control={form.control}
                  name="temperature"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="34"
                          className="w-16 flex-1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Text className="lg:text-[22px]" bold>
                  °C
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex direction="column" className="gap-[24px]">
            <Text className="lg:text-[22px]" bold>
              ความเร่งด่วนในการรักษา
            </Text>
            <Flex direction="column" className="md:px-6">
              <FormField
                control={form.control}
                name="urgentLevel"
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="md:flex md:flex-row md:gap-[50px]"
                  >
                    <Flex alignItems="center" className="gap-[8px]">
                      <RadioGroupItem value="0" id="emergency" />
                      <Text
                        className="text-red-600 lg:text-[18px] xl:text-[20px]"
                        bold
                      >
                        Emergency
                      </Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[8px]">
                      <RadioGroupItem value="1" id="urgency" />
                      <Text
                        className="text-amber-600 lg:text-[18px] xl:text-[20px]"
                        bold
                      >
                        Urgency
                      </Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[8px]">
                      <RadioGroupItem value="2" id="nonurgency" />
                      <Text
                        className="text-green-600 lg:text-[18px] xl:text-[20px]"
                        bold
                      >
                        Non-Urgency
                      </Text>
                    </Flex>
                  </RadioGroup>
                )}
              />
            </Flex>
          </Flex>
        </>
      ) : (
        <>
          <Flex direction="column" className="gap-[24px]">
            <Text className="lg:text-[22px]" bold>
              ความดันโลหิต
            </Text>
            <Flex
              direction="column"
              className="gap-[24px] md:gap-[72px]  md:grid md:grid-cols-2"
            >
              <Flex
                alignItems="center"
                className="gap-[12px] md:grid md:grid-cols-3"
              >
                <Text className="lg:text-[22px]" bold>
                  {"Systolic (SYS)"}
                </Text>
                <Text className="lg:text-[22px]">120</Text>
                <Text className="lg:text-[22px]" bold>
                  mmHg
                </Text>
              </Flex>
              <Flex
                direction="row"
                alignItems="center"
                className="gap-[12px] md:grid md:grid-cols-3"
              >
                <Text className="lg:text-[22px]" bold>
                  {"Diastolic (DIA)"}
                </Text>
                <Text className="lg:text-[22px]">86</Text>
                <Text className="lg:text-[22px]" bold>
                  mmHg
                </Text>
              </Flex>
            </Flex>
            <Flex
              direction="column"
              className="gap-[24px] md:gap-[64px]  md:grid md:grid-cols-2"
            >
              <Flex
                direction="row"
                alignItems="center"
                className="gap-[12px] md:grid md:grid-cols-3"
              >
                <Text className="lg:text-[22px]" bold>
                  {"Pulse Rate (PR)"}
                </Text>
                <Text className="lg:text-[22px]">86</Text>
                <Text className="lg:text-[22px]" bold>
                  ครั้ง/นาที
                </Text>
              </Flex>
              <Flex
                alignItems="center"
                className="gap-[12px] md:grid md:grid-cols-3"
              >
                <Text className="lg:text-[22px]" bold>
                  อุณหภูมิ
                </Text>
                <Text className="lg:text-[22px]">36.8</Text>

                <Text className="lg:text-[22px]" bold>
                  °C
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex direction="column" className="gap-[24px]">
            <Text className="lg:text-[22px]" bold>
              ความเร่งด่วนในการรักษา
            </Text>
            <Flex direction="column" className="md:px-6">
              <RadioGroup className="gap-[24px] md:flex md:flex-row md:gap-[50px]">
                <Flex alignItems="center" className="gap-[8px]">
                  <RadioGroupItem value="emergency" id="emergency" />
                  <Text
                    className="text-red-600 lg:text-[18px] xl:text-[20px]"
                    bold
                  >
                    Emergency
                  </Text>
                </Flex>
                <Flex alignItems="center" className="gap-[8px]">
                  <RadioGroupItem value="urgency" id="urgency" />
                  <Text
                    className="text-amber-600 lg:text-[18px] xl:text-[20px]"
                    bold
                  >
                    Urgency
                  </Text>
                </Flex>
                <Flex alignItems="center" className="gap-[8px]">
                  <RadioGroupItem value="nonurgency" id="nonUrgency" />
                  <Text
                    className="text-green-600 lg:text-[18px] xl:text-[20px]"
                    bold
                  >
                    Non-Urgency
                  </Text>
                </Flex>
              </RadioGroup>
            </Flex>
          </Flex>
        </>
      )}
    </Flex>
  );
}

export default Screeningform;

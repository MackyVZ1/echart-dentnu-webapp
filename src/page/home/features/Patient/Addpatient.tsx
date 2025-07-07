import Flex from "@/components/Flex";
import Text from "@/components/Text";
import Patientform from "./Patientform";

function Addpatient() {
  return (
    <Flex className="w-full gap-[8px]" direction="column">
      <Flex textAlign="center" justifyContent="center" className="w-full">
        <Text className="text-[20px] lg:text-[24px]" semibold>
          ลงทะเบียนคนไข้ใหม่
        </Text>
      </Flex>
      <Patientform />
    </Flex>
  );
}

export default Addpatient;

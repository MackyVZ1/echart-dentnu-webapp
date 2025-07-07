import Flex from "@/components/Flex";
import Patienttable from "./Patienttable";

function PatientManagement() {
  return (
    <Flex direction="column" className=" gap-[42px] w-full">
      <Patienttable />
    </Flex>
  );
}

export default PatientManagement;

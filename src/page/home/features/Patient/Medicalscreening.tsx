import Flex from "@/components/Flex";

import Medicalhistoryform from "./Medicalhistoryform";
import Treatmentrecordform from "./Treatmentrecord/Treatmentrecordform";

function Medicalscreening() {
  return (
    <Flex
      direction="column"
      className="border border-[#AFAFAF] rounded-[16px] w-full h-full gap-[24px] p-6 lg:p-[24px]"
    >
      <Medicalhistoryform />
      <Treatmentrecordform />
    </Flex>
  );
}

export default Medicalscreening;

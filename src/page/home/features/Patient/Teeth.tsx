import Flex from "@/components/Flex";
import xray from "@/assets/jpg/x-ray.jpg";
function Teeth() {
  return (
    <Flex direction="column" className="gap-[16px] lg:flex-row">
      <Flex
        direction="column"
        className="border border-[#AFAFAF] rounded-[16px] w-full h-full gap-[30px] p-6 lg:p-[24px]"
      >
        <img src={xray} alt="xray" />
      </Flex>
      <Flex
        direction="column"
        className="border border-[#AFAFAF] rounded-[16px] w-full h-full gap-[30px] p-6 lg:p-[24px]"
      >
        <img src={xray} alt="xray" />
      </Flex>
    </Flex>
  );
}

export default Teeth;

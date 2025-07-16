import DentImg from "@/assets/png/dentnu_logo.png";
import Text from "@/components/Text";
import Flex from "@/components/Flex";
function DentLogo() {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <img src={DentImg} alt="Logo" className="w-[150px] md:w-[200px]" />
      <Text bold className="text-[18px] md:text-[24px] lg:text-[32px]">
        โรงพยาบาลทันตกรรม คณะทันตแพทยศาสตร์
        <br />
        มหาวิทยาลัยนเรศวร
      </Text>
    </Flex>
  );
}

export default DentLogo;

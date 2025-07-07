import DentLogo from "@/page/login/DentLogo";
import Flex from "@/components/Flex";
import LoginCard from "@/page/login/LoginCard";
function Login() {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      direction="column"
      className="gap-[16px]  px-[10px] md:gap-[36px]"
    >
      <DentLogo />
      <LoginCard />
    </Flex>
  );
}

export default Login;

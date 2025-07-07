import type { ReactNode } from "react";
import backgroundImg from "@/assets/png/โลโก้มหาลัย.png";
import Flex from "@/components/Flex";

interface Props {
  children: ReactNode;
}

function LogoBackground({ children }: Props) {
  return (
    <Flex justifyContent="center" className="relative w-screen">
      <Flex
        className="w-screen absolute z-0 p-[20px]"
        justifyContent="center"
        alignItems="center"
      >
        <img
          src={backgroundImg}
          alt="background"
          className="w-[300px] opacity-40 md:w-[450px] lg:w-[500px]"
        />
      </Flex>

      <div className="z-10">{children}</div>
    </Flex>
  );
}

export default LogoBackground;

import { useEffect, useState } from "react";
import {
  ErrorModalIcon,
  SuccessModalIcon,
  VerifyModalIcon,
} from "../assets/svg";
import Flex from "./Flex";
import Text from "./Text";
import { Button } from "@/components/ui/button";

interface ModalProps {
  message: string;
  isVisible?: boolean;
}

interface VerifyModalProps extends ModalProps {
  onVerify?: () => void;
  onCancel?: () => void;
  verifyText?: string;
  cancelText?: string;
}

function BaseModal({
  icon,
  message,
  isVisible = true,
  children,
}: {
  icon: React.ReactNode;
  message: string;
  isVisible?: boolean;
  children?: React.ReactNode;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShow(true), 50);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <Flex
      className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
        show
          ? "opacity-100 backdrop-blur-sm bg-black/40"
          : "opacity-0 backdrop-blur-none bg-black/0"
      }`}
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        backgroundColor="white"
        className={`rounded-[64px] w-[311px] h-[377px] shadow-2xl shadow-black/40 md:w-[511px] md:h-[500px] lg:w-[566px] transform transition-all duration-300 ease-out 
            ${
              show
                ? "scale-100 translate-y-0 opacity-100"
                : "scale-95 translate-y-4 opacity-0"
            }`}
        justifyContent="center"
        alignItems="center"
      >
        <Flex
          direction="column"
          textAlign="center"
          alignItems="center"
          className="gap-[30px]"
        >
          {icon}
          <Text
            medium
            className="text-[20px] text-black md:text-[30px] whitespace-pre-line"
          >
            {message}
          </Text>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
}

export function SuccessModal({ message, isVisible = true }: ModalProps) {
  return (
    <BaseModal
      icon={<SuccessModalIcon />}
      message={message}
      isVisible={isVisible}
    />
  );
}

export function ErrorModal({ message, isVisible = true }: ModalProps) {
  return (
    <BaseModal
      icon={<ErrorModalIcon />}
      message={message}
      isVisible={isVisible}
    />
  );
}

export function VerifyModal({
  message,
  isVisible = true,
  onVerify,
  onCancel,
  verifyText = "ยืนยัน",
  cancelText = "ยกเลิก",
}: VerifyModalProps) {
  return (
    <BaseModal
      icon={<VerifyModalIcon />}
      message={message}
      isVisible={isVisible}
    >
      <Flex className="gap-4" justifyContent="center">
        <Button
          className="group bg-white rounded-xl border border-[#4B006E] lg:w-[201px] p-6 hover:bg-[#848484] hover:border-[#848484]"
          onClick={onCancel}
        >
          <Text className="lg:text-[20px] text-[#4B006E] group-hover:text-white">
            {cancelText}
          </Text>
        </Button>
        <Button className="rounded-xl lg:w-[201px] p-6" onClick={onVerify}>
          <Text className="lg:text-[20px]">{verifyText}</Text>
        </Button>
      </Flex>
    </BaseModal>
  );
}

import Flex from "@/components/Flex";
import Text from "@/components/Text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowBigDown, ArrowBigRight, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ErrorModal, SuccessModal, VerifyModal } from "@/components/Modal";

interface Props {
  onClose: () => void;
  dn: string | null;
}

function Referpatient({ onClose, dn }: Props) {
  const [referFrom, setReferFrom] = useState<string>("");
  const [referTo, setReferTo] = useState<string>("");
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [verifyOn, setVerifyOn] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const referFromOptions = [
    { value: "เวชระเบียน", label: "เวชระเบียน" },
    { value: "คลินิกรังสีเอกซ์เรย์", label: "คลินิกรังสีเอกซ์เรย์" },
  ];

  const referToOptions = [
    { value: "เวชระเบียน", label: "เวชระเบียน" },
    { value: "คลินิกรังสีเอกซ์เรย์", label: "คลินิกรังสีเอกซ์เรย์" },
  ];

  const handleModal = () => {
    setVerifyOn(!verifyOn);
  };

  const handleReferPatient = () => {
    setError("");
    setVerifyOn(!verifyOn);
    setSuccessMessage("ส่งตัวคนไข้สำเร็จ");
    setModalOn(true);
    setTimeout(() => {
      setModalOn(false);
    }, 1000);
  };

  return (
    <Flex
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transform transition-all duration-300  p-6 lg:p-12 xl:p-36"
      justifyContent="center"
      alignItems="center"
    >
      {/**Mobile */}
      <Card className="w-full lg:p-8 md:hidden">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>
            <Text className="lg:text-[30px]" bold>
              DN : {dn}
            </Text>
          </CardTitle>
          <X
            onClick={onClose}
            color="grey"
            className="cursor-pointer"
            width={30}
            height={30}
          />
        </CardHeader>
        <CardContent>
          <Flex direction="column" className="gap-[18px]">
            <Text className="lg:text-[20px]" semibold>
              ส่งตัวจาก
            </Text>
            <Flex
              alignItems="center"
              justifyContent="center"
              direction="column"
              className="gap-[12px]"
            >
              <Select value={referFrom} onValueChange={setReferFrom}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="ระบุคลินิก" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {referFromOptions.map((option, index) => (
                      <SelectItem key={index} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <ArrowBigDown width={60} height={60} color="#4B006E" />
              <Select value={referTo} onValueChange={setReferTo}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="ระบุคลินิก" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {referToOptions.map((option, index) => (
                      <SelectItem key={index} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Flex>
            <Flex alignItems="center" justifyContent="center">
              <Button size={"sm"} className="w-[120px]" onClick={handleModal}>
                <Text>ยืนยัน</Text>
              </Button>
            </Flex>
          </Flex>
        </CardContent>
      </Card>

      {/**Tablet Mini, Tablet Pro, Desktop */}
      <Card className="w-full lg:p-8 hidden md:flex">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>
            <Text className="lg:text-[30px]" bold>
              DN : {dn}
            </Text>
          </CardTitle>
          <X
            onClick={onClose}
            color="grey"
            className="cursor-pointer"
            width={30}
            height={30}
          />
        </CardHeader>
        <CardContent>
          <Flex direction="column">
            <Text className="lg:text-[20px]" semibold>
              ส่งตัวจาก
            </Text>
            <Flex
              alignItems="center"
              justifyContent="center"
              className="gap-[12px]"
            >
              <Select value={referFrom} onValueChange={setReferFrom}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="ระบุคลินิก" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {referFromOptions.map((option, index) => (
                      <SelectItem key={index} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <ArrowBigRight width={120} height={120} color="#4B006E" />
              <Select value={referTo} onValueChange={setReferTo}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="ระบุคลินิก" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {referToOptions.map((option, index) => (
                      <SelectItem key={index} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Flex>
            <Flex alignItems="center" justifyContent="center">
              <Button size={"sm"} className="w-[120px]" onClick={handleModal}>
                <Text>ยืนยัน</Text>
              </Button>
            </Flex>
          </Flex>
        </CardContent>
      </Card>

      {verifyOn == true && (
        <Flex
          className="fixed inset-0 z-50 bg-black/40"
          justifyContent="center"
          alignItems="center"
        >
          <VerifyModal
            message="ยืนยันการส่งตัว"
            onCancel={handleModal}
            onVerify={handleReferPatient}
          />
        </Flex>
      )}

      {modalOn && !error && (
        <SuccessModal message={successMessage} isVisible={modalOn} />
      )}
      {modalOn && !!error && <ErrorModal message={error} isVisible={modalOn} />}
    </Flex>
  );
}

export default Referpatient;

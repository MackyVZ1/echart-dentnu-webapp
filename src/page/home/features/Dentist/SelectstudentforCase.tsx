import Flex from "@/components/Flex";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Text from "@/components/Text";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import { ErrorModal, SuccessModal, VerifyModal } from "@/components/Modal";

interface Props {
  dn: string;
  onClose: () => void;
}

function SelectstudentforCase({ dn, onClose }: Props) {
  const [student, setStudent] = useState<string>("");
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [verifyOn, setVerifyOn] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleModal = () => {
    setVerifyOn(!verifyOn);
  };

  const handleSelectPatientToDentist = () => {
    if (!student) {
      setError("กรุณาระบุนิสิตทันตแพทย์");
      setVerifyOn(!verifyOn);

      setModalOn(true);

      return setTimeout(() => {
        setModalOn(false);
      }, 2000);
    }
    setVerifyOn(!verifyOn);
    setSuccessMessage("ส่งคนไข้ให้ทันตแพทย์สำเร็จ");
    setModalOn(true);

    setTimeout(() => {
      setModalOn(false);
      onClose();
    }, 1000);
  };

  const studentOptions = [
    {
      value: "1",
      label: "นายวีรภัทร คงกระพันพวย",
    },
  ];

  return (
    <Flex
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transform transition-all duration-300  p-6 md:p-24 lg:p-36 xl:p-72"
      justifyContent="center"
      alignItems="center"
    >
      <Card className="w-full lg:p-8 ">
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
          <Flex direction="column" className="gap-[20px]">
            <Text className="lg:text-[20px]" semibold>
              นิสิตทันตแพทย์
            </Text>
            <Flex
              alignItems="center"
              justifyContent="center"
              className="gap-[12px]"
            >
              <Select value={student} onValueChange={setStudent}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="ระบุนิสิตทันตแพทย์" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {studentOptions.map((student, index) => (
                      <SelectItem key={index} value={student.value}>
                        {student.label}
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
        <VerifyModal
          message="ยืนยันการเลือกทันตแพทย์"
          onCancel={handleModal}
          onVerify={handleSelectPatientToDentist}
        />
      )}

      {modalOn && !error && (
        <SuccessModal message={successMessage} isVisible={modalOn} />
      )}
      {modalOn && !!error && <ErrorModal message={error} isVisible={modalOn} />}
    </Flex>
  );
}

export default SelectstudentforCase;

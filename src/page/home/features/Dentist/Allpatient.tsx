import Flex from "@/components/Flex";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Text from "@/components/Text";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { ErrorModal, SuccessModal, VerifyModal } from "@/components/Modal";
import SelectstudentforCase from "./SelectstudentforCase";

function Allpatient() {
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [verifyOn, setVerifyOn] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [studentPopup, setStudentPopup] = useState<boolean>(false);
  const [selectedDN, setSelectedDN] = useState<string>("");

  const handleTeacherModal = () => {
    setVerifyOn(!verifyOn);
  };

  const handleStudentModal = (dn: string) => {
    setSelectedDN(dn);
    setStudentPopup(!studentPopup);
  };

  const handleGetCaseByTeacher = () => {
    setError("");
    setVerifyOn(!verifyOn);
    setSuccessMessage("รับเคสสำเร็จ");
    setModalOn(true);

    setTimeout(() => {
      setModalOn(false);
    }, 1000);
  };

  return (
    <Flex direction="column" className="w-full">
      <div className="border-[3px] border-[#4B006E] rounded-2xl overflow-hidden w-full h-full">
        <ScrollArea className="h-full">
          <ScrollBar orientation="horizontal" />
          <Table>
            {/* Sticky Header */}
            <TableHeader className="bg-[#4B006E] sticky top-0 z-10">
              <TableRow className="hover:bg-transparent">
                <TableHead className="p-4 min-w-[120px] text-center">
                  <Text className="text-white text-[18px]" semibold>
                    DN
                  </Text>
                </TableHead>
                <TableHead className="p-4  min-w-[180px] text-center">
                  <Text className="text-white text-[18px]" semibold>
                    ชื่อ - นามสกุล
                  </Text>
                </TableHead>
                <TableHead className="p-4 min-w-[120px]">
                  <Text> </Text>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="p-4 text-center">
                  <Text semibold>680001</Text>
                </TableCell>
                <TableCell className="p-4">
                  <Text semibold>นายหม่ำเท่งโหน่ง ช่าช่าช่า</Text>
                </TableCell>
                <TableCell className="p-4 flex justify-end gap-[8px]">
                  <Button onClick={handleTeacherModal}>
                    <Text>รับเอง</Text>
                  </Button>
                  <Button onClick={() => handleStudentModal("680001")}>
                    <Text>เคสนิสิต</Text>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="p-4 text-center">
                  <Text semibold>680002</Text>
                </TableCell>
                <TableCell className="p-4">
                  <Text semibold>นายแจ๊ส ช่าช่าช่า</Text>
                </TableCell>
                <TableCell className="p-4 flex justify-end gap-[8px]">
                  <Button onClick={handleTeacherModal}>
                    <Text>รับเอง</Text>
                  </Button>
                  <Button onClick={() => handleStudentModal("680002")}>
                    <Text>เคสนิสิต</Text>
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      {studentPopup == true && (
        <SelectstudentforCase
          dn={selectedDN}
          onClose={() => setStudentPopup(!studentPopup)}
        />
      )}

      {verifyOn == true && (
        <VerifyModal
          message="ยืนยันการรับเคส"
          onCancel={handleTeacherModal}
          onVerify={handleGetCaseByTeacher}
        />
      )}

      {modalOn && !error && (
        <SuccessModal message={successMessage} isVisible={modalOn} />
      )}
      {modalOn && !!error && <ErrorModal message={error} isVisible={modalOn} />}
    </Flex>
  );
}

export default Allpatient;

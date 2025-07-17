import { AcceptPatientIcon } from "@/assets/svg";
import Flex from "@/components/Flex";
import Text from "@/components/Text";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import SelectpatientforDentist from "./SelectpatientforDentist";

function Refer() {
  const [selectedDN, setSelectedDN] = useState<string>("");
  const [popupOn, setPopupOn] = useState<boolean>(false);

  const handleSelectPatientToDentist = (dn: string) => {
    setSelectedDN(dn);
    setPopupOn(!popupOn);
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
                <TableHead className="p-4  min-w-[180px] text-center">
                  <Text className="text-white text-[18px]" semibold>
                    Referral Clinic From
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
                <TableCell className="p-4 text-center">
                  <Text semibold>เวชระเบียน</Text>
                </TableCell>
                <TableCell className="p-4 flex justify-center">
                  <Button
                    onClick={() => handleSelectPatientToDentist("680001")}
                  >
                    <AcceptPatientIcon />
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
                <TableCell className="p-4 text-center">
                  <Text semibold>เวชระเบียน</Text>
                </TableCell>
                <TableCell className="p-4 flex justify-center">
                  <Button
                    onClick={() => handleSelectPatientToDentist("680002")}
                  >
                    <AcceptPatientIcon />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      {popupOn == true && (
        <SelectpatientforDentist
          dn={selectedDN}
          onClose={() => setPopupOn(!popupOn)}
        />
      )}
    </Flex>
  );
}

export default Refer;

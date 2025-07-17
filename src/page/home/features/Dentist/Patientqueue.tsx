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
import { NotebookPenIcon } from "lucide-react";
import { useState } from "react";
function Patientqueue() {
  const [tabActive, setTabactive] = useState<string>("คนไข้อาจารย์");

  const handleActiveTab = (type: string) => {
    setTabactive(type);
  };

  return (
    <Flex direction="column" className="w-full gap-[20px]">
      <Flex direction="row" className="gap-[8px] items-center">
        <Flex
          className={`lg:text-[20px] font-bold transform transition-all duration-300 ${
            tabActive === "คนไข้อาจารย์"
              ? "text-purple-700 hover:text-purple-700 cursor-default"
              : "text-gray-600 hover:text-purple-400 cursor-pointer"
          }`}
          onClick={() => handleActiveTab("คนไข้อาจารย์")}
        >
          คนไข้อาจารย์
        </Flex>
        <Flex className="p-0.5 bg-gray-400"></Flex>
        <Flex
          className={`lg:text-[20px] font-bold transform transition-all duration-300 ${
            tabActive === "เคสนิสิต"
              ? "text-purple-700 hover:text-purple-700 cursor-default"
              : "text-gray-600 hover:text-purple-400 cursor-pointer"
          }`}
          onClick={() => handleActiveTab("เคสนิสิต")}
        >
          เคสนิสิต
        </Flex>
      </Flex>
      {tabActive === "คนไข้อาจารย์" ? (
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
                    <Button>
                      <NotebookPenIcon color="white" />
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
                    <Button>
                      <NotebookPenIcon color="white" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      ) : (
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
                  <TableHead className="p-4 min-w-[120px] text-center">
                    <Text className="text-white text-[18px]" semibold>
                      นิสิตทันตแพทย์
                    </Text>
                  </TableHead>
                  <TableHead className="p-4 min-w-[120px] text-center">
                    <Text className="text-white text-[18px]" semibold>
                      สถานะ
                    </Text>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="p-4 text-center">
                    <Text semibold>680002</Text>
                  </TableCell>
                  <TableCell className="p-4">
                    <Text semibold>นายหม่ำเท่งโหน่ง ช่าช่าช่า</Text>
                  </TableCell>
                  <TableCell className="p-4">
                    <Text semibold>นายวีรภัทร คงกระพันพวย</Text>
                  </TableCell>
                  <TableCell className="p-4 text-center">
                    <Text semibold className="text-yellow-500">
                      รอ Approve
                    </Text>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      )}
    </Flex>
  );
}

export default Patientqueue;

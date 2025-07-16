import Flex from "@/components/Flex";
import Text from "@/components/Text";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ReferIcon } from "@/assets/svg";
import { useNavigate } from "react-router-dom";
import { ErrorModal, SuccessModal, VerifyModal } from "@/components/Modal";
import { CirclePlusIcon, Info, Search, SquareXIcon } from "lucide-react";
import Referpatient from "./Referpatient";

type Patient = {
  dn: string | null;
  idNo: string | null;
  nameTh: string | null;
  surnameTh: string | null;
  titleTh: string | null;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getPagination(current: number, total: number) {
  const delta = 2;
  const range = [];
  for (
    let i = Math.max(2, current - delta);
    i <= Math.min(total - 1, current + delta);
    i++
  ) {
    range.push(i);
  }
  if (current - delta > 2) range.unshift("...");
  if (current + delta < total - 1) range.push("...");
  range.unshift(1);
  if (total > 1) range.push(total);
  return range;
}

function Patienttable() {
  const [patients, setPatient] = useState<Patient[]>([]);

  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10); // กำหนด limit (สามารถทำให้ปรับได้ในอนาคต)
  const [total, setTotal] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>(""); // State สำหรับ Keyword Search

  const pagination = getPagination(page, pageCount);

  const nav = useNavigate();

  const [verifyOn, setVerifyOn] = useState<boolean>(false);
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [selectedDN, setSelectedDN] = useState<string | null>("");

  const [referOn, setReferOn] = useState<boolean>(false);

  const handleReferOn = (dn: string | null = null) => {
    setSelectedDN(dn);
    setReferOn(!referOn);
  };

  const handleModal = (dn: string | null = null) => {
    setSelectedDN(dn);
    setVerifyOn(!verifyOn);
  };

  const handlePatientInfo = (dn: string | null) => {
    if (dn) nav(`/home/patient/${dn}`);
  };

  const handleAddButton = () => {
    nav("/home/patientmanagement/addpatient");
  };

  const handlePatientDelete = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.delete(
        `${API_BASE_URL}/api/tpatient/${selectedDN}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      if (response) {
        setVerifyOn(false);
        setModalOn(true);
        setSelectedDN(null);

        patientFetch();

        setTimeout(() => {
          setModalOn(false);
        }, 1000);
      }
    } catch (e: any) {
      let errorMessage = e.response?.data?.message;
      console.error(errorMessage);

      setVerifyOn(false);
      setModalOn(true);

      setTimeout(() => {
        setError("");
        setModalOn(false);
      }, 1000);
    }
  };

  const patientFetch = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (keyword) {
        queryParams.append("keyword", keyword);
      }

      const response = await axios.get(
        `${API_BASE_URL}/api/tpatient?${queryParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("Patient API Response:", response.data.data);

      setPatient(response.data.data ?? []);
      setTotal(response?.data?.Total ?? 0); //
      setPageCount(response?.data?.PageCount ?? 1);
    } catch (e: any) {
      let errorMessage = e.response?.data?.message;
      console.error(errorMessage);
    }
  };

  // จัดการการเปลี่ยนหน้า Pagination
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pageCount) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    patientFetch();
  }, [page, limit, keyword]);
  return (
    <>
      <Flex
        direction="column"
        alignItems="center"
        className="lg:flex-row gap-6 "
      >
        <Text className="lg:text-[24px] lg:min-w-[120px]">ค้นหาคนไข้</Text>

        <Flex
          alignItems="center"
          className="p-2 border-[3px] border-[#4B006E] rounded-[8px] w-full"
        >
          <Search color="#4B006E" />
          <Input
            name="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="DN, ชื่อ - สกุล, เลขประจำตัวประชาชน"
            className="border-none focus:outline-none focus-visible:ring-0 shadow-none"
          />
        </Flex>

        <Button size={"sm"} className="max-lg:w-full" onClick={handleAddButton}>
          <CirclePlusIcon />
          <Text medium className="md:text-[18px] lg:text-[20px]">
            เพิ่มคนไข้ใหม่
          </Text>
        </Button>
      </Flex>
      <Flex direction="column" className="w-full">
        {/**Table */}
        <div className="border-[3px] border-[#4B006E] rounded-2xl overflow-hidden w-full">
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
                  <TableHead className="p-4 min-w-[200px] text-center">
                    <Text className="text-white text-[18px]" semibold>
                      เลขประจำตัวประชาชน
                    </Text>
                  </TableHead>
                  <TableHead className="p-4  min-w-[180px]">
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
                {patients.map((patient, index) => (
                  <TableRow key={index}>
                    <TableCell className="p-4 text-center">
                      <Text semibold>{patient.dn}</Text>
                    </TableCell>
                    <TableCell className="p-4">
                      <Text className=" text-center">{patient.idNo}</Text>
                    </TableCell>

                    <TableCell className="p-4 ">
                      <Text>
                        {patient.titleTh}
                        {patient.nameTh} {patient.surnameTh}
                      </Text>
                    </TableCell>
                    <TableCell className="p-4">
                      <Flex justifyContent="center" className="gap-2">
                        <Button
                          className="w-[100px] p-0"
                          onClick={() => handleReferOn(patient.dn)}
                        >
                          <ReferIcon />
                        </Button>
                        <Button onClick={() => handlePatientInfo(patient.dn)}>
                          <Info />
                        </Button>
                        <Button
                          variant={"destructive"}
                          onClick={() => handleModal(patient.dn)}
                        >
                          <SquareXIcon />
                        </Button>
                      </Flex>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>

        {pageCount > 1 && (
          <Flex justifyContent="center" className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(page - 1)}
                    className={
                      page <= 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {pagination.map((pageNum, index) => (
                  <PaginationItem key={index}>
                    {pageNum === "..." ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        onClick={() => handlePageChange(Number(pageNum))}
                        isActive={page === pageNum}
                      >
                        {pageNum}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(page + 1)}
                    className={
                      page >= pageCount
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </Flex>
        )}

        <Flex justifyContent="center" className="mt-2">
          <Text className="text-sm text-gray-600">
            แสดง {(page - 1) * limit + 1} - {Math.min(page * limit, total)} จาก{" "}
            {total} รายการ
          </Text>
        </Flex>
      </Flex>

      {referOn == true && (
        <Referpatient onClose={handleReferOn} dn={selectedDN} />
      )}

      {verifyOn == true && (
        <VerifyModal
          message="ยืนยันการลบข้อมูล"
          onCancel={() => handleModal()}
          onVerify={handlePatientDelete}
        />
      )}

      {modalOn && !error && (
        <SuccessModal message="ลบข้อมูลเจ้าหน้าที่สำเร็จ" isVisible={modalOn} />
      )}
      {modalOn && !!error && <ErrorModal message={error} isVisible={modalOn} />}
    </>
  );
}

export default Patienttable;

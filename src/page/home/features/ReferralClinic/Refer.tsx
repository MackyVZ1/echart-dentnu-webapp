/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Flex from "@/components/Flex";
import Text from "@/components/Text";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/page/login/LoginCard";
import { getPagination } from "../StaffManagement/Stafftable";
import { useNavigate } from "react-router-dom";
import { ErrorModal } from "@/components/Modal";
import dayjs from "dayjs";
import Loading from "@/components/Loading";

export type ClinicRefer = {
  clinicreferId: number;
  dn: string;
  referFrom: string;
  referTo: string;
  titleTh: string;
  nameTh: string;
  surnameTh: string;
  createdAt: Date;
  instructorId: number;
  instructorTName: string;
  instructorFName: string;
  instructorLName: string;
  studentId: number;
  studentTName: string;
  studentFName: string;
  studentLName: string;
  status: number;
};

function Refer() {
  const [clinicrefers, setClinicrefers] = useState<ClinicRefer[]>([]);
  const clinicId = sessionStorage.getItem("clinicId");

  // Pagination
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10); // กำหนด limit (สามารถทำให้ปรับได้ในอนาคต)
  const [total, setTotal] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(1);
  const pagination = getPagination(page, pageCount);

  // Modal State
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Loading State
  const [loading, setLoading] = useState<boolean>(false);

  // Navigate
  const nav = useNavigate();

  const clinicreferFetch = async () => {
    setLoading(true);
    try {
      setError("");

      const token = sessionStorage.getItem("token");

      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        referTo: clinicId ? clinicId.toString() : "",
        status: "0",
      });

      const response = await axios.get(
        `${API_BASE_URL}/api/clinicrefer?${queryParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(response?.data?.data);

      setClinicrefers(response?.data?.data ?? []);
      setTotal(response?.data?.total ?? 0);
      setPageCount(response?.data?.pageCount ?? 1);
    } catch (e: any) {
      let errorMessage = e.response?.data?.message;
      let errorStatus = e.response?.status;

      if (errorStatus === 401) {
        setError("ไม่ได้รับอนุญาตให้ใช้งาน");
        setModalOn(true);
        sessionStorage.clear();

        return setTimeout(() => {
          setModalOn(false);
          setError("");
          nav("/");
        }, 2000);
      } else if (errorStatus === 403) {
        setError("ไม่มีสิทธิ์ในการเข้าใช้ฟีเจอร์นี้");
        setModalOn(true);

        return setTimeout(() => {
          setModalOn(false);
          setError("");
        }, 2000);
      } else if (errorStatus === 404) {
        setError("ไม่มีการส่งตัวคนไข้");
      } else {
        setError(`เซิร์ฟเวอร์ขัดข้อง: ${errorMessage}`);
        setModalOn(true);

        return setTimeout(() => {
          setModalOn(false);
          setError("");
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  // จัดการการเปลี่ยนหน้า Pagination
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pageCount) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    setError("");
    setLoading(true);
    clinicreferFetch();
  }, [page, limit]);

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
                    ถูกส่งตัวมาจาก
                  </Text>
                </TableHead>
                <TableHead className="p-4  min-w-[180px] text-center">
                  <Text className="text-white text-[18px]" semibold>
                    เวลา
                  </Text>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clinicrefers.map((clinicrefer) => (
                <TableRow key={clinicrefer.clinicreferId}>
                  <TableCell className="p-4 text-center">
                    <Text semibold>{clinicrefer.dn}</Text>
                  </TableCell>
                  <TableCell className="p-4">
                    <Text semibold>
                      {clinicrefer.titleTh}
                      {clinicrefer.nameTh} {clinicrefer.surnameTh}
                    </Text>
                  </TableCell>
                  <TableCell className="p-4 text-center">
                    <Text semibold>
                      {clinicrefer.referFrom == "1"
                        ? "Occlusion"
                        : clinicrefer.referFrom == "2"
                        ? "Oral Health Promotion"
                        : clinicrefer.referFrom == "3"
                        ? "Periodontic"
                        : clinicrefer.referFrom == "4"
                        ? "Operative"
                        : clinicrefer.referFrom == "5"
                        ? "Endodontic"
                        : clinicrefer.referFrom == "6"
                        ? "Prosthodontic"
                        : clinicrefer.referFrom == "7"
                        ? "Oral Surgery"
                        : clinicrefer.referFrom == "8"
                        ? "Oral Diagnosis"
                        : clinicrefer.referFrom == "9"
                        ? "Orthodontic"
                        : clinicrefer.referFrom == "10"
                        ? "Pedodontic"
                        : clinicrefer.referFrom == "11"
                        ? "บริการในเวลาราชการ"
                        : clinicrefer.referFrom == "12"
                        ? "Oral Radiology"
                        : clinicrefer.referFrom == "13"
                        ? "คลินิกพิเศษ"
                        : clinicrefer.referFrom == "14"
                        ? "บัณฑิตศึกษา"
                        : "รากเทียม"}
                    </Text>
                  </TableCell>
                  <TableCell className="p-4 text-center">
                    <Text
                      semibold
                      className={
                        dayjs().diff(dayjs(clinicrefer.createdAt), "minute") >
                        30
                          ? "text-red-500"
                          : ""
                      }
                    >
                      {dayjs(clinicrefer.createdAt).format(" HH:mm")}
                    </Text>
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
        {error === "ไม่มีการส่งตัวคนไข้" ? (
          <Text bold className="text-md text-red-500">
            {error}
          </Text>
        ) : (
          <Text className="text-sm text-gray-600">
            แสดง {(page - 1) * limit + 1} - {Math.min(page * limit, total)} จาก{" "}
            {total} รายการ
          </Text>
        )}
      </Flex>

      {loading && <Loading isOpen message="กำลังโหลดข้อมูลการส่งตัว" />}
      {modalOn && !!error && <ErrorModal message={error} isVisible={modalOn} />}
    </Flex>
  );
}

export default Refer;

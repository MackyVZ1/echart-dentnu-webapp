/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";
import { NotebookPenIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { ClinicRefer } from "../ReferralClinic/Refer";
import { getPagination } from "../StaffManagement/Stafftable";
import { API_BASE_URL } from "@/page/login/LoginCard";
import axios from "axios";
import Flex from "@/components/Flex";
import { ErrorModal } from "@/components/Modal";
import Loading from "@/components/Loading";
import dayjs from "dayjs";

interface Props {
  teacherMode?: boolean;
  studentMode?: boolean;
}

function Patientqueuetable({ teacherMode, studentMode }: Props) {
  const [clinicrefers, setClinicrefers] = useState<ClinicRefer[]>([]);

  // Pagination
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10); // กำหนด limit (สามารถทำให้ปรับได้ในอนาคต)
  const [total, setTotal] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(1);
  const pagination = getPagination(page, pageCount);

  // Modal State
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Navigate
  const nav = useNavigate();

  // Loading
  const [teacherLoading, setteacherLoading] = useState<boolean>(false);
  const [studentLoading, setstudentLoading] = useState<boolean>(false);

  const handleTreatmentPage = (dn: string) => {
    nav(`/home/patientqueue/${dn}`);
  };

  const clinicreferForStudentFetch = async () => {
    try {
      setError("");

      const token = sessionStorage.getItem("token");
      const userId = sessionStorage.getItem("userId");
      const queryParams = new URLSearchParams();
      queryParams.append("page", page.toString());
      queryParams.append("limit", limit.toString());
      if (userId) {
        queryParams.append("studentId", userId.toString());
      }

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
      setstudentLoading(false);
    }
  };

  const clinicreferForTeacherFetch = async () => {
    try {
      setError("");

      const token = sessionStorage.getItem("token");
      const userId = sessionStorage.getItem("userId");
      const queryParams = new URLSearchParams();
      queryParams.append("page", page.toString());
      queryParams.append("limit", limit.toString());
      if (userId) {
        queryParams.append("instructorId", userId.toString());
      }

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
      console.error(e?.response);
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
      setteacherLoading(false);
    }
  };

  // จัดการการเปลี่ยนหน้า Pagination
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pageCount) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    if (teacherMode) {
      setteacherLoading(true);
      clinicreferForTeacherFetch();
    } else if (studentMode) {
      setstudentLoading(true);
      clinicreferForStudentFetch();
    }
  }, [page, limit]);
  return (
    <>
      {teacherMode || studentMode ? (
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
                    <Text className="text-white text-[18px]" semibold>
                      {" "}
                      เวลา
                    </Text>
                  </TableHead>
                  <TableHead className="p-4 min-w-[120px]">
                    <Text> </Text>
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
                    <TableCell className="p-4">
                      <Text
                        semibold
                        className={
                          dayjs().diff(dayjs(clinicrefer.createdAt), "minute") >
                          30
                            ? "text-red-500"
                            : ""
                        }
                      >
                        {dayjs(clinicrefer.createdAt).format("HH:mm")}
                      </Text>
                    </TableCell>
                    <TableCell className="p-4 flex justify-end gap-[8px]">
                      <Button
                        onClick={() => handleTreatmentPage(clinicrefer.dn)}
                      >
                        <NotebookPenIcon color="white" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
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
                {clinicrefers.map((clinic) => (
                  <TableRow key={clinic.clinicreferId}>
                    <TableCell className="p-4 text-center">
                      <Text semibold>{clinic.dn}</Text>
                    </TableCell>
                    <TableCell className="p-4">
                      <Text
                        semibold
                      >{`${clinic.titleTh}${clinic.nameTh} ${clinic.surnameTh}`}</Text>
                    </TableCell>
                    <TableCell className="p-4">
                      <Text
                        semibold
                      >{`${clinic.studentTName}${clinic.studentFName} ${clinic.studentLName}`}</Text>
                    </TableCell>
                    <TableCell className="p-4 text-center">
                      <Text
                        semibold
                        className={`${
                          clinic.status == 0
                            ? "text-red-500"
                            : clinic.status == 2
                            ? "text-blue-700"
                            : clinic.status == 1
                            ? "text-yellow-500"
                            : "text-green-600"
                        }`}
                      >
                        {clinic.status == 0
                          ? "ยังไม่ได้รับการรักษา"
                          : clinic.status == 2
                          ? "กำลังรักษา"
                          : clinic.status == 1
                          ? "รอ Approve"
                          : "สิ้นสุดการรักษา"}
                      </Text>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      )}

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
      {studentLoading && <Loading isOpen message="กำลังโหลดเคสนิสิต" />}
      {teacherLoading && <Loading isOpen message="กำลังโหลดเคสอาจารย์" />}

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

      {modalOn && !!error && <ErrorModal message={error} isVisible={modalOn} />}
    </>
  );
}

export default Patientqueuetable;

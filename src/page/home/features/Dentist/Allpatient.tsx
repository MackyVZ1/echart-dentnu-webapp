/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { ErrorModal, SuccessModal, VerifyModal } from "@/components/Modal";
import SelectstudentforCase from "./SelectstudentforCase";
import type { ClinicRefer } from "../ReferralClinic/Refer";
import { getPagination } from "../StaffManagement/Stafftable";
import { API_BASE_URL } from "@/page/login/LoginCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Loading from "@/components/Loading";

function Allpatient() {
  const [clinicrefers, setClinicrefers] = useState<ClinicRefer[]>([]);
  // Modal State
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [verifyOn, setVerifyOn] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  // Popup State
  const [studentPopup, setStudentPopup] = useState<boolean>(false);
  const [selectedDN, setSelectedDN] = useState<string>("");
  const [selectedClinicreferId, setSelectClinicreferId] = useState<
    number | null
  >();

  // Pagination
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10); // กำหนด limit (สามารถทำให้ปรับได้ในอนาคต)
  const [total, setTotal] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(1);
  const pagination = getPagination(page, pageCount);

  // Navigate
  const nav = useNavigate();

  // Loading State
  const [fetchLoading, setfetchLoading] = useState<boolean>(false);
  const [teacherLoading, setteacherLoading] = useState<boolean>(false);

  const handleTeacherModal = (clinicId: number | null) => {
    setVerifyOn(!verifyOn);
    setSelectClinicreferId(clinicId);
  };

  const handleStudentModal = (dn: string, clinicId: number | null) => {
    setSelectedDN(dn);
    setSelectClinicreferId(clinicId);
    setStudentPopup(!studentPopup);
  };

  const handleGetCaseByTeacher = async () => {
    setVerifyOn(false);
    setteacherLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const userId = sessionStorage.getItem("userId");
      const response = await axios.patch(
        `${API_BASE_URL}/api/clinicrefer/${selectedClinicreferId?.toString()}`,
        {
          instructorId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        setError("");
        setVerifyOn(!verifyOn);
        setSuccessMessage("รับเคสสำเร็จ");
        setModalOn(true);

        setTimeout(() => {
          setModalOn(false);
        }, 1000);

        clinicreferFetch();
      }
    } catch (e: any) {
      console.error(e.response.data);
    } finally {
      setteacherLoading(false);
    }
  };

  const clinicreferFetch = async () => {
    try {
      setError("");

      const token = sessionStorage.getItem("token");
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
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

      console.log(response?.data?.data);

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
      setfetchLoading(false);
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
    setfetchLoading(true);
    clinicreferFetch();
  }, [page, limit]);

  useEffect(() => {
    const clinicId = sessionStorage.getItem("clinicId");
    const userId = sessionStorage.getItem("userId");
    console.log(userId);
    console.log(clinicId);
  }, []);

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
                    เวลา
                  </Text>
                </TableHead>
                <TableHead className="p-4  min-w-[180px] text-center">
                  <Text className="text-white text-[18px]" semibold>
                    ทันตแพทย์
                  </Text>
                </TableHead>
                <TableHead className="p-4  min-w-[180px] text-center">
                  <Text className="text-white text-[18px]" semibold>
                    นิสิตทันตแพทย์
                  </Text>
                </TableHead>
                <TableHead className="p-4  min-w-[180px] text-center">
                  <Text className="text-white text-[18px]" semibold>
                    สถานะ
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
                  <TableCell className="p-4 text-center">
                    <Text semibold>
                      {dayjs(clinicrefer.createdAt).format("HH:mm")}
                    </Text>
                  </TableCell>
                  <TableCell className="p-4 text-center">
                    <Text semibold>
                      {clinicrefer?.instructorTName &&
                      clinicrefer?.instructorFName &&
                      clinicrefer?.instructorLName
                        ? `${clinicrefer?.instructorTName}${clinicrefer?.instructorFName} ${clinicrefer?.instructorLName}`
                        : "-"}
                    </Text>
                  </TableCell>
                  <TableCell className="p-4 text-center">
                    <Text semibold>
                      {clinicrefer?.studentTName &&
                      clinicrefer?.studentFName &&
                      clinicrefer?.studentLName
                        ? `${clinicrefer?.studentTName}${clinicrefer?.studentFName} ${clinicrefer?.studentLName}`
                        : "-"}
                    </Text>
                  </TableCell>
                  <TableCell className="p-4 text-center">
                    <Text semibold>ยังไม่ได้รับการรักษา</Text>
                  </TableCell>
                  <TableCell className="p-4 flex justify-end gap-[8px]">
                    <Button
                      onClick={() =>
                        handleTeacherModal(clinicrefer.clinicreferId)
                      }
                    >
                      <Text>อาจารย์</Text>
                    </Button>
                    <Button
                      onClick={() =>
                        handleStudentModal(
                          clinicrefer.dn,
                          clinicrefer.clinicreferId
                        )
                      }
                    >
                      <Text>นิสิต</Text>
                    </Button>
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

      {teacherLoading && <Loading isOpen message="กำลังรับเคส" />}

      {fetchLoading && (
        <Loading isOpen message="กำลังโหลดคนไข้ที่ถูกส่งตัวมา" />
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

      {studentPopup == true && (
        <SelectstudentforCase
          dn={selectedDN}
          clinicreferId={selectedClinicreferId}
          onClose={() => setStudentPopup(!studentPopup)}
          onStudentSelected={clinicreferFetch}
        />
      )}

      {verifyOn == true && (
        <VerifyModal
          message="ยืนยันการรับเคส"
          onCancel={() => handleTeacherModal(null)}
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

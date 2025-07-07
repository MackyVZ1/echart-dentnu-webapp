import { useEffect, useState } from "react";
import { DeleteIcon, EditIcon, SearchIcon } from "@/assets/svg";
import Text from "@/components/Text";
import axios from "axios";
import Flex from "@/components/Flex";
import { ErrorModal, SuccessModal, VerifyModal } from "@/components/Modal";
import Addstaff from "./Addstaff";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Staff = {
  userId: number | null;
  fname: string;
  lname: string;
  license: string | null;
  tname?: string | null;
  studentID?: string;
  roleID?: number;
  users?: string;
  passw?: string;
  sort?: number;
  type?: string;
  clinicid?: string;
};

interface Props {
  onClose: () => void;
  refreshTrigger?: number; // เพิ่ม prop สำหรับ trigger การรีเฟรช
  onEdit?: boolean;
}

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

function Stafftable({ onClose, refreshTrigger }: Props) {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedStaff, setSelectedStaff] = useState<number | null>(null);

  const [verifyOn, setVerifyOn] = useState<boolean>(false);
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [keyword, setKeyword] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<number>(0);
  const roleOptions = [
    { value: 0, label: "ทั้งหมด" },
    { value: 1, label: "Administrator" },
    { value: 2, label: "ระบบนัดหมาย" },
    { value: 3, label: "การเงิน" },
    { value: 4, label: "เวชระเบียน" },
    { value: 5, label: "อาจารย์" },
    { value: 6, label: "ปริญญาตรี" },
    { value: 7, label: "ระบบยา" },
    { value: 8, label: "ผู้ใช้งานทั่วไป" },
    { value: 9, label: "ปริญญาโท" },
    { value: 10, label: "RequirementDiag" },
    { value: 11, label: "หัวหน้าผู้ช่วยทันตแพทย์" },
    { value: 12, label: "ผู้ช่วยทันตแพทย์" },
  ];
  const [clinicFilter, setClinicFilter] = useState<string>("0");
  const clinincOptions = [
    { value: "0", label: "ทั้งหมด" },
    { value: "1", label: "Occlusion" },
    { value: "2", label: "Oral Health Promotion" },
    { value: "3", label: "Periodontic" },
    { value: "4", label: "Operative" },
    { value: "5", label: "Endodontic" },
    { value: "6", label: "Prosthodontic" },
    { value: "7", label: "Oral Surgery" },
    { value: "8", label: "Oral Diagnosis" },
    { value: "9", label: "Orthodontic" },
    { value: "10", label: "Pedodontic" },
    { value: "11", label: "บริการในเวลาราชการ" },
    { value: "12", label: "Oral Radiology" },
    { value: "13", label: "คลินิกพิเศษ" },
    { value: "14", label: "บัณฑิตศึกษา" },
    { value: "15", label: "รากเทียม" },
  ];

  const roleNameMap: { [key: number]: string } = {};
  roleOptions.forEach((option) => {
    roleNameMap[option.value] = option.label;
  });

  const clinicNameMap: { [key: string]: string } = {};
  clinincOptions.forEach((option) => {
    clinicNameMap[option.value] = option.label;
  });

  const pagination = getPagination(page, pageCount);

  const handleModal = (userId: number | null = null) => {
    setSelectedId(userId);
    setVerifyOn(!verifyOn);
  };

  // แก้ไขฟังก์ชัน handleEdit ให้รับ staff data
  const handleEdit = (userId: number | null = null) => {
    setSelectedStaff(userId);
    setIsEditMode(true);
  };

  // ฟังก์ชันสำหรับปิด edit modal
  const handleCloseEdit = () => {
    setIsEditMode(false);
    setSelectedStaff(null);
  };

  // ฟังก์ชันสำหรับ refresh หลังจาก edit
  const handleAfterEdit = () => {
    staffFetch();
    handleCloseEdit();
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pageCount) {
      setPage(newPage);
    }
  };

  const handleRemoveStaff = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.delete(
        `https://localhost:7017/api/tbdentalrecorduser/${selectedId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        setVerifyOn(false);
        setModalOn(true);
        setSelectedId(null);

        // ตรวจสอบว่าหลังจากลบแล้ว หน้าปัจจุบันยังมีข้อมูลหรือไม่
        const remainingItems = total - 1;
        const maxPageAfterDelete = Math.ceil(remainingItems / limit);

        // ถ้าหน้าปัจจุบันมากกว่าหน้าสูงสุดที่จะเหลือ และไม่ใช่หน้าแรก
        if (page > maxPageAfterDelete && page > 1) {
          setPage(maxPageAfterDelete || 1);
        } else {
          // รีเฟรชข้อมูลในหน้าปัจจุบัน
          staffFetch();
        }

        setTimeout(() => {
          setModalOn(false);
          onClose();
        }, 1000);
      }
    } catch (e: any) {
      let errorMessage = e.response?.data?.message;
      setError(errorMessage);
      console.error(errorMessage);

      setVerifyOn(false);
      setModalOn(true);

      setTimeout(() => {
        setError("");
        setModalOn(false);
      }, 1000);
    }
  };

  const staffFetch = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      if (keyword) {
        queryParams.append("keyword", keyword);
      }
      if (roleFilter !== 0) {
        // Add roleFilter to queryParams
        queryParams.append("roleId", roleFilter.toString());
      }
      if (clinicFilter !== "0") {
        // Add clinicFilter to queryParams
        queryParams.append("clinicId", clinicFilter);
      }

      const response = await axios.get(
        `https://localhost:7017/api/tbdentalrecorduser?${queryParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(response);
      // console.log(response?.data);

      setStaffs(response?.data?.data ?? []); // เข้าถึง response.data.users
      setTotal(response?.data?.total ?? 0); // เข้าถึง response.data.total
      setPageCount(response?.data?.pageCount ?? 1); // เข้าถึง response.data.pageCount
    } catch (e: any) {
      let errorMessage = e.response?.data?.message;
      console.error(errorMessage);
    }
  };

  useEffect(() => {
    staffFetch();
  }, [page, limit, keyword, roleFilter, clinicFilter]);

  // เพิ่ม useEffect สำหรับรีเฟรชเมื่อมี refreshTrigger
  useEffect(() => {
    if (refreshTrigger) {
      staffFetch();
    }
  }, [refreshTrigger]);

  return (
    <>
      <Flex direction="column" className="gap-4 lg:flex-row">
        <Flex
          alignItems="center"
          className="p-2 border-[3px] border-[#A861D4] rounded-[8px] w-full"
        >
          <SearchIcon />
          <Input
            name="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="ชื่อ, นามสกุล"
            className="border-none focus:outline-none focus-visible:ring-0 shadow-none"
          />
        </Flex>
        <Flex
          alignItems="center"
          className="p-2 border-[3px] border-[#A861D4] rounded-[8px] w-full"
        >
          <Select onValueChange={(e) => setRoleFilter(Number(e))}>
            <SelectTrigger className="border-none w-full p-4 shadow-none focus-visible:ring-0">
              <SelectValue placeholder="กรองด้วยบทบาท" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>บทบาท</SelectLabel>
                {roleOptions.map((option, index) => (
                  <SelectItem key={index} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Flex>
        <Flex
          alignItems="center"
          className="p-2 border-[3px] border-[#A861D4] rounded-[8px] w-full"
        >
          <Select onValueChange={setClinicFilter}>
            <SelectTrigger className="border-none w-full p-4 shadow-none focus-visible:ring-0">
              <SelectValue placeholder="กรองด้วยคลินิก" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>คลินิก</SelectLabel>
                {clinincOptions.map((option, index) => (
                  <SelectItem key={index} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Flex>
      </Flex>

      {/**Table */}
      <div className="border-[3px] border-[#A861D4] rounded-2xl overflow-hidden">
        <ScrollArea className="h-full">
          <ScrollBar orientation="horizontal" />
          <Table>
            {/* Sticky Header */}
            <TableHeader className="bg-[#A861D4] sticky top-0 z-10">
              <TableRow className="hover:bg-transparent">
                <TableHead className="p-4 min-w-[120px]">
                  <Text className="text-white text-[18px]" semibold>
                    userId
                  </Text>
                </TableHead>
                <TableHead className="p-4 min-w-[200px]">
                  <Text className="text-white text-[18px]" semibold>
                    ชื่อ - นามสกุล
                  </Text>
                </TableHead>
                <TableHead className="p-4 text-center min-w-[180px]">
                  <Text className="text-white text-[18px]" semibold>
                    เลขใบประกอบวิชาชีพ
                  </Text>
                </TableHead>
                <TableHead className="p-4 min-w-[150px]">
                  <Text className="text-white text-[18px]" semibold>
                    บทบาท
                  </Text>
                </TableHead>
                <TableHead className="p-4 text-center min-w-[150px]">
                  <Text className="text-white text-[18px]" semibold>
                    คลินิก
                  </Text>
                </TableHead>
                <TableHead className="p-4 min-w-[120px]">
                  <Text> </Text>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staffs.map((staff, index) => (
                <TableRow key={index}>
                  <TableCell className="p-4">
                    <Text semibold>{staff.userId}</Text>
                  </TableCell>
                  <TableCell className="p-4">
                    <Text>
                      {staff.tname}
                      {staff.fname} {staff.lname}
                    </Text>
                  </TableCell>
                  <TableCell className="p-4 text-center">
                    <Text>{staff.license || "-"}</Text>
                  </TableCell>
                  <TableCell className="p-4">
                    <Text>
                      {staff.roleID !== undefined
                        ? roleNameMap[staff.roleID] || "ไม่ระบุ"
                        : "ไม่ระบุ"}
                    </Text>
                  </TableCell>
                  <TableCell className="p-4 text-center">
                    <Text>
                      {staff.clinicid !== undefined
                        ? clinicNameMap[staff.clinicid] || "-"
                        : "-"}
                    </Text>
                  </TableCell>
                  <TableCell className="p-4">
                    <Flex justifyContent="center" className="gap-2">
                      <Button
                        className="bg-[#DEA344] hover:bg-[#DEA344]/70"
                        onClick={() => handleEdit(staff.userId)}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        variant={"destructive"}
                        onClick={() => handleModal(staff.userId)}
                      >
                        <DeleteIcon />
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

      {/* Show pagination info */}
      <Flex justifyContent="center" className="mt-2">
        <Text className="text-sm text-gray-600">
          แสดง {(page - 1) * limit + 1} - {Math.min(page * limit, total)} จาก{" "}
          {total} รายการ
        </Text>
      </Flex>

      {isEditMode && selectedStaff && (
        <Addstaff
          onClose={handleCloseEdit}
          onUserAdded={handleAfterEdit}
          onEdit={true}
          userId={selectedStaff}
        />
      )}

      {verifyOn == true && (
        <VerifyModal
          message="ยืนยันการลบข้อมูล"
          onCancel={() => handleModal()}
          onVerify={handleRemoveStaff}
        />
      )}

      {modalOn && !error && (
        <SuccessModal message="ลบข้อมูลเจ้าหน้าที่สำเร็จ" isVisible={modalOn} />
      )}
      {modalOn && !!error && <ErrorModal message={error} isVisible={modalOn} />}
    </>
  );
}

export default Stafftable;

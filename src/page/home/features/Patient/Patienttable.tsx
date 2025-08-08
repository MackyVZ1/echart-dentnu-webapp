/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import Flex from "@/components/Flex";
import Text from "@/components/Text";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ReferIcon } from "@/assets/svg";
import { useNavigate } from "react-router-dom";
import { ErrorModal, SuccessModal, VerifyModal } from "@/components/Modal";
import { Info, SquareXIcon, X } from "lucide-react";
import Referpatient from "./Referpatient";
import { API_BASE_URL } from "@/page/login/LoginCard";
import { getPagination } from "../StaffManagement/Stafftable";
import Screeningform from "./Screeningform";
import Infectedform from "./Infectedform";
import { useForm } from "react-hook-form";
import type { PatientFormData } from "./Patientform";
import { Form } from "@/components/ui/form";
import dayjs from "@/lib/dayjs";
import Loading from "@/components/Loading";

type Patient = {
  dn: string | null;
  idNo: string | null;
  nameTh: string | null;
  surnameTh: string | null;
  titleTh: string | null;
};

interface Props {
  keyword?: string;
}

function Patienttable({ keyword }: Props) {
  const roleName = sessionStorage.getItem("roleName");
  const [patients, setPatient] = useState<Patient[]>([]);

  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10); // กำหนด limit (สามารถทำให้ปรับได้ในอนาคต)
  const [total, setTotal] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(1);

  const pagination = getPagination(page, pageCount);

  const nav = useNavigate();

  const [verifyScreeningOn, setVerifyScreeningOn] = useState<boolean>(false);
  const [verifyDeleteOn, setVerifyDeleteOn] = useState<boolean>(false);
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [selectedDN, setSelectedDN] = useState<string | null>("");
  const [selectPatient, setSelectpatient] = useState({
    dn: "",
    titleTh: "",
    nameTh: "",
    surnameTh: "",
  });

  const formScreening = useForm<PatientFormData>({
    defaultValues: {
      sys: "",
      dia: "",
      temperature: "",
      pr: "",
      urgentLevel: "2",
      patientType: "Normal",
    },
  });

  const [screeningOn, setScreeningOn] = useState<boolean>(false);
  const [referClinicOn, setreferClinicOn] = useState<boolean>(false);
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const handleScreeningOn = () => {
    setScreeningOn(!screeningOn);
  };

  const handleScreeningModal = async () => {
    const isValid = await formScreening.trigger();

    if (isValid) {
      setVerifyScreeningOn(!verifyScreeningOn);
    } else {
      console.log("Form errors:", formScreening.formState.errors);
    }
  };

  const handleAddScreening = async () => {
    setVerifyScreeningOn(false);
    const formData = formScreening.getValues();
    // setPatient({
    //   dn: formData.dn,
    //   titleTh: formData.thPrefix,
    //   nameTh: formData.thName,
    //   surnameTh: formData.thSurname,
    // });
    if (formData.patientType == "Aware") {
      setError(
        "ไม่สามารถเพิ่มคนไข้ได้เนื่องจากมีความเสี่ยงต่อการแพร่กระจายเชื้อ"
      );

      setModalOn(true);

      return setTimeout(() => {
        setModalOn(false);
      }, 2000);
    }

    try {
      const token = sessionStorage.getItem("token");
      // const userId = sessionStorage.getItem("userId");

      if (!token) console.error("Token not found");

      const now = dayjs().toISOString();
      // const regDate = dayjs().format("DD/MM/BBBB");
      // const rDate = dayjs().format("YYYY-MM-DD");
      // const bDate = dayjs(formData.birthdate).format("YYYY-MM-DD");
      // const birthDate = dayjs(formData.birthdate).format("DD/MM/BBBB");

      const response = await axios.post(
        `${API_BASE_URL}/api/screeningrecord`,
        {
          dn: formData.dn,
          sys: Number(formData.sys),
          dia: Number(formData.dia),
          pr: Number(formData.pr),
          temperature: Number(formData.temperature),
          treatmentUrgency: Number(formData.urgentLevel),
          bloodpressure:
            formData.healthConditions.highBP == false
              ? null
              : formData.healthConditions.highBP,
          diabete:
            formData.healthConditions.diabetes == false
              ? null
              : formData.healthConditions.diabetes,
          heartdisease:
            formData.healthConditions.heart == false
              ? null
              : formData.healthConditions.heart,
          thyroid:
            formData.healthConditions.thyroid == false
              ? null
              : formData.healthConditions.thyroid,
          stroke:
            formData.healthConditions.stroke == false
              ? null
              : formData.healthConditions.stroke,
          immunodeficiency:
            formData.healthConditions.immuno == false
              ? null
              : formData.healthConditions.immuno,
          pregnant:
            formData.healthConditions.pregnantWeeks == ""
              ? null
              : formData.healthConditions.pregnantWeeks,
          other:
            formData.healthConditions.other == ""
              ? null
              : formData.healthConditions.other,
          drugName:
            formData.healthConditions.drug == false
              ? null
              : formData.healthConditions.drugName,
          drugDesc:
            formData.healthConditions.drug == false
              ? null
              : formData.healthConditions.drugDesc,
          createdAt: now,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        // console.log("Patient added successfully");
        //form.reset();
        setError("");
        setSuccessMessage("เพิ่มข้อมูลคนไข้สำเร็จ");
        setModalOn(true);

        setTimeout(() => {
          setModalOn(false);
        }, 1000);

        setTimeout(() => {
          setreferClinicOn(true);
        }, 1000);
      }
    } catch (e: any) {
      let errorMessage = e.response?.data;
      let errorStatus = e.response?.status;
      // console.error(errorMessage);
      // console.error(errorStatus);
      if (errorStatus == 400) {
        if (errorMessage == "Tpatient data cannot be null") {
          setError("ข้อมูลคนไข้ไม่สามารถว่างเปล่าได้");
        } else if (errorMessage == "dn cannot be null") {
          setError("กรุณากรอก DN");
        } else if (errorMessage == "titleEn cannot be null") {
          setError("กรุณากรอกคำนำหน้าภาษาอังกฤษ");
        } else if (errorMessage == "nameEn cannot be null") {
          setError("กรุณากรอกชื่อภาษาอังกฤษ");
        } else if (errorMessage == "surnameEn cannot be null") {
          setError("กรุณากรอกนามสกุลภาษาอังกฤษ");
        } else if (errorMessage == "sex cannot be null") {
          setError("กรุณาระบุเพศกำเนิด");
        } else if (errorMessage == "maritalStatus cannot be null") {
          setError("กรุณาระบุสถานภาพ");
        } else if (errorMessage == "idNo cannot be null") {
          setError("กรุณากรอกเลขบัตรประชำตัวประชาชนหรือ Passport No.");
        } else if (errorMessage == "age cannot be null") {
          setError("กรุณาระบุอายุ");
        } else if (errorMessage == "occupation cannot be null") {
          setError("กรุณาระบุอาชีพ");
        } else if (errorMessage == "phoneOffice cannot be null") {
          setError("กรุณากรอกเบอร์ติดต่อที่ทำงาน");
        } else if (errorMessage == "emerNotify cannot be null") {
          setError("กรุณากรอกข้อมูลผู้ต่อติดกรณีฉุกเฉิน");
        } else if (errorMessage == "emerAddress cannot be null") {
          setError("กรุณากรอกที่อยู่ติดต่อกรณีฉุกเฉิน");
        } else if (errorMessage == "parent cannot be null") {
          setError("กรุณากรอกความเกี่ยวข้อง");
        } else if (errorMessage == "parentPhone cannot be null") {
          setError("กรุณากรอกเบอร์ติดต่อกรณีฉุกเฉิน");
        } else if (errorMessage == "physician cannot be null") {
          setError("กรุณากรอกชื่อแพทย์ประจำตัว");
        } else if (errorMessage == "physicianOffice cannot be null") {
          setError("กรุณากรอกเบอร์ติดต่อที่ทำงานแพทย์ประจำตัว");
        } else if (errorMessage == "physicianPhone cannot be null") {
          setError("กรุณากรอกเบอร์ติดต่อแพทย์ประจำตัว");
        } else if (errorMessage == "otherAddress cannot be null") {
          setError("กรูณากรอกที่อยู่อื่นๆ");
        }
      } else if (errorStatus == 401) {
        setError("ไม่ได้รับอนุญาตให้ใช้งาน");
      } else if (errorStatus == 403) {
        setError("ไม่มีสิทธิ์ในการเข้าใช้ฟีเจอร์นี้");
      } else {
        setError(`เซิร์ฟเวอร์ขัดข้อง: ${errorMessage}`);
      }

      setModalOn(true);

      setTimeout(() => {
        setError("");
        setModalOn(false);
      }, 1000);
    }
  };

  // const handleReferOn = (
  //   dn?: string | null,
  //   title?: string,
  //   name?: string,
  //   surname?: string
  // ) => {
  //   if (!dn) {
  //     // ถ้าไม่มี parameter ให้ toggle referOn เฉยๆ (สำหรับปิด modal)
  //     setScreeningOn(!screeningOn);
  //     return;
  //   }

  //   // ถ้ามี parameter ให้ set ข้อมูลและเปิด modal
  //   setSelectpatient({
  //     dn: dn,
  //     titleTh: title || "",
  //     nameTh: name || "",
  //     surnameTh: surname || "",
  //   });
  //   setScreeningOn(true);
  // };

  const handleModal = (dn: string | null = null) => {
    setSelectedDN(dn);
    setVerifyDeleteOn(!verifyDeleteOn);
  };

  const handlePatientInfo = (dn: string | null) => {
    if (dn) nav(`/home/patient/${dn}`);
  };

  const handlePatientDelete = async () => {
    setVerifyDeleteOn(false);
    setDeleteLoading(true);
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
        setSuccessMessage("ลบคนไข้สำเร็จ");
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

      setModalOn(true);

      setTimeout(() => {
        setError("");
        setModalOn(false);
      }, 1000);
    } finally {
      setDeleteLoading(false);
    }
  };

  const patientFetch = async () => {
    try {
      setError("");

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

      setPatient(response.data.data ?? []);
      setTotal(response?.data?.total ?? 0);
      setPageCount(response?.data?.pageCount ?? 1);
    } catch (e: any) {
      let errorMessage = e.response?.data?.message;
      let errorStatus = e.response?.status;

      //console.error(errorStatus);
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
        setError("ไม่พบข้อมูลคนไข้");
      } else {
        setError(`เซิร์ฟเวอร์ขัดข้อง: ${errorMessage}`);
        setModalOn(true);

        return setTimeout(() => {
          setModalOn(false);
          setError("");
        }, 2000);
      }
    } finally {
      setFetchLoading(false);
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
    setFetchLoading(true);
    patientFetch();
  }, [page, limit, keyword]);
  return (
    <>
      {/**Table */}
      <div className="border-[3px] border-[#4B006E] rounded-2xl overflow-hidden w-full h-full">
        <ScrollArea className="h-full">
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
              {patients.map((patient) => (
                <TableRow key={patient.dn}>
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
                        onClick={
                          handleScreeningOn
                          // () =>
                          // handleReferOn(
                          //   patient.dn,
                          //   patient.titleTh || "",
                          //   patient.nameTh || "",
                          //   patient.surnameTh || ""
                          // )
                        }
                      >
                        <ReferIcon />
                      </Button>
                      <Button onClick={() => handlePatientInfo(patient.dn)}>
                        <Info />
                      </Button>
                      {roleName === "Administrator" && (
                        <Button
                          variant={"destructive"}
                          onClick={() => handleModal(patient.dn)}
                        >
                          <SquareXIcon />
                        </Button>
                      )}
                    </Flex>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
      <Flex
        direction="column"
        className="gap-2 "
        justifyContent="center"
        alignItems="center"
      >
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

        <Flex justifyContent="center">
          {error === "ไม่พบข้อมูลคนไข้" ? (
            <Text bold className="text-md text-red-500">
              {error}
            </Text>
          ) : (
            <Text className="text-sm text-gray-600">
              แสดง {(page - 1) * limit + 1} - {Math.min(page * limit, total)}{" "}
              จาก {total} รายการ
            </Text>
          )}
        </Flex>
      </Flex>
      {screeningOn == true && (
        // <Referpatient
        //   onClose={() => handleReferOn()}
        //   patientData={selectPatient}
        // />
        <Flex
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transform transition-all duration-300  p-6 lg:p-12 xl:p-36"
          justifyContent="center"
          alignItems="center"
        >
          <Flex
            className="p-6 bg-white w-full gap-6 rounded-[16px] max-lg:max-h-full max-lg:overflow-y-auto max-lg:my-auto"
            direction="column"
          >
            <Flex
              justifyContent="end"
              className="hover:cursor-pointer"
              onClick={handleScreeningOn}
            >
              <X color="grey" />
            </Flex>
            <Flex justifyContent="center">
              <Text semibold className="text-black text-[18px] lg:text-[24px]">
                {"คัดกรองเบื้องต้น"}
              </Text>
            </Flex>
            <Form {...formScreening}>
              <form onSubmit={formScreening.handleSubmit(handleScreeningModal)}>
                <ScrollArea className="h-[calc(100vh-300px)] px-6">
                  <Flex direction="column" className="gap-4">
                    <Screeningform form={formScreening} />
                    <Infectedform form={formScreening} />
                  </Flex>
                </ScrollArea>
              </form>
            </Form>
          </Flex>
        </Flex>
      )}

      {deleteLoading && <Loading isOpen message="กำลังลบคนไข้" />}

      {fetchLoading && <Loading isOpen message="กำลังโหลดคนไข้" />}

      {verifyScreeningOn && (
        <VerifyModal
          message="ยืนยันการคัดกรอง"
          onCancel={() => setVerifyScreeningOn(false)}
          onVerify={handleAddScreening}
        />
      )}

      {verifyDeleteOn && (
        <VerifyModal
          message="ยืนยันการลบข้อมูล"
          onCancel={() => setVerifyDeleteOn(false)}
          onVerify={handlePatientDelete}
        />
      )}

      {modalOn && !error && (
        <SuccessModal message={successMessage} isVisible={modalOn} />
      )}
      {modalOn && !!error && <ErrorModal message={error} isVisible={modalOn} />}
    </>
  );
}

export default Patienttable;

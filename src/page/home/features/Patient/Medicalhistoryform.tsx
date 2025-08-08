import { useState } from "react";
import Flex from "@/components/Flex";
import Text from "@/components/Text";
import { ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

function Medicalhistoryform() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [allCheck, setAllCheck] = useState<boolean[]>(Array(2).fill(false));

  // ข้อมูลคัดกรอง
  const [allegies, setAllegies] = useState<boolean[]>(Array(2).fill(false));
  const [allegiesDesc, setAllegiesDesc] = useState<string>("");
  const [currentMedication, setCurrentMedication] = useState<boolean[]>(
    Array(2).fill(false)
  );
  const [currentMedicationDesc, setCurrentMedicationDesc] =
    useState<string>("");
  const [stroke, setStroke] = useState<boolean[]>(Array(2).fill(false));
  const [strokeDesc, setStrokeDesc] = useState<string>("");
  const [epilepsy, setEpilepsy] = useState<boolean[]>(Array(2).fill(false));
  const [epilepsyDesc, setEpilepsyDesc] = useState<string>("");
  const [headNeck, setHeadneck] = useState<boolean[]>(Array(2).fill(false));
  const [headNeckDesc, setHeadneckDesc] = useState<string>("");
  const [thyroid, setThyroid] = useState<boolean[]>(Array(2).fill(false));
  const [thyroidDesc, setThyroidDesc] = useState<string>("");
  const [lung, setLung] = useState<boolean[]>(Array(2).fill(false));
  const [lungDesc, setLungDesc] = useState<string>("");
  const [heart, setHeart] = useState<boolean[]>(Array(2).fill(false));
  const [heartDesc, setHeartDesc] = useState<string>("");
  const [hypotension, setHypotension] = useState<boolean[]>(
    Array(2).fill(false)
  );
  const [hypotensionDesc, setHypotensionDesc] = useState<string>("");
  const [hypertension, setHypertension] = useState<boolean[]>(
    Array(2).fill(false)
  );
  const [hypertensionDesc, setHypertensionDesc] = useState<string>("");
  const [bloodDycrasia, setBloodDycrasia] = useState<boolean[]>(
    Array(2).fill(false)
  );
  const [bloodDycrasiaDesc, setBloodDycrasiaDesc] = useState<string>("");
  const [diabete, setDiabete] = useState<boolean[]>(Array(2).fill(false));
  const [diabeteDesc, setDiabeteDesc] = useState<string>("");
  const [liver, setLiver] = useState<boolean[]>(Array(2).fill(false));
  const [liverDesc, setLiverDesc] = useState<string>("");
  const [kidney, setKidney] = useState<boolean[]>(Array(2).fill(false));
  const [kidneyDesc, setKidneyDesc] = useState<string>("");
  const [pregnant, setPregnant] = useState<boolean[]>(Array(2).fill(false));
  const [pregnantDesc, setPregnantDesc] = useState<string>("");
  const [contagious, setContagious] = useState<boolean[]>(Array(2).fill(false));
  const [contagiousDesc, setContagiousDesc] = useState<string>("");
  const [prosthetic, setProsthetic] = useState<boolean[]>(Array(2).fill(false));
  const [prostheticDesc, setProstheticDesc] = useState<string>("");
  const [hospitalization, setHospitailization] = useState<boolean[]>(
    Array(2).fill(false)
  );
  const [hospitalizationDesc, setHospitailizationDesc] = useState<string>("");
  const [pastTreatment, setPastTreatment] = useState<boolean[]>(
    Array(2).fill(false)
  );
  const [pastTreatmentDesc, setPastTreatmentDesc] = useState<string>("");
  const [otherFinding, setOtherFinding] = useState<boolean[]>(
    Array(2).fill(false)
  );
  const [otherFindingDesc, setOtherFindingDesc] = useState<string>("");
  const [smoking, setSmoking] = useState<boolean[]>(Array(2).fill(false));
  const [clenching, setClenching] = useState<boolean[]>(Array(2).fill(false));
  const [toothBrush, setToothBrush] = useState<boolean[]>(Array(2).fill(false));
  const [drinking, setDrinking] = useState<boolean[]>(Array(2).fill(false));
  const [bruxism, setBruxism] = useState<boolean[]>(Array(2).fill(false));
  const [flossing, setFlossing] = useState<boolean[]>(Array(2).fill(false));
  const [others, setOthers] = useState<string>("");

  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Flex
      direction="column"
      justifyContent="between"
      className={`shadow-lg border border-black/5 rounded-[16px] p-4 transform transition-all duration-200`}
    >
      <Flex alignItems="center" justifyContent="between">
        <Text bold className="lg:text-[20px]">
          Medical & Dental History
        </Text>
        <ChevronDown
          width={36}
          height={36}
          color="#4B006E"
          className={`transition-all transform cursor-pointer ${
            collapsed ? "rotate-180" : ""
          }`}
          onClick={handleCollapsed}
        />
      </Flex>

      {collapsed && (
        <Flex direction="column" className="w-full">
          <Text>
            In Case a patient doesn't know if he/she has the following
            conditions, also mark 'No'.
          </Text>
          <Flex className="h-full gap-[24px] pt-6">
            <Flex direction="column" className="w-full">
              <Flex alignItems="center" className="gap-[6px]">
                <Checkbox
                  className="cursor-pointer"
                  checked={allCheck[0]}
                  onCheckedChange={(value) => {
                    if (value) {
                      // ติ๊ก "ไม่ ทั้งหมด" - ให้ทุกอันเป็น "ไม่"
                      setAllCheck([true, false]);
                      setAllegies([true, false]);
                      setCurrentMedication([true, false]);
                      setStroke([true, false]);
                      setEpilepsy([true, false]);
                      setHeadneck([true, false]);
                      setThyroid([true, false]);
                      setLung([true, false]);
                      setHeart([true, false]);
                      setHypotension([true, false]);
                      setHypertension([true, false]);
                      setBloodDycrasia([true, false]);
                      setDiabete([true, false]);
                      setLiver([true, false]);
                      setKidney([true, false]);
                      setPregnant([true, false]);
                      setContagious([true, false]);
                      setProsthetic([true, false]);
                      setHospitailization([true, false]);
                      setPastTreatment([true, false]);
                      setOtherFinding([true, false]);
                      // เคลียร์ descriptions
                      setAllegiesDesc("");
                      setCurrentMedicationDesc("");
                      setStrokeDesc("");
                      setEpilepsyDesc("");
                      setHeadneckDesc("");
                      setThyroidDesc("");
                      setLungDesc("");
                      setHeartDesc("");
                      setHypotensionDesc("");
                      setHypertensionDesc("");
                      setBloodDycrasiaDesc("");
                      setDiabeteDesc("");
                      setLiverDesc("");
                      setKidneyDesc("");
                      setPregnantDesc("");
                      setContagiousDesc("");
                      setProstheticDesc("");
                      setHospitailizationDesc("");
                      setPastTreatmentDesc("");
                      setOtherFindingDesc("");
                    } else {
                      // ยกเลิกติ๊ก "ไม่ ทั้งหมด"
                      setAllCheck([false, false]);
                    }
                  }}
                />
                <Text>"ไม่" ทั้งหมด</Text>
              </Flex>
              <Flex alignItems="center" className="gap-[6px]">
                <Checkbox
                  className="cursor-pointer"
                  checked={allCheck[1]}
                  onCheckedChange={(value) => {
                    if (value) {
                      // ติ๊ก "ใช่ ทั้งหมด" - ให้ทุกอันเป็น "ใช่"
                      setAllCheck([false, true]);
                      setAllegies([false, true]);
                      setCurrentMedication([false, true]);
                      setStroke([false, true]);
                    } else {
                      // ยกเลิกติ๊ก "ใช่ ทั้งหมด"
                      setAllCheck([false, false]);
                    }
                  }}
                />
                <Text>"ใช่" ทั้งหมด</Text>
              </Flex>
              <Flex direction="column" className="pt-6 gap-[24px] w-full">
                <Flex
                  direction="column"
                  className="max-md:gap-[16px] md:grid md:grid-cols-2 md:items-center"
                >
                  <Text>1.Allergies</Text>
                  <Flex direction="column">
                    <Flex className="gap-[6px]">
                      <Checkbox
                        checked={allegies[0]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setAllegies([true, false]);
                            setAllegiesDesc("");
                          } else {
                            setAllegies([false, false]);
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ไม่</Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={allegies[1]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setAllegies([false, true]);
                          } else {
                            setAllegies([false, false]);
                            setAllegiesDesc("");
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ใช่</Text>

                      <Input
                        disabled={!allegies[1]}
                        name="allegies"
                        value={allegiesDesc}
                        onChange={(e) => setAllegiesDesc(e.target.value)}
                        className="h-8 w-full flex-1"
                      />
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  direction="column"
                  className="max-md:gap-[16px] md:grid md:grid-cols-2 md:items-center"
                >
                  <Text>2.Current medication</Text>
                  <Flex direction="column">
                    <Flex className="gap-[6px]">
                      <Checkbox
                        checked={currentMedication[0]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setCurrentMedication([true, false]);
                            setCurrentMedicationDesc("");
                          } else {
                            setCurrentMedication([false, false]);
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ไม่</Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={currentMedication[1]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setCurrentMedication([false, true]);
                          } else {
                            setCurrentMedication([false, false]);
                            setCurrentMedicationDesc("");
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ใช่</Text>

                      <Input
                        disabled={!currentMedication[1]}
                        name="currentMedication"
                        value={currentMedicationDesc}
                        onChange={(e) =>
                          setCurrentMedicationDesc(e.target.value)
                        }
                        className="h-8 w-full flex-1"
                      />
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  direction="column"
                  className="max-md:gap-[16px] md:grid md:grid-cols-2 md:items-center"
                >
                  <Text>3.Stroke</Text>
                  <Flex direction="column">
                    <Flex className="gap-[6px]">
                      <Checkbox
                        checked={stroke[0]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setStroke([true, false]);
                            setStrokeDesc("");
                          } else {
                            setStroke([false, false]);
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ไม่</Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={stroke[1]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setStroke([false, true]);
                          } else {
                            setStroke([false, false]);
                            setStrokeDesc("");
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ใช่</Text>

                      <Input
                        disabled={!stroke[1]}
                        name="stroke"
                        value={strokeDesc}
                        onChange={(e) => setStrokeDesc(e.target.value)}
                        className="h-8 w-full flex-1"
                      />
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  direction="column"
                  className="max-md:gap-[16px] md:grid md:grid-cols-2 md:items-center"
                >
                  <Text>4.Epilepsy</Text>
                  <Flex direction="column">
                    <Flex className="gap-[6px]">
                      <Checkbox
                        checked={epilepsy[0]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setEpilepsy([true, false]);
                            setEpilepsyDesc("");
                          } else {
                            setEpilepsy([false, false]);
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ไม่</Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={epilepsy[1]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setEpilepsy([false, true]);
                          } else {
                            setEpilepsy([false, false]);
                            setEpilepsyDesc("");
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ใช่</Text>

                      <Input
                        disabled={!epilepsy[1]}
                        name="epilepsy"
                        value={epilepsyDesc}
                        onChange={(e) => setEpilepsyDesc(e.target.value)}
                        className="h-8 w-full flex-1"
                      />
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  direction="column"
                  className="max-md:gap-[16px] md:grid md:grid-cols-2 md:items-center"
                >
                  <Text>5.Head/Neck radiation</Text>
                  <Flex direction="column">
                    <Flex className="gap-[6px]">
                      <Checkbox
                        checked={headNeck[0]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setHeadneck([true, false]);
                            setHeadneckDesc("");
                          } else {
                            setAllegies([false, false]);
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ไม่</Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={headNeck[1]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setHeadneck([false, true]);
                          } else {
                            setHeadneck([false, false]);
                            setHeadneckDesc("");
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ใช่</Text>

                      <Input
                        disabled={!headNeck[1]}
                        name="headneck"
                        value={headNeckDesc}
                        onChange={(e) => setHeadneckDesc(e.target.value)}
                        className="h-8 w-full flex-1"
                      />
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  direction="column"
                  className="max-md:gap-[16px] md:grid md:grid-cols-2 md:items-center"
                >
                  <Text>6.Thyroid disease</Text>
                  <Flex direction="column">
                    <Flex className="gap-[6px]">
                      <Checkbox
                        checked={thyroid[0]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setThyroid([true, false]);
                            setThyroidDesc("");
                          } else {
                            setThyroid([false, false]);
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ไม่</Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={thyroid[1]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setThyroid([false, true]);
                          } else {
                            setThyroid([false, false]);
                            setThyroidDesc("");
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ใช่</Text>

                      <Input
                        disabled={!thyroid[1]}
                        name="thyroid"
                        value={thyroidDesc}
                        onChange={(e) => setThyroidDesc(e.target.value)}
                        className="h-8 w-full flex-1"
                      />
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  direction="column"
                  className="max-md:gap-[16px] md:grid md:grid-cols-2 md:items-center"
                >
                  <Text>7.Lung disease</Text>
                  <Flex direction="column">
                    <Flex className="gap-[6px]">
                      <Checkbox
                        checked={lung[0]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setLung([true, false]);
                            setLungDesc("");
                          } else {
                            setLung([false, false]);
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ไม่</Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={lung[1]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setLung([false, true]);
                          } else {
                            setLung([false, false]);
                            setLungDesc("");
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ใช่</Text>

                      <Input
                        disabled={!lung[1]}
                        name="lung"
                        value={lungDesc}
                        onChange={(e) => setLungDesc(e.target.value)}
                        className="h-8 w-full flex-1"
                      />
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  direction="column"
                  className="max-md:gap-[16px] md:grid md:grid-cols-2 md:items-center"
                >
                  <Text>8.Heart disease</Text>
                  <Flex direction="column">
                    <Flex className="gap-[6px]">
                      <Checkbox
                        checked={heart[0]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setHeart([true, false]);
                            setHeartDesc("");
                          } else {
                            setHeart([false, false]);
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ไม่</Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={heart[1]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setHeart([false, true]);
                          } else {
                            setHeart([false, false]);
                            setHeartDesc("");
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ใช่</Text>

                      <Input
                        disabled={!heart[1]}
                        name="heart"
                        value={heartDesc}
                        onChange={(e) => setHeartDesc(e.target.value)}
                        className="h-8 w-full flex-1"
                      />
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  direction="column"
                  className="max-md:gap-[16px] md:grid md:grid-cols-2 md:items-center"
                >
                  <Text>9.Hypotension</Text>
                  <Flex direction="column">
                    <Flex className="gap-[6px]">
                      <Checkbox
                        checked={hypotension[0]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setHypotension([true, false]);
                            setHypotensionDesc("");
                          } else {
                            setHypotension([false, false]);
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ไม่</Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={hypotension[1]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setHypotension([false, true]);
                          } else {
                            setHypotension([false, false]);
                            setHypotensionDesc("");
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ใช่</Text>

                      <Input
                        disabled={!hypotension[1]}
                        name="hypotension"
                        value={hypotensionDesc}
                        onChange={(e) => setHypotensionDesc(e.target.value)}
                        className="h-8 w-full flex-1"
                      />
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  direction="column"
                  className="max-md:gap-[16px] md:grid md:grid-cols-2 md:items-center"
                >
                  <Text>10.Hypertension</Text>
                  <Flex direction="column">
                    <Flex className="gap-[6px]">
                      <Checkbox
                        checked={hypertension[0]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setHypertension([true, false]);
                            setHypertensionDesc("");
                          } else {
                            setHypertension([false, false]);
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ไม่</Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={hypertension[1]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setHypertension([false, true]);
                          } else {
                            setHypertension([false, false]);
                            setHypertensionDesc("");
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ใช่</Text>

                      <Input
                        disabled={!hypertension[1]}
                        name="hypertension"
                        value={hypertensionDesc}
                        onChange={(e) => setHypertensionDesc(e.target.value)}
                        className="h-8 w-full flex-1"
                      />
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  direction="column"
                  className="max-md:gap-[16px] md:grid md:grid-cols-2 md:items-center"
                >
                  <Text>11.Blood dyscrasia</Text>
                  <Flex direction="column">
                    <Flex className="gap-[6px]">
                      <Checkbox
                        checked={bloodDycrasia[0]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setBloodDycrasia([true, false]);
                            setBloodDycrasiaDesc("");
                          } else {
                            setBloodDycrasia([false, false]);
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ไม่</Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={bloodDycrasia[1]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setBloodDycrasia([false, true]);
                          } else {
                            setBloodDycrasia([false, false]);
                            setBloodDycrasiaDesc("");
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ใช่</Text>

                      <Input
                        disabled={!bloodDycrasia[1]}
                        name="bloodDyscrasia"
                        value={bloodDycrasiaDesc}
                        onChange={(e) => setBloodDycrasiaDesc(e.target.value)}
                        className="h-8 w-full flex-1"
                      />
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  direction="column"
                  className="max-md:gap-[16px] md:grid md:grid-cols-2 md:items-center"
                >
                  <Text>12.Diabetes mellitus</Text>
                  <Flex direction="column">
                    <Flex className="gap-[6px]">
                      <Checkbox
                        checked={diabete[0]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setDiabete([true, false]);
                            setDiabeteDesc("");
                          } else {
                            setDiabete([false, false]);
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ไม่</Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={diabete[1]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setDiabete([false, true]);
                          } else {
                            setDiabete([false, false]);
                            setDiabeteDesc("");
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ใช่</Text>

                      <Input
                        disabled={!diabete[1]}
                        name="diabete"
                        value={diabeteDesc}
                        onChange={(e) => setDiabeteDesc(e.target.value)}
                        className="h-8 w-full flex-1"
                      />
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  direction="column"
                  className="max-md:gap-[16px] md:grid md:grid-cols-2 md:items-center"
                >
                  <Text>13.Liver disease</Text>
                  <Flex direction="column">
                    <Flex className="gap-[6px]">
                      <Checkbox
                        checked={liver[0]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setLiver([true, false]);
                            setLiverDesc("");
                          } else {
                            setLiver([false, false]);
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ไม่</Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={liver[1]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setLiver([false, true]);
                          } else {
                            setLiver([false, false]);
                            setLiverDesc("");
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ใช่</Text>

                      <Input
                        disabled={!liver[1]}
                        name="liver"
                        value={liverDesc}
                        onChange={(e) => setLiverDesc(e.target.value)}
                        className="h-8 w-full flex-1"
                      />
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  direction="column"
                  className="max-md:gap-[16px] md:grid md:grid-cols-2 md:items-center"
                >
                  <Text>14.Kidney disease</Text>
                  <Flex direction="column">
                    <Flex className="gap-[6px]">
                      <Checkbox
                        checked={kidney[0]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setKidney([true, false]);
                            setKidneyDesc("");
                          } else {
                            setKidney([false, false]);
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ไม่</Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={kidney[1]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setKidney([false, true]);
                          } else {
                            setKidney([false, false]);
                            setKidneyDesc("");
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ใช่</Text>

                      <Input
                        disabled={!kidney[1]}
                        name="kidney"
                        value={kidneyDesc}
                        onChange={(e) => setKidneyDesc(e.target.value)}
                        className="h-8 w-full"
                      />
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  direction="column"
                  className="max-md:gap-[16px] md:grid md:grid-cols-2 md:items-center"
                >
                  <Text>15.Pregnancy</Text>
                  <Flex direction="column">
                    <Flex className="gap-[6px]">
                      <Checkbox
                        checked={pregnant[0]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setPregnant([true, false]);
                            setPregnantDesc("");
                          } else {
                            setPregnant([false, false]);
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ไม่</Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={pregnant[1]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setPregnant([false, true]);
                          } else {
                            setPregnant([false, false]);
                            setPregnantDesc("");
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ใช่</Text>

                      <Input
                        disabled={!pregnant[1]}
                        name="pregnant"
                        value={pregnantDesc}
                        onChange={(e) => setPregnantDesc(e.target.value)}
                        className="h-8 w-full flex-1"
                      />
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  direction="column"
                  className="max-md:gap-[16px] md:grid md:grid-cols-2 md:items-center"
                >
                  <Text>16.Contagious disease</Text>
                  <Flex direction="column">
                    <Flex className="gap-[6px]">
                      <Checkbox
                        checked={contagious[0]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setContagious([true, false]);
                            setContagiousDesc("");
                          } else {
                            setContagious([false, false]);
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ไม่</Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={contagious[1]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setContagious([false, true]);
                          } else {
                            setContagious([false, false]);
                            setContagiousDesc("");
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ใช่</Text>

                      <Input
                        disabled={!contagious[1]}
                        name="contagious"
                        value={contagiousDesc}
                        onChange={(e) => setContagiousDesc(e.target.value)}
                        className="h-8 w-full flex-1"
                      />
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  direction="column"
                  className="max-md:gap-[16px] md:grid md:grid-cols-2 md:items-center"
                >
                  <Text>17.Prosthetic implants</Text>
                  <Flex direction="column">
                    <Flex className="gap-[6px]">
                      <Checkbox
                        checked={prosthetic[0]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setProsthetic([true, false]);
                            setProstheticDesc("");
                          } else {
                            setProsthetic([false, false]);
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ไม่</Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={prosthetic[1]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setProsthetic([false, true]);
                          } else {
                            setProsthetic([false, false]);
                            setProstheticDesc("");
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ใช่</Text>

                      <Input
                        disabled={!prosthetic[1]}
                        name="prosthetic"
                        value={prostheticDesc}
                        onChange={(e) => setProstheticDesc(e.target.value)}
                        className="h-8 w-full flex-1"
                      />
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  direction="column"
                  className="max-md:gap-[16px] md:grid md:grid-cols-2 md:items-center"
                >
                  <Text>18.Hospitalization</Text>
                  <Flex direction="column">
                    <Flex className="gap-[6px]">
                      <Checkbox
                        checked={hospitalization[0]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setHospitailization([true, false]);
                            setHospitailizationDesc("");
                          } else {
                            setHospitailization([false, false]);
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ไม่</Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={hospitalization[1]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setHospitailization([false, true]);
                          } else {
                            setHospitailization([false, false]);
                            setHospitailizationDesc("");
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ใช่</Text>

                      <Input
                        disabled={!hospitalization[1]}
                        name="hospitalization"
                        value={hospitalizationDesc}
                        onChange={(e) =>
                          setHospitailizationDesc(e.target.value)
                        }
                        className="h-8 w-full flex-1"
                      />
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  direction="column"
                  className="max-md:gap-[16px] md:grid md:grid-cols-2 md:items-center"
                >
                  <Text>19.Past dental treatment</Text>
                  <Flex direction="column">
                    <Flex className="gap-[6px]">
                      <Checkbox
                        checked={pastTreatment[0]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setPastTreatment([true, false]);
                            setPastTreatmentDesc("");
                          } else {
                            setPastTreatment([false, false]);
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ไม่</Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={pastTreatment[1]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setPastTreatment([false, true]);
                          } else {
                            setPastTreatment([false, false]);
                            setPastTreatmentDesc("");
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ใช่</Text>

                      <Input
                        disabled={!pastTreatment[1]}
                        name="pastTreatment"
                        value={pastTreatmentDesc}
                        onChange={(e) => setPastTreatmentDesc(e.target.value)}
                        className="h-8 w-full flex-1"
                      />
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  direction="column"
                  className="max-md:gap-[16px] md:grid md:grid-cols-2 md:items-center"
                >
                  <Text>20.Other finding</Text>
                  <Flex direction="column">
                    <Flex className="gap-[6px]">
                      <Checkbox
                        checked={otherFinding[0]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setOtherFinding([true, false]);
                            setOtherFindingDesc("");
                          } else {
                            setOtherFinding([false, false]);
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ไม่</Text>
                    </Flex>
                    <Flex alignItems="center" className="gap-[6px]">
                      <Checkbox
                        checked={otherFinding[1]}
                        onCheckedChange={(value) => {
                          if (value) {
                            setOtherFinding([false, true]);
                          } else {
                            setOtherFinding([false, false]);
                            setOtherFindingDesc("");
                          }
                          // อัพเดท allCheck
                          setAllCheck([false, false]);
                        }}
                        className="cursor-pointer"
                      />
                      <Text>ใช่</Text>

                      <Input
                        disabled={!otherFinding[1]}
                        name="otherFinding"
                        value={otherFindingDesc}
                        onChange={(e) => setOtherFindingDesc(e.target.value)}
                        className="h-8 w-full flex-1"
                      />
                    </Flex>
                  </Flex>
                </Flex>
                <Flex direction="column" className="gap-[24px]">
                  <Text bold>Personal History</Text>
                  <Flex
                    direction="column"
                    className="max-md:gap-[16px] md:flex-row md:grid md:grid-cols-3"
                  >
                    <Flex alignItems="center" className="gap-[12px]">
                      <Text>Smoking</Text>
                      <Flex direction="column" justifyContent="between">
                        <Flex className="gap-[6px]">
                          <Checkbox
                            checked={smoking[0]}
                            onCheckedChange={(value) => {
                              if (value) {
                                setSmoking([true, false]);
                              } else {
                                setSmoking([false, false]);
                              }
                            }}
                            className="cursor-pointer"
                          />
                          <Text>ไม่</Text>
                        </Flex>
                        <Flex alignItems="center" className="gap-[6px]">
                          <Checkbox
                            checked={smoking[1]}
                            onCheckedChange={(value) => {
                              if (value) {
                                setSmoking([false, true]);
                              } else {
                                setSmoking([false, false]);
                              }
                            }}
                            className="cursor-pointer"
                          />
                          <Text>ใช่</Text>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex alignItems="center" className="gap-[12px]">
                      <Text>Clenching</Text>
                      <Flex direction="column">
                        <Flex className="gap-[6px]">
                          <Checkbox
                            checked={clenching[0]}
                            onCheckedChange={(value) => {
                              if (value) {
                                setClenching([true, false]);
                              } else {
                                setClenching([false, false]);
                              }
                            }}
                            className="cursor-pointer"
                          />
                          <Text>ไม่</Text>
                        </Flex>
                        <Flex alignItems="center" className="gap-[6px]">
                          <Checkbox
                            checked={clenching[1]}
                            onCheckedChange={(value) => {
                              if (value) {
                                setClenching([false, true]);
                              } else {
                                setClenching([false, false]);
                              }
                            }}
                            className="cursor-pointer"
                          />
                          <Text>ใช่</Text>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex alignItems="center" className="gap-[12px]">
                      <Text>Tooth-brushing</Text>
                      <Flex direction="column">
                        <Flex className="gap-[6px]">
                          <Checkbox
                            checked={toothBrush[0]}
                            onCheckedChange={(value) => {
                              if (value) {
                                setToothBrush([true, false]);
                              } else {
                                setToothBrush([false, false]);
                              }
                            }}
                            className="cursor-pointer"
                          />
                          <Text>ไม่</Text>
                        </Flex>
                        <Flex alignItems="center" className="gap-[6px]">
                          <Checkbox
                            checked={toothBrush[1]}
                            onCheckedChange={(value) => {
                              if (value) {
                                setToothBrush([false, true]);
                              } else {
                                setToothBrush([false, false]);
                              }
                            }}
                            className="cursor-pointer"
                          />
                          <Text>ใช่</Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex
                    direction="column"
                    className="max-md:gap-[16px] md:flex-row md:grid md:grid-cols-3"
                  >
                    <Flex alignItems="center" className="gap-[12px]">
                      <Text>Drinking</Text>
                      <Flex direction="column">
                        <Flex className="gap-[6px]">
                          <Checkbox
                            checked={drinking[0]}
                            onCheckedChange={(value) => {
                              if (value) {
                                setDrinking([true, false]);
                              } else {
                                setDrinking([false, false]);
                              }
                            }}
                            className="cursor-pointer"
                          />
                          <Text>ไม่</Text>
                        </Flex>
                        <Flex alignItems="center" className="gap-[6px]">
                          <Checkbox
                            checked={drinking[1]}
                            onCheckedChange={(value) => {
                              if (value) {
                                setDrinking([false, true]);
                              } else {
                                setDrinking([false, false]);
                              }
                            }}
                            className="cursor-pointer"
                          />
                          <Text>ใช่</Text>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex alignItems="center" className="gap-[12px]">
                      <Text>Bruxism</Text>
                      <Flex direction="column">
                        <Flex className="gap-[6px]">
                          <Checkbox
                            checked={bruxism[0]}
                            onCheckedChange={(value) => {
                              if (value) {
                                setBruxism([true, false]);
                              } else {
                                setBruxism([false, false]);
                              }
                            }}
                            className="cursor-pointer"
                          />
                          <Text>ไม่</Text>
                        </Flex>
                        <Flex alignItems="center" className="gap-[6px]">
                          <Checkbox
                            checked={bruxism[1]}
                            onCheckedChange={(value) => {
                              if (value) {
                                setBruxism([false, true]);
                              } else {
                                setBruxism([false, false]);
                              }
                            }}
                            className="cursor-pointer"
                          />
                          <Text>ใช่</Text>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex alignItems="center" className="gap-[12px]">
                      <Text>Flossing</Text>
                      <Flex direction="column">
                        <Flex className="gap-[6px]">
                          <Checkbox
                            checked={flossing[0]}
                            onCheckedChange={(value) => {
                              if (value) {
                                setFlossing([true, false]);
                              } else {
                                setFlossing([false, false]);
                              }
                            }}
                            className="cursor-pointer"
                          />
                          <Text>ไม่</Text>
                        </Flex>
                        <Flex alignItems="center" className="gap-[6px]">
                          <Checkbox
                            checked={flossing[1]}
                            onCheckedChange={(value) => {
                              if (value) {
                                setFlossing([false, true]);
                              } else {
                                setFlossing([false, false]);
                              }
                            }}
                            className="cursor-pointer"
                          />
                          <Text>ใช่</Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex alignItems="center" className="gap-[12px]">
                    <Text>Other(s)</Text>
                    <Input
                      name="other"
                      value={others}
                      onChange={(e) => setOthers(e.target.value)}
                      className="h-8"
                    />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

export default Medicalhistoryform;

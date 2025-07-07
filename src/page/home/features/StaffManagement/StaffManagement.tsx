import { useState } from "react";
import { AddIcon } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import Flex from "@/components/Flex";
import Text from "@/components/Text";
import Stafftable from "./Stafftable";
import Addstaff from "./Addstaff";

function StaffManagement() {
  const [isClick, setIsClick] = useState<boolean>(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUserAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleAddButton = () => {
    setIsClick(true);
  };

  const handleCloseAddStaff = () => {
    setIsClick(false);
  };

  return (
    <>
      <Flex className="w-full  gap-[16px]" direction="column">
        <Flex justifyContent="end" className="gap-[12px]">
          <Button
            size={"sm"}
            className="max-lg:w-full"
            onClick={handleAddButton}
          >
            <AddIcon />
            <Text medium className="md:text-[18px] lg:text-[20px]">
              เพิ่มเจ้าหน้าที่
            </Text>
          </Button>
        </Flex>
        <Stafftable
          onClose={handleCloseAddStaff}
          refreshTrigger={refreshTrigger}
        />
      </Flex>

      {isClick == true && (
        <Addstaff onClose={handleCloseAddStaff} onUserAdded={handleUserAdded} />
      )}
    </>
  );
}

export default StaffManagement;

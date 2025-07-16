import Flex from "@/components/Flex";
import Text from "@/components/Text";
import Addstaffform from "./Addstaffform";
import { X } from "lucide-react";

interface Props {
  onClose: () => void;
  onUserAdded?: () => void;
  onEdit?: boolean;
  userId?: number | null;
}

function Addstaff({ onClose, onUserAdded, onEdit, userId }: Props) {
  return (
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
          onClick={onClose}
        >
          <X color="grey" />
        </Flex>
        <Flex justifyContent="center">
          <Text semibold className="text-black text-[18px] lg:text-[24px]">
            {onEdit ? "แก้ไขข้อมูลเจ้าหน้าที่" : "ลงทะเบียนเจ้าหน้าที่ใหม่"}
          </Text>
        </Flex>
        <Flex justifyContent="center">
          <Addstaffform
            onClose={onClose}
            onUserAdded={onUserAdded}
            onEdit={onEdit}
            user={userId}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Addstaff;

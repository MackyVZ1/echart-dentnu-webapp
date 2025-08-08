import Flex from "@/components/Flex";
import Text from "@/components/Text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image, X } from "lucide-react";
import { useState, useEffect } from "react"; // นำเข้า useState และ useEffect
// import type { UseFormReturn } from "react-hook-form";
// import type { treatmentRecordFormData } from "./Treatmentrecordform";

// interface Props {
//   form: UseFormReturn<treatmentRecordFormData>;
// }

function Teethimginput() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // useEffect สำหรับสร้างและล้าง URL ของพรีวิวรูปภาพ
  useEffect(() => {
    if (!selectedImage) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setPreviewUrl(objectUrl);

    // ล้าง object URL เมื่อ component unmount หรือเมื่อ selectedImage เปลี่ยน
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]); // เมื่อ selectedImage เปลี่ยน ให้รัน effect ใหม่

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    } else {
      setSelectedImage(null);
    }
  };

  return (
    <Flex direction="column" className="gap-4">
      <Flex>
        <Button variant={"default"} className="p-6">
          <Image color="white" />
          <Text bold className="lg:text-[18px]">
            แนบรูปภาพ
          </Text>
          <Input
            type="file"
            accept="image/*" // กำหนดให้รับเฉพาะไฟล์รูปภาพ
            onChange={handleImageChange}
            className="hidden" // เพิ่ม styling เล็กน้อย
          />
        </Button>
      </Flex>

      {previewUrl && (
        <Flex className="mt-4">
          <Button
            variant={"destructive"}
            onClick={() => setSelectedImage(null)}
          >
            <X />
          </Button>
          <img
            src={previewUrl}
            alt="Image Preview"
            className="max-w-full h-auto max-h-[300px] object-contain border rounded shadow-md"
            // สามารถปรับแต่งขนาดและสไตล์ของรูปพรีวิวได้
          />
        </Flex>
      )}
    </Flex>
  );
}

export default Teethimginput;

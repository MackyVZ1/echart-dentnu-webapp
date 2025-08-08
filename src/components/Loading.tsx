import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

interface LoadingProps {
  isOpen: boolean;
  message: string;
}

const Loading = ({ isOpen, message }: LoadingProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="justify-center px-16 py-24"
        showCloseButton={false}
      >
        <DialogHeader className="items-center gap-4">
          <Spinner variant="circle" size={84} className="text-[#4B006E]" />
          <DialogTitle className="text-[16px] lg:text-[24px]">
            {message}
          </DialogTitle>
          <DialogDescription className="text-[14px] lg:text-[18px]">
            รอสักครู่
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Loading;

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import { CopyIcon, CheckIcon } from "lucide-react";
import { toast } from "sonner";

interface ShareDialogProps {
  slug: string | null;
}

export default function ShareDialog({ slug }: ShareDialogProps) {
  const [isCopied, setIsCopied] = useState(false);
  if (!slug) return null;

  const shareUrl = `${window.location.origin}/${slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    toast.success("Đã sao chép liên kết!");
    setTimeout(() => setIsCopied(false), 2000); // reset icon sau 2s
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#b9a27f] hover:bg-[#a89370] text-white rounded-lg text-sm font-medium">
          Chia sẻ
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Chia sẻ liên kết</DialogTitle>
          <DialogDescription>
            Bất cứ ai có liên kết này đều có thể xem trang cưới của bạn.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <InputGroup>
            <InputGroupInput value={shareUrl} readOnly />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                aria-label="Sao chép"
                title="Sao chép"
                size="icon-xs"
                onClick={handleCopy}
              >
                {isCopied ? (
                  <CheckIcon className="w-4 h-4" />
                ) : (
                  <CopyIcon className="w-4 h-4" />
                )}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="secondary">Đóng</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

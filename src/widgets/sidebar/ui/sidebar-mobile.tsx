import { useState } from "react";
import { Button } from "@/shared/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/ui/sheet";
import { Menu } from "lucide-react";
import { SidebarNav } from "./sidebar-nav";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";

export const SidebarMobile = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");

  if (!isMobile) return null;

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setOpen(true)}
        className="md:hidden"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Открыть меню</span>
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-[90vw] sm:w-[400px] p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Меню</SheetTitle>
          </SheetHeader>
          <div className="p-4">
            <SidebarNav onItemClick={() => setOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

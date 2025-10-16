import { SidebarMobile } from "@/widgets/sidebar";
import { ModeToggle } from "@/features/mode-toggle";

export const Header = () => (
  <header className="absolute top-0 left-0 right-0 z-10 h-14 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
    <div className="flex h-full items-center justify-between px-4">
      <SidebarMobile />
      <div className="flex items-center gap-2 flex-shrink-0">
        <ModeToggle />
      </div>
    </div>
  </header>
);

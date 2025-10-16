import { SidebarNav } from "./sidebar-nav";

export const Sidebar = () => (
  <aside className="w-48 text-[var(--sidebar-foreground)] p-4 hidden md:block h-screen sticky pt-20">
    <div className="flex flex-col h-full justify-between">
      <nav className="flex flex-col gap-1">
        <SidebarNav />
      </nav>
      <div className="mt-4 text-xs text-muted-foreground">
        © 2025 Разработано командой воров
      </div>
    </div>
  </aside>
);

import { NavLink } from "react-router-dom";
import { Home, UserPen, Users } from "lucide-react";
import { ROUTES } from "@/shared/configs/routes";

const LINKS = [
  { to: ROUTES.HOME, label: "Главная", icon: Home },
  { to: ROUTES.PROFILE, label: "Профиль", icon: UserPen },
  { to: ROUTES.USERS, label: "Пользователи", icon: Users },
];

interface SidebarNavProps {
  onItemClick?: () => void;
}

export const SidebarNav = ({ onItemClick }: SidebarNavProps) => {
  return (
    <nav className="flex flex-col gap-1">
      {LINKS.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onItemClick}
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm ${
              isActive
                ? "bg-[var(--accent)] text-[var(--accent-foreground)] font-medium"
                : "text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)]"
            }`
          }
        >
          <Icon size={18} className="shrink-0" />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

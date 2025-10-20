import { useState } from "react";
import { Moon, Sun, LogOut } from "lucide-react";
import { useTheme } from "@/shared/configs/theme";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthService } from "@/entities/auth";
import { Button } from "@/shared/ui/button";
import { ROUTES } from "@/shared/configs/routes";
import { Loader2 } from "lucide-react";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { pathname } = useLocation();
  const isAuthPage = pathname === ROUTES.LOGIN || pathname === ROUTES.REGISTER;

  return (
    <div className="flex justify-end items-center gap-4">
      {!isAuthPage && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="dark:text-white text-black"
            disabled={isLoading}
            onClick={async () => {
              setIsLoading(true);
              try {
                await AuthService.logout();
                navigate(ROUTES.LOGIN);
              } finally {
                setIsLoading(false);
              }
            }}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="h-[1.2rem] w-[1.2rem]" />
            )}
            <span className="sr-only">Выход</span>
          </Button>
        </>
      )}
      <Button
        variant="outline"
        size="icon"
        className="dark:text-white text-black"
        onClick={() =>
          setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
        }
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Переключатель темы</span>
      </Button>
    </div>
  );
}

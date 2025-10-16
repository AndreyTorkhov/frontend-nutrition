import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/shared/configs/theme";
import { Button } from "@/shared/ui/button";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className="flex justify-end items-center gap-4">
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

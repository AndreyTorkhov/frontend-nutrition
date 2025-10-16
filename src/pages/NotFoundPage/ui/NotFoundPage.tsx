import { Button } from "@/shared/ui/button";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-4">Страница не найдена</p>
      <p className="text-lg mb-6">
        Извините, но запрашиваемая страница не существует.
      </p>
      <Button onClick={() => navigate("/")} className="px-6 py-2">
        Вернуться на главную
      </Button>
    </div>
  );
};

import { Button } from "@/shared/ui/button";

type ErrorPageProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

export const ErrorPage = ({ error, resetErrorBoundary }: ErrorPageProps) => (
  <div className="flex flex-col items-center justify-center h-screen text-center">
    <h1 className="text-3xl font-bold mb-4">Что-то пошло не так</h1>
    <p className="text-lg mb-2">Произошла ошибка при загрузке страницы.</p>
    <p className="text-red-500 text-sm mb-4 whitespace-pre-wrap max-w-[500px]">
      {error.message}
    </p>
    <Button onClick={resetErrorBoundary}>Попробовать снова</Button>
  </div>
);

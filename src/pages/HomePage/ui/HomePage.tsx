import { Card } from "@/shared/ui/card";

export const HomePage = () => {
  return (
    <div className="p-5 flex flex-col h-screen">
      <Card className="w-full flex-grow flex flex-col shadow-lg p-5 overflow-hidden">
        <div className="flex flex-grow gap-5 h-[calc(100%-10px)]">
          Что-то важное
        </div>
      </Card>
    </div>
  );
};

import { useEffect, useState } from "react";
import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Separator } from "@/shared/ui/separator";
import { RefreshCw } from "lucide-react";

import { useUserStore } from "@/entities/user";
import { ProfileInfoCard } from "@/widgets/profile-info";
import { ProfileEditFormContainer } from "@/features/profile-edit-form";
import { DangerZone } from "@/widgets/profile-danger";

export const ProfilePage = () => {
  const { me, fetchMe, isMeLoading } = useUserStore();
  const [tab, setTab] = useState<"overview" | "edit" | "danger">("overview");

  useEffect(() => {
    if (!me) fetchMe();
  }, [me, fetchMe]);

  return (
    <div className="h-full max-w-screen-sm mx-auto flex flex-col overflow-hidden">
      {/* HEADER */}
      <div className="px-4 pt-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Профиль</h1>
          <p className="text-xs text-muted-foreground">
            Обзор, редактирование и управление аккаунтом
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fetchMe()}
          disabled={isMeLoading}
          className="shrink-0"
        >
          <RefreshCw className="h-4 w-4 mr-1.5" />
          Обновить
        </Button>
      </div>
      <Separator />

      {/* BODY */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 md:pb-6 pt-4">
        <Card className="p-4 shadow-sm">
          <Tabs
            value={tab}
            onValueChange={(v) => setTab(v as any)}
            className="w-full"
          >
            {/* SEGMENTED CONTROL на мобилке */}
            <TabsList className="grid grid-cols-3 w-full rounded-xl">
              <TabsTrigger className="text-xs py-2" value="overview">
                Обзор
              </TabsTrigger>
              <TabsTrigger className="text-xs py-2" value="edit">
                Редактировать
              </TabsTrigger>
              <TabsTrigger className="text-xs py-2" value="danger">
                Удалить
              </TabsTrigger>
            </TabsList>

            <div className="mt-4 space-y-4">
              <TabsContent value="overview" className="space-y-4">
                <ProfileInfoCard />
              </TabsContent>

              <TabsContent value="edit" className="space-y-4">
                <ProfileEditFormContainer />
              </TabsContent>

              <TabsContent value="danger" className="space-y-4">
                <DangerZone />
              </TabsContent>
            </div>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import { RefreshCw, Search } from "lucide-react";
import { useUserStore } from "@/entities/user";
import { UsersList } from "@/widgets/users-list";

export const UsersPage = () => {
  const { list, fetchUsers, isListLoading, listError } = useUserStore();
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!list?.length) fetchUsers();
  }, [list?.length, fetchUsers]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return list;
    return list.filter(
      (u) =>
        u.name.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query),
    );
  }, [q, list]);

  return (
    <div className="h-dvh max-w-screen-sm mx-auto flex flex-col">
      <div className="px-4 pt-4 pb-3 flex items-center justify-between ">
        <div>
          <h1 className="text-xl font-semibold">Пользователи</h1>
          <p className="text-xs text-muted-foreground">
            Список пользователей и ключевые параметры
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fetchUsers()}
          disabled={isListLoading}
          className="shrink-0"
        >
          <RefreshCw className="h-4 w-4 mr-1.5" />
          Обновить
        </Button>
      </div>
      <Separator />

      <div className="px-4 pt-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Поиск по имени или email"
            className="pl-9"
            inputMode="search"
          />
        </div>
      </div>

      <div className="flex-1 px-4 md:pb-6 mb-24 mt-4">
        <Card className="p-0 shadow-sm mb-2">
          {listError ? (
            <div className="p-4 text-sm text-destructive">{listError}</div>
          ) : (
            <UsersList users={filtered} loading={isListLoading} />
          )}
        </Card>
      </div>
    </div>
  );
};

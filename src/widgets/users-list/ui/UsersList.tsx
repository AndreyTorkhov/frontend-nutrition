import { useMemo, useState } from "react";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import { Skeleton } from "@/shared/ui/skeleton";
import type { User } from "@/entities/user";
import { UsersListItem } from "./UsersListItem";

interface Props {
  users: User[];
  loading?: boolean;
  pageSize?: number;
}

export const UsersList = ({ users, loading, pageSize = 20 }: Props) => {
  const [page, setPage] = useState(1);

  const { visible, hasMore } = useMemo(() => {
    const end = page * pageSize;
    return {
      visible: users?.slice(0, end) ?? [],
      hasMore: (users?.length ?? 0) > end,
    };
  }, [users, page, pageSize]);

  if (loading && (!users || users.length === 0)) {
    return (
      <div className="p-4 space-y-3 overflow-y-auto ">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-5 w-14" />
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!visible.length) {
    return (
      <div className="p-6 text-center text-sm text-muted-foreground">
        Ничего не найдено
      </div>
    );
  }

  return (
    <div className="p-2">
      {visible.map((u, idx) => (
        <div key={u.id}>
          <UsersListItem user={u} />
          {idx < visible.length - 1 && <Separator className="my-2" />}
        </div>
      ))}

      {hasMore && (
        <div className="pt-3 pb-1 flex justify-center">
          <Button variant="outline" onClick={() => setPage((p) => p + 1)}>
            Показать ещё
          </Button>
        </div>
      )}
    </div>
  );
};

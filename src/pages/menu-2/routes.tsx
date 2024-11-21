import { lazy } from "react";
import { CanAccessRoute } from "@/components/ui/can-access/can-access-route";
import { SuspenseList } from "@/components/ui/suspense/list";

const Menu2 = lazy(
    () => import("@/pages/menu-2/list")
);

export const menu2Router = [
  {
    path: "/menu-2",
    element: (
      <CanAccessRoute
        resource={"menu-2"}
        action={"list"}>
        <SuspenseList>
          <Menu2 />
        </SuspenseList>
      </CanAccessRoute>
    )
  },
];
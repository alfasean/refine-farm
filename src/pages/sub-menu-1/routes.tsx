import { lazy } from "react";
import { CanAccessRoute } from "@/components/ui/can-access/can-access-route";
import { SuspenseList } from "@/components/ui/suspense";

const SubMenu1 = lazy(
  () => import("@/pages/sub-menu-1/list")
);

export const subMenu1Router = [
  {
    path: "/sub-menu-1",
    element: (
      <CanAccessRoute
        resource={"sub-menu-1"}
        action={"list"}>
        <SuspenseList>
          <SubMenu1 />
        </SuspenseList>
      </CanAccessRoute>
    )
    },
];
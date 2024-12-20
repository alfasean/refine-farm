import { lazy } from "react";
import { CanAccessRoute } from "@/components/ui/can-access/can-access-route";
import { SuspenseList } from "@/components/ui/suspense";

const ReportList = lazy(
  () => import("@/pages/report/list")
);

export const reporteRouter = [
  { 
    path: "/report",
    element: (
      <CanAccessRoute
        resource={"report"}
        action={"list"}>
          <SuspenseList>
            <ReportList />
          </SuspenseList>
      </CanAccessRoute>
    )
  },
];

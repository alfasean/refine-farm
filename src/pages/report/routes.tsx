import { lazy } from "react";

const ReportCreate = lazy(
  () => import("@/pages/report/list")
);


export const reporteRouter = [
  {
    path: "/report",
    element: <ReportCreate />,
  },
];

import { IResourceItem } from "@refinedev/core";
import {
  DashboardFilled,
  FolderAddFilled,
  OrderedListOutlined,
} from "@ant-design/icons";

export const resources: IResourceItem[] = [
  {
    name: "dashboard",
    identifier: "dashboard",
    list: "/",
    meta: {
      label: "Dashboard",
      icon: <DashboardFilled />,
    },
  },
  {
    name: "cooperation-agreement-type",
    identifier: "cooperation-agreement-type",
    list: "/cooperation-agreement-type",
    create: "/cooperation-agreement-type/create",
    edit: "/cooperation-agreement-type/:id",
    meta: {
      label: "Type",
      icon: <FolderAddFilled />,
    },
  },
  {
    name: "report",
    identifier: "report",
    list: "/report",
    create: "/report/create",
    edit: "/report/:id",
    meta: {
      label: "Report",
      icon: <OrderedListOutlined />,
    },
  },
  {
    name: "menu-1",
    identifier: "menu-1",
    list: "/menu-1",
    create: "/menu-1/create",
    edit: "/menu-1/:id",
    meta: {
      label: "Menu 1",
      icon: <OrderedListOutlined />,
    }
  },
  {
    name: "sub-menu-1",
    identifier: "sub-menu-1",
    list: "/sub-menu-1",
    create: "/sub-menu-1/create",
    edit: "/sub-menu-1/:id",
    meta: {
      parent : "menu-1",
      label: "Sub Menu 1",
      icon: <OrderedListOutlined />,
    }  
  },

  {
    name: "menu-2",
    identifier : "menu-2",
    list: "/menu-2",
    create: "/menu-2/create",
    edit: "/menu-2/:id",
    meta: {
      label: "Menu 2",
      icon: <OrderedListOutlined />,
    }
  }
];

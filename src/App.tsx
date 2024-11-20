import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { useNotificationProvider } from "@refinedev/antd";

import "@refinedev/antd/dist/reset.css";

import { App as AntdApp } from "antd";
import { createBrowserRouter, Outlet } from "react-router-dom";
import routerProvider, { DocumentTitleHandler, UnsavedChangesNotifier, } from "@refinedev/react-router-v6";
import { userAtom } from "./stores";
import { useAtom } from "jotai";
import { useMsal } from "@azure/msal-react";
import { queryClient } from "@/config";
import { dataProvider, accessControlProvider, authProvider } from "@/providers";
import { FullScreenLoading } from "@/components/ui";
import { resources } from "./resources";
import { PublicRoutes } from "./routes/public-routes";
import { router } from "./routes";
// import { useLocation } from "react-router-dom";

export const RootRouter = createBrowserRouter([
  {
    element: <App />,
    children: [
      ...router
    ],
  },
]);


function App() {
  // const location = useLocation();
  return (
    <AntdApp>
      <DevtoolsProvider>
        <Refine
          routerProvider={routerProvider}
          dataProvider={{
            default: dataProvider,
          }}
          authProvider={authProvider}
          notificationProvider={useNotificationProvider}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            useNewQueryKeys: true,
            projectId: "JapdgP-Ptd9DO-0zi8mO",
            reactQuery: {
              clientConfig: queryClient,
            },
          }}
          resources={resources}
          accessControlProvider={accessControlProvider}
        >
          <BaseLayout>
            <Outlet />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler
            handler={({ action, params, resource }) => {
              const id = params?.id ?? "";
              const loginPage = location.pathname.startsWith("/login");
              
              if (loginPage) {
                return "Login | FR";
              }
              
              const actionPrefixMatcher = {
                create: `Create New ${resource?.meta?.label}`,
                clone: `#${id} Clone ${resource?.meta?.label}`,
                edit: `#${id} Edit ${resource?.meta?.label}`,
                show: `#${id} Show ${resource?.meta?.label}`,
                list: `${resource?.meta?.label}`,
              };
  
              const suffix = " | FR";
              const title = actionPrefixMatcher[action || "list"] + suffix;
  
              return title;
              }} />
          </BaseLayout>
        </Refine>
        <DevtoolsPanel />
      </DevtoolsProvider>
    </AntdApp>
  );
}

function BaseLayout({ children }: React.PropsWithChildren) {
  const { instance, inProgress } = useMsal();
  const [user, setUser] = useAtom(userAtom);

  if (inProgress === "login" || inProgress === "handleRedirect") {
    return <FullScreenLoading />;
  }

  return children;
}


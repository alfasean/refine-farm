import { Refine, AuthProvider } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import { App as AntdApp } from "antd";
import { createBrowserRouter, Outlet } from "react-router-dom";
import routerProvider, { DocumentTitleHandler, UnsavedChangesNotifier, } from "@refinedev/react-router-v6";
import { userAtom } from "./stores";
import { useAtom } from "jotai";
import { useMsal } from "@azure/msal-react";
import { SilentRequest } from "@azure/msal-browser";
import { queryClient } from "@/config";
import { dataProvider, accessControlProvider } from "@/providers";
import { FullScreenLoading } from "@/components/ui";
import { resources } from "./resources";
import { PublicRoutes } from "./routes/public-routes";
import { router } from "./routes";
import { TOKEN_KEY } from "./constants";
import { tokenRequest } from "@/config";
import { IUser } from "./interfaces";
import { checkUser } from "./utils";
import { axiosInstanceApp, axiosInstanceAuth } from "@/axiosInstances";

export const RootRouter = createBrowserRouter([
  {
    element: <App />,
    children: [
      ...router
    ],
  },
]);


function App() {
  const { instance, inProgress } = useMsal();
  const [user, setUser] = useAtom(userAtom);
  if (inProgress === "login" || inProgress === "handleRedirect") {
    return <FullScreenLoading />;
  }
  const authProvider: AuthProvider = {
    login: async () => {
      await instance.loginRedirect(); // Pick the strategy you prefer i.e. redirect or popup
      return {
        success: true,
      };
    },
    register: async () => ({
      success: true,
    }),
    updatePassword: async () => ({
      success: true,
    }),
    logout: async () => {
      localStorage.removeItem(TOKEN_KEY);
      instance.setActiveAccount(null);
      setUser(undefined);
      return {
        success: true,
        redirectTo: "/login",
      };
    },
    check: async () => {
      try {
        const account = instance.getActiveAccount();
        if (account === null) {
          return {
            authenticated: false,
            redirectTo: "/login",
          };
        }
        const request: SilentRequest = {
          ...tokenRequest,
          account: account,
        };

        const token = await instance.acquireTokenSilent(request);
        localStorage.setItem(TOKEN_KEY, token.accessToken);
        const checkUserResp = await checkUser();
        if (
          checkUserResp.status === "authorized" &&
          checkUserResp.user !== undefined
        ) {
          setUser(checkUserResp.user);
          return { authenticated: true };
        }
        setUser(undefined);
        return {
          authenticated: false,
        };
      } catch (e) {
        console.log(e);
        return {
          authenticated: false,
        };
      }
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    getPermissions: async () => null,
    getIdentity: async (): Promise<IUser | undefined> => {
      return user;
    },
  };

  return (
    <AntdApp>
      <DevtoolsProvider>
        <Refine
          routerProvider={routerProvider}
          dataProvider={{
            default: dataProvider
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
          accessControlProvider={accessControlProvider(axiosInstanceAuth, user)}
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


import { AxiosInstance, isAxiosError } from "axios";
import { AccessControlProvider } from "@refinedev/core";
import { axiosAuth } from "@/config";
import { DOMAIN_APP } from "@/constants";
import { IUser } from "@/interfaces";

// const { VITE_DOMAIN_APP: VITE_DOMAIN_APP } = import.meta.env;

// if (!VITE_DOMAIN_APP) {
//   throw new Error("DOMAIN_APP is not defined");
// }


type CheckPermissionResponse = {
  isAllowed: boolean;
};

export const accessControlProvider = (
  httpClient: AxiosInstance,
  user: IUser | undefined
): AccessControlProvider => ({
  can: async ({ resource, action, params }) => {
    try {
      const resp = await httpClient.get<CheckPermissionResponse>(
        "permissions/check",
        {
          params: {
            domain: DOMAIN_APP,
            resource: resource,
            subject: user?.id,
            action: action,
          },
        }
      );
      return {
        can: resp.data.isAllowed,
      };
    } catch (e) {
      if (isAxiosError(e)) {
        switch (e.response?.status) {
          case 401:
            return {
              can: false,
              reason: "Unauthorized",
            };
          case 403:
            return {
              can: false,
              reason: "Forbidden",
            };
        }
      }
      return {
        can: false,
        reason: (e as { message: string }).message,
      };
    }
  },
  options: {
    buttons: {
      enableAccessControl: true,
      hideIfUnauthorized: false,
    },
  },
});

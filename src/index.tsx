import { createRoot } from 'react-dom/client';
import { RootRouter } from './App';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
// import { msalInstance } from '@/config';
import { msalConfig, tokenRequest } from '@/config';
import React from 'react';
import { MsalProvider } from '@azure/msal-react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
// import { queryClient } from '@/config';
import { RouterProvider } from 'react-router-dom';
import { TOKEN_KEY } from './constants';
import { PublicClientApplication, EventType, EventPayload, SilentRequest, AccountInfo } from '@azure/msal-browser';

// dayjs.extend(relativeTime);

// const container = document.querySelector('#root');
// const root = createRoot(container!);

// msalInstance.initialize();

dayjs.extend(relativeTime);

const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.addEventCallback(async (event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS) {
    const payload: EventPayload = event.payload;
    msalInstance.setActiveAccount(payload as AccountInfo);

    const account = msalInstance.getActiveAccount();
    const request: SilentRequest = {
      ...tokenRequest,
      account: account == null ? undefined : account,
    };
    try {
      const response = await msalInstance.acquireTokenSilent(request);
      localStorage.setItem(TOKEN_KEY, response.accessToken);
    } catch (e) {
      msalInstance.acquireTokenPopup(request).then((response) => {
        localStorage.setItem(TOKEN_KEY, response.accessToken);
      });
    }
  }
  if (event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) {
    msalInstance.setActiveAccount(event.payload as AccountInfo);
  }
});
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const container = document.getElementById("root");
const root = createRoot(container!);
msalInstance.initialize();
root.render(
  <React.StrictMode>
    <React.Suspense>
      <QueryClientProvider client={queryClient}>
        <MsalProvider instance={msalInstance}>
          <RouterProvider router={RootRouter} />
        </MsalProvider>
      </QueryClientProvider>
    </React.Suspense>
  </React.StrictMode>
);

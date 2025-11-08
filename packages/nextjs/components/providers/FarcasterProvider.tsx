"use client";

import { createContext, useContext, useEffect, useState } from "react";
import miniapp from "@farcaster/miniapp-sdk";

interface FarcasterContextValue {
  isFrameContext: boolean;
  fid: number | null;
  username: string | null;
  displayName: string | null;
  pfpUrl: string | null;
  isReady: boolean;
}

const FarcasterContext = createContext<FarcasterContextValue>({
  isFrameContext: false,
  fid: null,
  username: null,
  displayName: null,
  pfpUrl: null,
  isReady: false,
});

export function FarcasterProvider({ children }: { children: React.ReactNode }) {
  const [contextValue, setContextValue] = useState<FarcasterContextValue>({
    isFrameContext: false,
    fid: null,
    username: null,
    displayName: null,
    pfpUrl: null,
    isReady: false,
  });

  useEffect(() => {
    const initFarcaster = async () => {
      try {
        // Check if we're in a Farcaster miniapp context
        const context = await miniapp.context;

        if (context?.user) {
          setContextValue({
            isFrameContext: true,
            fid: context.user.fid || null,
            username: context.user.username || null,
            displayName: context.user.displayName || null,
            pfpUrl: context.user.pfpUrl || null,
            isReady: true,
          });
        } else {
          // Not in Farcaster context (regular web browser)
          setContextValue(prev => ({
            ...prev,
            isReady: true,
          }));
        }
      } catch {
        // Fail gracefully - we're probably not in a miniapp
        console.log("Not in Farcaster miniapp context");
        setContextValue(prev => ({
          ...prev,
          isReady: true,
        }));
      }
    };

    initFarcaster();
  }, []);

  return <FarcasterContext.Provider value={contextValue}>{children}</FarcasterContext.Provider>;
}

export function useFarcaster() {
  return useContext(FarcasterContext);
}

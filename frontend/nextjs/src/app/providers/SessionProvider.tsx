'use client';

import { SessionProvider } from "next-auth/react";

export function Provider({ children }: { children: React.ReactNode }) {
  return <SessionProvider refetchInterval={60}>{children}</SessionProvider>;
}
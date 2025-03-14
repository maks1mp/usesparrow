'use client';

import { type ReactNode, createContext, useRef } from 'react';

import { createCaseStore, initCaseStore } from '@/stores/case.store';

export type CaseStoreApi = ReturnType<typeof createCaseStore>;

export const CaseStoreContext = createContext<CaseStoreApi | undefined>(
  undefined,
);

export interface CaseStoreProviderProps {
  children: ReactNode;
  initialState: ReturnType<typeof initCaseStore>;
}

export const CaseStoreProvider = ({
  children,
  initialState,
}: CaseStoreProviderProps) => {
  const storeRef = useRef<CaseStoreApi>(null);

  if (!storeRef.current) {
    storeRef.current = createCaseStore(initialState ?? initCaseStore());
  }

  return (
    <CaseStoreContext.Provider value={storeRef.current}>
      {children}
    </CaseStoreContext.Provider>
  );
};

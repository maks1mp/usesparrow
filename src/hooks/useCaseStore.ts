import type { CaseStore } from '@/stores/case.store';
import { useContext } from 'react';
import { useStore } from 'zustand/index';
import { CaseStoreContext } from '@/providers/CaseStoreProvider';

export const useCaseStore = <T>(selector: (store: CaseStore) => T): T => {
  const caseStoreContext = useContext(CaseStoreContext);

  if (!caseStoreContext) {
    throw new Error(`useCaseStore must be used within CaseStoreProvider`);
  }

  return useStore(caseStoreContext, selector);
};

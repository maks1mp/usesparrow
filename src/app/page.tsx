'use server';

import { getCasesData } from '@/lib/data';
import { CaseStoreProvider } from '@/providers/CaseStoreProvider';
import { initCaseStore } from '@/stores/case.store';
import Listing from '@/pages/Listing';
import { Suspense } from 'react';

export default async function Home() {
  const data = await getCasesData();

  return (
    <CaseStoreProvider initialState={initCaseStore(data)}>
      <Suspense fallback={<div>Loading...</div>}>
        <Listing />
      </Suspense>
    </CaseStoreProvider>
  );
}

'use client';

import { FC, memo } from 'react';

import Case from '@/components/Case/Case';
import Total from '@/components/Total/Total';
import NiceModal from '@ebay/nice-modal-react';
import { useCaseStore } from '@/hooks/useCaseStore';
import dynamic from 'next/dynamic';

const Listing: FC = () => {
  const {
    cases,
    loadMoreCases,
    toggleCase,
    selectedCases,
    isLoading,
    currentPage,
    totalPages,
  } = useCaseStore((store) => store);

  return (
    <NiceModal.Provider>
      <div className="d-flex flex-column w-100">
        <header className="p-3 position-sticky bg-white container-fluid top-0 z-1">
          <div className="row align-items-center g-0">
            <div className="col" />
            <Total
              cases={cases.filter((caseItem) =>
                selectedCases.includes(caseItem.uid),
              )}
            />
          </div>
        </header>
        <div className="flex-grow-1">
          <div className="mt-4 mt-sm-5 container !max-w-[760px]">
            <h2 className="fs-24 font-accent font-semibold">
              Did you buy any of these products?
            </h2>
            <p className="subtext">
              Select all claims you believe you qualify for
            </p>
            <div className="mt-4">
              <div className="row">
                {cases.map((caseItem) => (
                  <div key={caseItem.uid} className="col-md-6 mb-3">
                    <Case
                      {...caseItem}
                      toggleSelection={toggleCase}
                      isSelected={selectedCases.includes(caseItem.uid)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center pb-2">
              {isLoading ? (
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={loadMoreCases}
                  disabled={currentPage >= totalPages}
                >
                  Load More
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </NiceModal.Provider>
  );
};

export default dynamic(() => Promise.resolve(memo(Listing)), { ssr: false });

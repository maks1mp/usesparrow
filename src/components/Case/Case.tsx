import { FC, memo } from 'react';
import { type Case as CaseType } from '@/stores/case.store';
import { usePostHog } from 'posthog-js/react';
import DaysLeft from '@/components/Case/DaysLeft';
import NiceModal from '@ebay/nice-modal-react';
import CaseDetailsModal from '@/modals/CaseDetailsModal';

const FiledBadgeSvg = () => (
  <svg
    className="ps-1"
    style={{ transform: 'translateY(-1px)' }}
    width="12"
    height="10"
    viewBox="0 0 32 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M27 0L12 15L5 8L0 13L12 25L32 5L27 0Z" fill="black" />
  </svg>
);

const ProofNeededSvg = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="8" r="7.4" stroke="#FF4A4A" strokeWidth="1.2" />
    <path
      d="M12 9.33333L9.33333 11.9982L4.44533 12C4.32777 12.0005 4.21483 11.9543 4.13133 11.8715C4.04782 11.7887 4.00059 11.6762 4 11.5587V4.44133C4 4.19778 4.19778 4 4.44133 4H11.5587C11.8022 4 12 4.20267 12 4.44533V9.33333ZM11.1111 4.88889H4.88889V11.1111H8.44444V8.88889C8.44446 8.78003 8.48442 8.67496 8.55676 8.59361C8.6291 8.51226 8.72878 8.46029 8.83689 8.44755L8.88889 8.44444L11.1111 8.444V4.88889ZM10.7427 9.33289L9.33333 9.33333V10.7418L10.7427 9.33289Z"
      fill="black"
    />
    <path d="M2.5 2.25L13.5 13.25" stroke="#FF4A4A" strokeWidth="1.2" />
  </svg>
);

const DESCRIPTION_LIMIT = 150; // Define character limit as a constant

const Case: FC<
  CaseType & { isSelected: boolean; toggleSelection: (uid: string) => void }
> = ({
  isSelected,
  toggleSelection,
  uid,
  name,
  description,
  proof_needed: proofNeeded,
  close_date,
  price,
}) => {
  const posthog = usePostHog();
  const isLongDescription = description.length > DESCRIPTION_LIMIT;

  const toggleCaseSelectWithLog = (uid: string) => {
    console.log(name);
    posthog?.capture('case_clicked');
    toggleSelection(uid);
  };

  return (
    <div className="suit" onClick={() => toggleCaseSelectWithLog(uid)}>
      <div className="suit-badge d-none">
        <FiledBadgeSvg />
        <span className="ps-1">Already filed</span>
      </div>

      <div className="row g-3 suit-content">
        <div className="col-auto">
          <button
            type="button"
            className={`checkbox ${isSelected ? 'checked' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleCaseSelectWithLog(uid);
            }}
          />
        </div>

        <div className="col">
          <div className="suit-name text-capitalize">{name}</div>
          <div className="row gx-2">
            <div className="col">
              <span>
                {isLongDescription
                  ? `${description.substring(0, DESCRIPTION_LIMIT)}...`
                  : description}
              </span>
              {isLongDescription && (
                <button
                  type="button"
                  className="px-1 py-0 text-body text-decoration-underline !text-[12px] !border-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    posthog?.capture('show_more_clicked');
                    NiceModal.show(CaseDetailsModal, { description });
                  }}
                >
                  More
                </button>
              )}
            </div>
          </div>

          {!proofNeeded && (
            <div className="row suit-proof gx-2">
              <div className="col-auto">
                <ProofNeededSvg />
              </div>
              <div className="col">No proof needed</div>
            </div>
          )}

          <div className="row suit-date gx-0 d-none">
            <div className="col-auto">{close_date}</div>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-end mt-4">
        <div className="col">
          <div className="font-semibold rounded-pill d-inline-block text-sm bg-[#e1e3e6] px-4 py-2.5">
            <DaysLeft closeDate={close_date} />
          </div>
        </div>
        <div className="col-auto">
          <div className="suit-payout">
            <span className="pe-1 text-[10px] align-super">Up to</span>
            <span>${price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Case);

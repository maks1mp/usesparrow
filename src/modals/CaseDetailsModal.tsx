import { FC } from 'react';
import NiceModal, { bootstrapDialog, useModal } from '@ebay/nice-modal-react';
import { Modal } from 'react-bootstrap';

const CloseIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} fill="none">
    <path
      fill="#000"
      fillRule="evenodd"
      d="M6.022 5.293 11.315 0l.707.707L6.729 6l5.606 5.607-.707.707-5.606-5.607-5.314 5.314L0 11.314 5.314 6l-5-5 .708-.707 5 5Z"
      clipRule="evenodd"
    />
  </svg>
);

const CaseDetailsModal: FC<{ description: string }> = ({ description }) => {
  const modal = useModal();

  return (
    <Modal {...bootstrapDialog(modal)}>
      <div className="modal-content">
        <div className="modal-body">
          <button
            type="button"
            className="position-absolute btn btn-link p-0 lh-0"
            onClick={modal.hide}
          >
            {CloseIcon}
          </button>
          <div className="text-center font-semibold">Criteria</div>
          <div className="mt-3 text-[14px]">{description}</div>
        </div>
      </div>
    </Modal>
  );
};

export default NiceModal.create(CaseDetailsModal);

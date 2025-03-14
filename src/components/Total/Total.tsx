import { FC, memo, useEffect, useMemo, useState, useRef } from 'react';
import { Case } from '@/stores/case.store';

const Total: FC<{ cases: Case[] }> = ({ cases }) => {
  const [animate, setAnimate] = useState(false);
  const [addedAmount, setAddedAmount] = useState(0);
  const prevCases = useRef(new Set<string>());

  const sum = useMemo(
    () => cases.reduce((acc, c) => acc + c.price, 0),
    [cases],
  );

  useEffect(() => {
    const newCase = cases.find((c) => !prevCases.current.has(c.uid));

    if (newCase) {
      setAddedAmount(newCase.price);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 500);
    }

    prevCases.current = new Set(cases.map((c) => c.uid));
  }, [cases]);

  return (
    <div className="col-auto text-nowrap position-relative">
      <span className="text-[10px] align-super">Potential claim earnings</span>
      <span className={`ps-1 text-[20px] ${animate ? 'fade-out' : ''}`}>
        ${sum}
      </span>
      {animate && (
        <div className="claim-total-plus claim-total-plus-in animate">
          +${addedAmount}
        </div>
      )}
    </div>
  );
};

export default memo(Total);

import { FC, memo, useMemo } from 'react';

const getDaysRemaining = (closeDate: string) => {
  const now = new Date();
  const close = new Date(closeDate);
  const diffTime = close.getTime() - now.getTime();

  return Math.ceil(diffTime / (1000 * 3600 * 24));
};

const DaysLeft: FC<{ closeDate: string }> = ({ closeDate }) => {
  const daysRemaining = useMemo(() => getDaysRemaining(closeDate), [closeDate]);
  const formattedDays = new Intl.NumberFormat().format(daysRemaining);

  return (
    <>
      <span>{formattedDays}</span> day{daysRemaining !== 1 && 's'} left
    </>
  );
};

export default memo(DaysLeft);

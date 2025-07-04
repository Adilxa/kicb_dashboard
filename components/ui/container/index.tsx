import clsx from 'clsx';
import { FC, PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {
  className?: string;
}

const Container: FC<IProps> = ({ className, children }) => {
  return <div className={clsx('mx-auto w-full px-6 sm:px-12', className)}>{children}</div>;
};

export default Container;

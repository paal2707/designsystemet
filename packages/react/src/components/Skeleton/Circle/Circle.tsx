import type { HTMLAttributes } from 'react';
import cl from 'clsx';

import { useSynchronizedAnimation } from '../../../hooks';

export type CircleProps = {
  /** The width of the component */
  width?: string | number;
  /** The height of the component */
  height?: string | number;
} & HTMLAttributes<HTMLDivElement>;

/**  Skeleton component used for indicating loading elements of circular shape */
export const Circle = ({
  width,
  height,
  className,
  children,
  style,
  ...rest
}: CircleProps) => {
  const ref = useSynchronizedAnimation<HTMLDivElement>(
    'fds-skeleton-opacity-fade',
  );

  return (
    <div
      ref={ref}
      className={cl(
        'fds-skeleton',
        'fds-skeleton--circle',
        Boolean(children) && 'fds-skeleton--has-children',
        className,
      )}
      style={{ width, height, ...style }}
      aria-hidden
      {...rest}
    >
      {children}
    </div>
  );
};

Circle.displayName = 'SkeletonCircle';

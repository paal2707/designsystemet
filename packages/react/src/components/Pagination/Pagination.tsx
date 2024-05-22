import { forwardRef } from 'react';
import type * as React from 'react';
import cl from 'clsx/lite';
import { ChevronLeftIcon, ChevronRightIcon } from '@navikt/aksel-icons';

import { getSize } from '../../utilities/getSize';

import { PaginationRoot } from './PaginationRoot';
import { PaginationContent } from './PaginationContent';
import { PaginationItem } from './PaginationItem';
import { PaginationButton } from './PaginationButton';
import { PaginationEllipsis } from './PaginationEllipsis';
import { PaginationNext, PaginationPrevious } from './PaginationNextPrev';
import { usePagination } from './usePagination';

type OldPaginationSizes = 'small' | 'medium' | 'large';

export type PaginationProps = {
  /** Sets the text label for the next page button */
  nextLabel: string;
  /** Sets the text label for the previous page button */
  previousLabel: string;
  /** Sets the size of the component
   * @default md
   * @note `small`, `medium`, `large` is deprecated
   */
  size?: 'sm' | 'md' | 'lg' | OldPaginationSizes;
  /** Sets how compact the component will be. If true, only 5 steps will show. */
  compact?: boolean;
  /** Hides the component's previous and next button labels */
  hideLabels?: boolean;
  /** Sets the current page
   * @default 1
   */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Function to be called when the selected page changes. */
  onChange: (currentPage: number) => void;
  /** `aria-label` for pagination item */
  itemLabel?: (currentPage: number) => string;
} & Omit<React.HTMLAttributes<HTMLElement>, 'onChange'>;

const iconSize = {
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
};

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      nextLabel = '',
      previousLabel = '',
      compact = false,
      hideLabels = false,
      currentPage = 1,
      totalPages,
      onChange,
      itemLabel = (num) => `Side ${num}`,
      ...rest
    }: PaginationProps,
    ref,
  ) => {
    const { pages, showNextPage, showPreviousPage } = usePagination({
      compact,
      currentPage,
      totalPages,
    });

    const size = getSize(rest.size || 'md') as 'sm' | 'md' | 'lg';

    return (
      <PaginationRoot
        ref={ref}
        aria-label='Pagination'
        size={size}
        compact={compact}
        {...rest}
      >
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={cl(!showPreviousPage && 'fds-pagination--hidden')}
              onClick={() => {
                onChange(currentPage - 1);
              }}
              aria-label={previousLabel}
            >
              <ChevronLeftIcon
                aria-hidden
                fontSize={iconSize[size]}
              />
              {!hideLabels && previousLabel}
            </PaginationPrevious>
          </PaginationItem>
          {pages.map((page, i) => (
            <PaginationItem key={`${page}${i}`}>
              {page === 'ellipsis' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationButton
                  aria-current={currentPage === page}
                  isActive={currentPage === page}
                  aria-label={itemLabel(page)}
                  onClick={() => {
                    onChange(page);
                  }}
                >
                  {page}
                </PaginationButton>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              aria-label={nextLabel}
              onClick={() => {
                onChange(currentPage + 1);
              }}
              className={cl(!showNextPage && 'fds-pagination--hidden')}
            >
              {!hideLabels && nextLabel}
              <ChevronRightIcon
                aria-hidden
                fontSize={iconSize[size]}
              />
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </PaginationRoot>
    );
  },
);

Pagination.displayName = 'Pagination';

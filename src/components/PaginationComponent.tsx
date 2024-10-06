import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';

interface PaginationComponentProps {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number, pageSize: number) => void;
}

const PaginationComponent = ({
  totalItems,
  currentPage,
  itemsPerPage = 10, // Provide a default value
  onPageChange,
}: PaginationComponentProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page, itemsPerPage);
    }
  };

  // const handleItemsPerPageChange = (value: string) => {
  //   const newItemsPerPage = parseInt(value, 10);
  //   onPageChange(1, newItemsPerPage);
  // };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <PaginationLink
              href='#'
              onClick={e => {
                e.preventDefault();
                handlePageChange(i);
              }}
              isActive={i === currentPage}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (startPage > 1) {
        pageNumbers.push(
          <PaginationItem key={1}>
            <PaginationLink
              href='#'
              onClick={e => {
                e.preventDefault();
                handlePageChange(1);
              }}
            >
              1
            </PaginationLink>
          </PaginationItem>
        );
        if (startPage > 2) {
          pageNumbers.push(<PaginationEllipsis key='ellipsis-start' />);
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <PaginationLink
              href='#'
              onClick={e => {
                e.preventDefault();
                handlePageChange(i);
              }}
              isActive={i === currentPage}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push(<PaginationEllipsis key='ellipsis-end' />);
        }
        pageNumbers.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              href='#'
              onClick={e => {
                e.preventDefault();
                handlePageChange(totalPages);
              }}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className='flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4'>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href='#'
              onClick={e => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
            />
          </PaginationItem>
          {renderPageNumbers()}
          <PaginationItem>
            <PaginationNext
              href='#'
              onClick={e => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      {/* <div className='flex items-center space-x-2 w-48 '>
        <span className='text-sm text-muted-foreground'>Page size:</span>
        <Select
          value={itemsPerPage?.toString() || '10'} // Use optional chaining and provide a fallback
          onValueChange={handleItemsPerPageChange}
        >
          <SelectTrigger className='w-[70px]'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 50, 100].map(size => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div> */}
    </div>
  );
};

export default PaginationComponent;

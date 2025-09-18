'use client';

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  SkipBack,
  SkipForward,
} from 'lucide-react';

import { TContainerListResponse } from '@/app/t-container/t-container.type';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/component/shadcn-ui/pagination';

type TContainerPaginationProps = {
  tContainerListData: TContainerListResponse['result'] | undefined;
  isFetching: boolean;
  isError: boolean;
  currentPage: number;
  currentPageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

const TContainerPagination = ({
  tContainerListData,
  isFetching,
  isError,
  currentPage,
  currentPageSize,
  onPageChange,
}: TContainerPaginationProps) => {
  // 데이터가 있으면 그 값을, 없으면 기본값 사용
  const safeTotalRows = tContainerListData?.totalRows ?? 0;
  const safePageSize = tContainerListData?.pageSize ?? currentPageSize;

  // 로딩 중일 때는 currentPage prop을 사용, 아니면 API 데이터 사용
  const displayPage = isFetching
    ? currentPage
    : (tContainerListData?.nowPage ?? 0);

  const totalPages = Math.ceil(safeTotalRows / safePageSize);
  const currentPageDisplay = displayPage + 1; // API는 0-based, UI는 1-based

  // 페이지 번호 배열 생성 (최대 10개)
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxPages = 10;

    // 데이터가 없고 로딩 중일 때만 페이지 1 표시
    if (isFetching && !tContainerListData) {
      return [1];
    }

    const startPage = Math.max(
      1,
      currentPageDisplay - Math.floor(maxPages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxPages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  // 첫 페이지와 마지막 페이지로 이동하는 함수들
  const goToFirstPage = () => {
    if (isFetching || isError || displayPage === 0) return;
    onPageChange(0);
  };

  const goToLastPage = () => {
    if (isFetching || isError || displayPage >= totalPages - 1) return;
    onPageChange(totalPages - 1);
  };

  // 10페이지씩 이동하는 함수들
  const goToPrevious10Pages = () => {
    if (isFetching || isError || displayPage < 10) return;
    const targetPage = Math.max(0, displayPage - 10);
    onPageChange(targetPage);
  };

  const goToNext10Pages = () => {
    if (isFetching || isError || displayPage + 10 >= totalPages) return;
    const targetPage = Math.min(totalPages - 1, displayPage + 10);
    onPageChange(targetPage);
  };

  const handlePreviousPage = () => {
    if (isFetching || isError || displayPage === 0) return;
    const prevPage =
      tContainerListData?.previousPage ?? Math.max(0, displayPage - 1);
    onPageChange(prevPage);
  };

  const handleNextPage = () => {
    if (isFetching || isError || displayPage >= totalPages - 1) return;
    const nextPage =
      tContainerListData?.nextPage ?? Math.min(totalPages - 1, displayPage + 1);
    onPageChange(nextPage);
  };

  const handlePageClick = (page: number) => {
    if (isFetching || isError) return;
    onPageChange(page - 1); // API는 0-based
  };

  return (
    <Pagination className="block w-auto !mx-0">
      <PaginationContent>
        <div className="flex">
          <PaginationItem>
            <PaginationLink
              onClick={goToFirstPage}
              className={`rounded-r-none border border-control ${isFetching || isError || displayPage === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              aria-disabled={isFetching || isError || displayPage === 0}
            >
              <SkipBack className="h-4 w-4" />
              <span className="sr-only">첫 페이지</span>
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={goToPrevious10Pages}
              className={`rounded-none border border-control border-l-0 ${isFetching || isError || displayPage < 10 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              aria-disabled={isFetching || isError || displayPage < 10}
            >
              <ChevronsLeft className="h-4 w-4" />
              <span className="sr-only">이전 10페이지</span>
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={handlePreviousPage}
              className={`rounded-l-none border border-control border-l-0 ${isFetching || isError || displayPage === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              aria-disabled={isFetching || isError || displayPage === 0}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">이전 페이지</span>
            </PaginationLink>
          </PaginationItem>
        </div>

        {pageNumbers.map(page => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => handlePageClick(page)}
              isActive={page === currentPageDisplay}
              className={`${page === currentPageDisplay ? 'border-none bg-filter' : ''} ${isFetching || isError ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              aria-disabled={isFetching || isError}
              suppressHydrationWarning
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <div className="flex">
          <PaginationItem>
            <PaginationLink
              onClick={handleNextPage}
              className={`rounded-none border border-control ${isFetching || isError || displayPage >= totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              aria-disabled={
                isFetching || isError || displayPage >= totalPages - 1
              }
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">다음 페이지</span>
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={goToNext10Pages}
              className={`rounded-none border border-control border-l-0 ${isFetching || isError || displayPage + 10 >= totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              aria-disabled={
                isFetching || isError || displayPage + 10 >= totalPages
              }
            >
              <ChevronsRight className="h-4 w-4" />
              <span className="sr-only">다음 10페이지</span>
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={goToLastPage}
              className={`rounded-l-none border border-control border-l-0 ${isFetching || isError || displayPage >= totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              aria-disabled={
                isFetching || isError || displayPage >= totalPages - 1
              }
            >
              <SkipForward className="h-4 w-4" />
              <span className="sr-only">마지막 페이지</span>
            </PaginationLink>
          </PaginationItem>
        </div>
      </PaginationContent>
    </Pagination>
  );
};

export { TContainerPagination };

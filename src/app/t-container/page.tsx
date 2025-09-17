'use client';

import { useState } from 'react';

import { ExcelDownloadModal } from '@/app/t-container/_component/excel-download-modal';
import { TContainerPagination } from '@/app/t-container/_component/t-container-pagination';
import { TContainerSearchFilters } from '@/app/t-container/_component/t-container-search-filters';
import { TContainerTable } from '@/app/t-container/_component/t-container-table';
import { useTContainerList } from '@/app/t-container/_hook/useTContainer';
import { calculateSearchFailure } from '@/app/t-container/_util/search-utils';
import { DEFAULT_COLUMN } from '@/app/t-container/t-container.constants';
import {
  ColumnName,
  ColumnObject,
  PaginationState,
  SearchFilter,
  SearchKeywordFilter,
} from '@/app/t-container/t-container.type';
import { ExcelIcon } from '@/component/icons';
import { Badge } from '@/component/shadcn-ui/badge';
import { Button } from '@/component/shadcn-ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/component/shadcn-ui/select';
import { Skeleton } from '@/component/shadcn-ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/component/shadcn-ui/tooltip';

const TContainerPage = () => {
  // sessionStorage에서 초기값 가져오기
  const getInitialPagination = (): PaginationState => {
    if (typeof window === 'undefined') {
      // SSR 환경에서는 기본값 반환
      return { page: 0, size: 20, sort: 'id,ASC' };
    }

    try {
      const saved = sessionStorage.getItem('t-container-pagination');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          page: parsed.page || 0,
          size: parsed.size || 20,
          sort: parsed.sort || 'id,ASC',
        };
      }
    } catch (error) {
      console.warn(
        'Failed to parse pagination state from sessionStorage:',
        error
      );
    }

    return { page: 0, size: 20, sort: 'id,ASC' };
  };

  // 검색 필터 상태
  const [searchFilter, setSearchFilter] = useState<SearchFilter>({
    // 신항, 북항
    selectedTerminals: [1, 2, 3, 4, 9, 10, 11, 14, 15, 16], // 기본값: 모든 터미널 선택

    // 이상탐지
    normalYn: true, // 기본값: 체크
    gateInUnavailableYn: true, // 기본값 : 체크
    nonArrivalYn: true, // 기본값 : 체크
    loadingCancelYn: true, // 기본값 : 체크

    // 작업 상태
    operationStatus: 'ALL', // 기본값 : 전체

    // 누적 체크
    accumulatedYn: true, // 기본값: 전체(누적)
  });

  // 필터 변경 핸들러
  const handleFilterChange = (updates: Partial<SearchFilter>) => {
    setSearchFilter(prev => ({ ...prev, ...updates }));
    // 필터 변경 시 첫 페이지로 이동
    setPagination(prev => ({ ...prev, page: 0 }));
  };

  // 검색 창 상태
  const [searchKeywordFilter, setSearchKeywordFilter] =
    useState<SearchKeywordFilter>({
      searchType: 'CON_NO', // 기본값 : 컨테이너 번호
      searchKeyword: '', // 기본값 : 빈 문자열
    });

  // 검색 타입 변경 핸들러
  const handleSearchTypeChange = (
    searchType: SearchKeywordFilter['searchType']
  ) => {
    setSearchKeywordFilter(prev => ({ ...prev, searchType }));
  };

  // 검색 키워드 변경 핸들러
  const handleSearchKeywordChange = (
    searchKeyword: SearchKeywordFilter['searchKeyword']
  ) => {
    setSearchKeywordFilter(prev => ({ ...prev, searchKeyword }));
    // 검색 키워드 변경 시 첫 페이지로 이동
    setPagination(prev => ({ ...prev, page: 0 }));
  };

  // API 요청 데이터 구성
  const createTContainerRequestData = () => {
    // 기본 요청 데이터 (검색 키워드 제외)
    const baseRequestData = {
      terminalIds: searchFilter.selectedTerminals,
      normalYn: searchFilter.normalYn,
      gateInUnavailableYn: searchFilter.gateInUnavailableYn,
      nonArrivalYn: searchFilter.nonArrivalYn,
      loadingCancelYn: searchFilter.loadingCancelYn,
      operationStatus: searchFilter.operationStatus,
      accumulatedYn: searchFilter.accumulatedYn,
      onlyBoxOperatorYn: false,
    };

    // 검색 키워드가 있을 때만 해당 필드 추가
    if (searchKeywordFilter.searchKeyword.trim()) {
      // 콤마로 구분된 키워드들을 배열로 변환 (빈 문자열 제외)
      const searchKeywordList = searchKeywordFilter.searchKeyword
        .split(',')
        .map(keyword => keyword.trim())
        .filter(keyword => keyword.length > 0);

      if (searchKeywordList.length > 0) {
        switch (searchKeywordFilter.searchType) {
          case 'CON_NO':
            return { ...baseRequestData, conNos: searchKeywordList };
          case 'BL_NO':
            return { ...baseRequestData, blNos: searchKeywordList };
          case 'BK_NO':
            return { ...baseRequestData, bkNos: searchKeywordList };
          case 'VESSEL_NAME':
            return { ...baseRequestData, vesselNames: searchKeywordList };
          default:
            return baseRequestData;
        }
      }
    }

    return baseRequestData;
  };

  const tContainerRequestData = createTContainerRequestData();

  // 페이지네이션 상태 (URL 쿼리 파라미터에서 초기화)
  const [pagination, setPagination] =
    useState<PaginationState>(getInitialPagination);

  // sessionStorage에 페이지네이션 상태 저장
  const savePaginationToStorage = (newPagination: PaginationState) => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(
          't-container-pagination',
          JSON.stringify(newPagination)
        );
      } catch (error) {
        console.warn(
          'Failed to save pagination state to sessionStorage:',
          error
        );
      }
    }
  };

  // 페이지 변경 핸들러 (sessionStorage 동기화)
  const handlePageChange = (newPage: number) => {
    const newPagination = { ...pagination, page: newPage };
    setPagination(newPagination);
    savePaginationToStorage(newPagination);
  };

  // 페이지 크기 변경 핸들러 (sessionStorage 동기화)
  const handlePageSizeChange = (newSize: number) => {
    const newPagination = {
      ...pagination,
      size: newSize,
      page: 0, // 페이지 크기 변경 시 첫 페이지로 이동
    };
    setPagination(newPagination);
    savePaginationToStorage(newPagination);
  };

  // 검색 창 보여지는 컬럼 설정
  const [visibleColumnObject, setVisibleColumnObject] =
    useState<ColumnObject>(DEFAULT_COLUMN);

  const handleVisibleColumnObjectChange = (columnName: ColumnName) => {
    setVisibleColumnObject(prev => ({
      ...prev,
      [columnName]: {
        ...prev[columnName],
        visible: !prev[columnName].visible,
      },
    }));
  };

  const {
    data: tContainerListData,
    isError,
    isFetching,
    refetch,
  } = useTContainerList(tContainerRequestData, pagination);

  // 검색 실행 핸들러 (같은 키워드 재검색을 위해 필요)
  const handleSearch = () => {
    refetch();
  };

  const totalCount = tContainerListData?.totalRows;

  const { informationNotFound, duplicateSearch } = calculateSearchFailure(
    searchKeywordFilter,
    tContainerListData
  );
  const totalSearchFailure = informationNotFound + duplicateSearch;

  const pageSizeOptions = [10, 20, 50, 100];

  const [isExcelDownloadModalOpen, setIsExcelDownloadModalOpen] =
    useState(false);

  return (
    <div className="flex flex-col h-screen min-w-[1800px]">
      {/* 헤더 부분 */}
      <header className="flex-shrink-0">
        <div className="flex flex-row justify-between p-4">
          <div className="flex flex-col">
            <h2 className="opacity-40">환적 컨테이너 조회</h2>
            <h1>화물 모니터링</h1>
          </div>
          <div className="flex flex-row gap-2 items-center">
            {isError || !totalCount ? (
              <p className="font-bold">총 0개</p>
            ) : totalCount ? (
              <p className="font-bold">총 {totalCount}개</p>
            ) : (
              <Skeleton className="w-20 h-7" />
            )}

            <Button
              variant="secondary"
              className="text-white cursor-pointer"
              onClick={() => setIsExcelDownloadModalOpen(true)}
              disabled={isError || !tContainerListData || isFetching}
            >
              <ExcelIcon />
              엑셀 다운로드
            </Button>

            {isExcelDownloadModalOpen && (
              <ExcelDownloadModal
                isOpen={isExcelDownloadModalOpen}
                onClose={() => setIsExcelDownloadModalOpen(false)}
                visibleColumnList={visibleColumnObject}
                tContainerListData={tContainerListData}
              />
            )}
          </div>
        </div>
      </header>

      {/* 검색 필터 */}
      <TContainerSearchFilters
        searchFilter={searchFilter}
        searchKeywordFilter={searchKeywordFilter}
        onFilterChange={handleFilterChange}
        onSearchTypeChange={handleSearchTypeChange}
        onSearchKeywordChange={handleSearchKeywordChange}
        onSearch={handleSearch}
        visibleColumnObject={visibleColumnObject}
        onVisibleColumnObjectChange={handleVisibleColumnObjectChange}
        isFetching={isFetching}
        isError={isError}
      />

      {/* 컨테이너 테이블 */}
      <TContainerTable
        visibleColumnObject={visibleColumnObject}
        containers={tContainerListData?.monitoringContainers || []}
        isError={isError}
        isFetching={isFetching}
      />

      {/* 푸터 */}
      <footer className="bg-white border-t border-stroke flex-shrink-0">
        <div className="flex flex-row items-center w-full justify-center gap-2 py-8 px-4 flex-nowrap">
          <Badge variant="gray" className="text-sm py-1">
            컨테이너 수
            <span className="font-bold">
              총 {isError || !totalCount ? 0 : totalCount}개
            </span>
          </Badge>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge
                variant="outlineDestructive"
                className="text-sm py-1 cursor-help"
              >
                조회실패
                <span className="font-bold underline">
                  {totalSearchFailure}건
                </span>
              </Badge>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="bg-[#FDE7E9] text-red-500 fill-[#FDE7E9]"
            >
              <div className="text-center">
                <div>정보없음 {informationNotFound}건</div>
                <div>중복검색 {duplicateSearch}건</div>
              </div>
            </TooltipContent>
          </Tooltip>

          {/* 페이지네이션 */}
          <TContainerPagination
            tContainerListData={tContainerListData}
            isFetching={isFetching}
            isError={isError}
            currentPage={pagination.page}
            currentPageSize={pagination.size}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />

          {/* 조회결과 Badge에 페이지 크기 정보와 선택 기능 추가 */}
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-600">페이지당</span>
            <Select
              value={String(pagination.size)}
              onValueChange={value => handlePageSizeChange(Number(value))}
              disabled={isFetching || isError}
            >
              <SelectTrigger className="w-20 h-7">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map(size => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-sm text-gray-600">개</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TContainerPage;

'use client';

import { Settings } from 'lucide-react';

import { AccumulationFilter } from '@/app/t-container/_component/accumulation-filter';
import { AnomalyFilter } from '@/app/t-container/_component/anomaly-filter';
import { OperationStatusFilter } from '@/app/t-container/_component/operation-status-filter';
import { SearchBar } from '@/app/t-container/_component/search-bar';
import { TerminalFilter } from '@/app/t-container/_component/terminal-filter';
import { DEFAULT_COLUMN } from '@/app/t-container/t-container.constants';
import {
  ColumnName,
  ColumnObject,
  OperationStatus,
  SearchFilter,
  SearchKeywordFilter,
  TerminalId,
} from '@/app/t-container/t-container.type';
import { Button } from '@/component/shadcn-ui/button';
import { Checkbox } from '@/component/shadcn-ui/checkbox';
import { Label } from '@/component/shadcn-ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/component/shadcn-ui/popover';

type TContainerSearchFiltersProps = {
  searchFilter: SearchFilter;
  searchKeywordFilter: SearchKeywordFilter;
  onFilterChange: (updates: Partial<SearchFilter>) => void;
  onSearchTypeChange: (searchType: SearchKeywordFilter['searchType']) => void;
  onSearchKeywordChange: (searchKeyword: string) => void;
  onSearch: () => void;
  visibleColumnObject: ColumnObject;
  onVisibleColumnObjectChange: (columnName: ColumnName) => void;
  isFetching: boolean;
  isError: boolean;
};

const TContainerSearchFilters = ({
  searchFilter,
  searchKeywordFilter,
  onFilterChange,
  onSearchTypeChange,
  onSearchKeywordChange,
  onSearch,
  visibleColumnObject,
  onVisibleColumnObjectChange,
  isFetching,
  isError,
}: TContainerSearchFiltersProps) => {
  const handleTerminalChange = (terminals: number[]) => {
    onFilterChange({ selectedTerminals: terminals as TerminalId[] });
  };

  const handleAnomalyChange = (
    field: keyof Pick<
      SearchFilter,
      'normalYn' | 'gateInUnavailableYn' | 'nonArrivalYn' | 'loadingCancelYn'
    >,
    value: boolean
  ) => {
    onFilterChange({ [field]: value });
  };

  const handleOperationStatusChange = (status: OperationStatus) => {
    onFilterChange({ operationStatus: status });
  };

  const handleAccumulationChange = (accumulated: boolean) => {
    onFilterChange({ accumulatedYn: accumulated });
  };

  const handleSearch = (keyword: string) => {
    // 현재 검색 키워드와 비교하여 변경된 경우에만 상태 업데이트
    if (searchKeywordFilter.searchKeyword !== keyword) {
      onSearchKeywordChange(keyword);
    } else {
      // 같은 키워드인 경우 강제 검색만 실행
      onSearch();
    }
  };

  return (
    <div className="bg-filter">
      <div className="overflow-x-auto overflow-y-hidden w-full">
        {/* 상단 필터들 */}
        <div className="flex flex-row gap-2 items-center justify-between border-b border-stroke">
          <div className="flex flex-row gap-2 items-center px-4">
            {/* 터미널(신항/북항) 필터 */}
            <TerminalFilter
              selectedTerminals={searchFilter.selectedTerminals}
              onTerminalChange={handleTerminalChange}
              isFetching={isFetching}
              isError={isError}
            />
          </div>

          <div className="flex flex-row gap-5 items-center pr-20">
            {/* 이상탐지 필터 */}
            <AnomalyFilter
              normalYn={searchFilter.normalYn}
              gateInUnavailableYn={searchFilter.gateInUnavailableYn}
              nonArrivalYn={searchFilter.nonArrivalYn}
              loadingCancelYn={searchFilter.loadingCancelYn}
              onAnomalyChange={handleAnomalyChange}
              isFetching={isFetching}
              isError={isError}
            />

            {/* 작업 상태 필터 */}
            <OperationStatusFilter
              operationStatus={searchFilter.operationStatus}
              onOperationStatusChange={handleOperationStatusChange}
              isFetching={isFetching}
              isError={isError}
            />

            {/* 누적 필터 */}
            <AccumulationFilter
              accumulatedYn={searchFilter.accumulatedYn}
              onAccumulationChange={handleAccumulationChange}
              isFetching={isFetching}
              isError={isError}
            />
          </div>
        </div>

        {/* 하단 검색 및 컬럼 선택 */}
        <div className="flex flex-row px-4 py-2 justify-between items-center gap-2">
          {/* 검색 필터 */}
          <SearchBar
            searchType={searchKeywordFilter.searchType}
            searchKeyword={searchKeywordFilter.searchKeyword}
            onSearchTypeChange={onSearchTypeChange}
            onSearch={handleSearch}
            isFetching={isFetching}
            isError={isError}
          />

          {/* 컬럼 선택 */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="cursor-pointer"
                disabled={isFetching || isError}
              >
                <Settings />
                컬럼 선택
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" side="bottom">
              <div className="grid grid-cols-2 gap-4">
                {Object.values(DEFAULT_COLUMN)
                  .sort((a, b) => a.order - b.order)
                  .map(({ name: id, label }) => (
                    <div key={id} className="flex flex-row gap-2 items-center">
                      <Checkbox
                        id={id}
                        checked={visibleColumnObject[id]?.visible && true}
                        onCheckedChange={() => onVisibleColumnObjectChange(id)}
                      />
                      <Label variant="custom" htmlFor={id}>
                        {label}
                      </Label>
                    </div>
                  ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export { TContainerSearchFilters };

'use client';

import { useCallback } from 'react';

import { SearchInput } from '@/app/t-container/_component/search-input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/component/shadcn-ui/select';

type SearchType = 'CON_NO' | 'BL_NO' | 'BK_NO' | 'VESSEL_NAME';

type SearchFilterProps = {
  searchType: SearchType;
  searchKeyword: string;
  onSearchTypeChange: (type: SearchType) => void;
  onSearch: (keyword: string) => void;
  isFetching: boolean;
  isError: boolean;
};

const SEARCH_TYPE_OPTIONS = [
  { value: 'CON_NO', label: '컨테이너 번호' },
  { value: 'BL_NO', label: 'B/L No.' },
  { value: 'BK_NO', label: 'BK No.' },
  { value: 'VESSEL_NAME', label: '선박명' },
];

const SearchBar = ({
  searchType,
  searchKeyword,
  onSearchTypeChange,
  onSearch,
  isFetching,
  isError,
}: SearchFilterProps) => {
  const getPlaceholder = useCallback(() => {
    switch (searchType) {
      case 'CON_NO':
        return '컨테이너 번호를 입력하세요.';
      case 'BL_NO':
        return 'B/L 번호를 입력하세요.';
      case 'BK_NO':
        return 'BK 번호를 입력하세요.';
      case 'VESSEL_NAME':
        return '선박명을 입력하세요.';
      default:
        return '검색어를 입력하세요.';
    }
  }, [searchType]);

  return (
    <div className="flex flex-row gap-2 items-center w-full">
      <Select
        value={searchType}
        onValueChange={onSearchTypeChange}
        disabled={isFetching || isError}
      >
        <SelectTrigger variant="custom" suppressHydrationWarning>
          <SelectValue placeholder="검색 조건을 선택하세요" />
        </SelectTrigger>
        <SelectContent variant="custom">
          <SelectGroup>
            <SelectLabel>검색 조건</SelectLabel>
            {SEARCH_TYPE_OPTIONS.map(option => (
              <SelectItem
                key={option.value}
                className="cursor-pointer"
                value={option.value}
                disabled={isFetching || isError}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <SearchInput
        placeholder={getPlaceholder()}
        initialValue={searchKeyword}
        onSearch={onSearch}
        disabled={isFetching || isError}
      />
    </div>
  );
};

export { SearchBar };

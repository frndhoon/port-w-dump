import { Search } from 'lucide-react';
import * as React from 'react';

import { Input } from '@/component/shadcn-ui/input';
import { cn } from '@/lib/shadcn.lib';

type SearchInputProps = Omit<
  React.ComponentProps<typeof Input>,
  'value' | 'onChange'
> & {
  maxKeywords?: number;
  onSearch?: (keyword: string) => void;
  initialValue?: string;
};

const SearchInput = ({
  className,
  placeholder = 'placeholder',
  initialValue = '',
  maxKeywords = 100,
  onSearch,
  ...props
}: SearchInputProps) => {
  const [inputValue, setInputValue] = React.useState(initialValue);

  // 콤마로 분리해서 키워드 개수 계산 (빈 문자열 제외)
  const keywords = String(inputValue)
    .split(',')
    .map(keyword => keyword.trim())
    .filter(keyword => keyword.length > 0);

  const keywordCount = keywords.length;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(inputValue);
    }
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(inputValue);
    }
  };

  return (
    <div className="flex h-8 flex-1 items-center gap-x-4 rounded-lg bg-white px-6 py-4">
      {/* 입력 필드 */}
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        maxLength={250}
        onKeyDown={handleKeyDown}
        className={cn(
          'w-full border-none p-0 text-sm font-light tracking-tight text-black bg-transparent focus:outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />

      {/* 키워드 카운터 */}
      <span className="text-sm opacity-50">
        {keywordCount}/{maxKeywords}
      </span>

      {/* 검색 아이콘 */}
      <button type="button" onClick={handleSearchClick}>
        <Search className="h-4 w-4 cursor-pointer" />
      </button>
    </div>
  );
};

export { SearchInput };

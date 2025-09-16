import { Search } from 'lucide-react';
import * as React from 'react';

import { Input } from '@/component/shadcn-ui/input';
import { cn } from '@/lib/shadcn.lib';

interface SearchInputProps extends React.ComponentProps<typeof Input> {
  maxKeywords?: number;
}

const SearchInput = ({
  className,
  placeholder = 'placeholder',
  value = '',
  maxKeywords = 100,
  ...props
}: SearchInputProps) => {
  // 콤마로 분리해서 키워드 개수 계산 (빈 문자열 제외)
  const keywords = String(value)
    .split(',')
    .map(keyword => keyword.trim())
    .filter(keyword => keyword.length > 0);

  const keywordCount = keywords.length;

  return (
    <div className="flex h-8 flex-1 items-center gap-x-4 rounded-lg bg-white px-6 py-4">
      {/* 입력 필드 */}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
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
      <button type="button">
        <Search className="h-4 w-4 cursor-pointer" />
      </button>
    </div>
  );
};

export { SearchInput };

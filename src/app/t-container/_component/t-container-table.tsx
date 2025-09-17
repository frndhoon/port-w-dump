'use client';

import { Check, Copy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  ColumnName,
  ColumnObject,
  MonitoringContainer,
} from '@/app/t-container/t-container.type';
import { Skeleton } from '@/component/shadcn-ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/component/shadcn-ui/table';

type SortDirection = 'asc' | 'desc' | null;

type SortState = {
  column: ColumnName | null;
  direction: SortDirection;
};

type ContainerTableProps = {
  containers: MonitoringContainer[];
  isFetching?: boolean;
  isError?: boolean;
  visibleColumnObject: ColumnObject;
};

const ROW_HEIGHT = 40; // 고정 행 높이 (px)
const MIN_VISIBLE_ROWS = 13; // 최소 표시할 행 개수

// 복사 가능한 컬럼들
const COPYABLE_COLUMNS: ColumnName[] = [
  'conNo',
  'dischargeVesselName',
  'loadingVesselName',
  'bookingNo',
  'blNo',
];

const TContainerTable = ({
  containers,
  isFetching,
  isError,
  visibleColumnObject,
}: ContainerTableProps) => {
  const router = useRouter();

  const handleRowClick = (containerId: number) => {
    // 깔끔한 URL로 상세 페이지 이동 (쿼리 파라미터 없음)
    router.push(`/t-container/${containerId}`);
  };

  // 정렬 상태 관리
  const [sortState, setSortState] = useState<SortState>({
    column: null,
    direction: null,
  });

  // 복사 상태 관리 (컨테이너 ID와 컬럼 ID 조합으로 키 생성)
  const [copiedCells, setCopiedCells] = useState<Set<string>>(new Set());

  // 복사 기능
  const copyToClipboard = async (
    text: string,
    containerId: number,
    columnId: string
  ) => {
    try {
      await navigator.clipboard.writeText(text);

      // 복사 성공 시 해당 셀을 복사됨 상태로 표시
      const cellKey = `${containerId}-${columnId}`;
      setCopiedCells(prev => new Set(prev).add(cellKey));

      // 1.5초 후 복사 상태 해제
      setTimeout(() => {
        setCopiedCells(prev => {
          const newSet = new Set(prev);
          newSet.delete(cellKey);
          return newSet;
        });
      }, 1500);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  const formatDateTime = (dateTime: string | null) => {
    if (!dateTime) return '-';

    try {
      const date = new Date(dateTime);
      return date
        .toLocaleString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
        .replace(/\./g, '.')
        .replace(/,/g, '');
    } catch {
      return dateTime;
    }
  };

  const getTransshipmentType = (container: MonitoringContainer) => {
    if (
      container.loadingTerminalName === null ||
      container.dischargeTerminalName === null
    ) {
      return '-';
    }
    if (container.loadingTerminalName || container.dischargeTerminalName) {
      return container.loadingTerminalName === container.dischargeTerminalName
        ? '자부두'
        : '타부두';
    }
    return '-';
  };

  // 컬럼별 정렬값 추출 함수
  const getSortValue = (container: MonitoringContainer, columnId: string) => {
    switch (columnId) {
      case 'transshipmentType':
        return getTransshipmentType(container);
      case 'dischargeCompletedAt':
      case 'dischargeYardAt':
      case 'dischargeGateOutAt':
      case 'loadingGateInAt':
      case 'loadingYardAt':
      case 'loadingCompletedAt': {
        const dateValue = container[columnId as keyof MonitoringContainer] as
          | string
          | null;
        return dateValue ? new Date(dateValue).getTime() : 0;
      }
      case 'size': {
        // 20, 40, 45 등의 숫자로 정렬
        const sizeValue = container[
          columnId as keyof MonitoringContainer
        ] as string;
        return parseInt(sizeValue) || 0;
      }
      case 'id':
        return container.id;
      default: {
        const value = container[columnId as keyof MonitoringContainer];
        return typeof value === 'string' ? value.toLowerCase() : value || '';
      }
    }
  };

  // 정렬 함수
  const sortContainers = (containersToSort: MonitoringContainer[]) => {
    if (!sortState.column || !sortState.direction) {
      return containersToSort;
    }

    return [...containersToSort].sort((a, b) => {
      const aValue = getSortValue(a, sortState.column!);
      const bValue = getSortValue(b, sortState.column!);

      if (aValue === bValue) return 0;

      const comparison = aValue > bValue ? 1 : -1;
      return sortState.direction === 'asc' ? comparison : -comparison;
    });
  };

  // 헤더 클릭 핸들러
  const handleSort = (columnName: ColumnName) => {
    setSortState(currentSort => {
      if (currentSort.column === columnName) {
        // 같은 컬럼 클릭 시: asc -> desc -> null 순환
        const nextDirection: SortDirection =
          currentSort.direction === 'asc'
            ? 'desc'
            : currentSort.direction === 'desc'
              ? null
              : 'asc';

        return {
          column: nextDirection ? columnName : null,
          direction: nextDirection,
        };
      } else {
        // 다른 컬럼 클릭 시: 오름차순으로 시작
        return {
          column: columnName,
          direction: 'asc',
        };
      }
    });
  };

  // 정렬 아이콘 컴포넌트
  const SortIcon = ({ columnName }: { columnName: ColumnName }) => {
    if (sortState.column !== columnName) {
      return null; // 기본 상태에서는 아이콘 표시하지 않음
    }

    if (sortState.direction === 'asc') {
      return <span className="text-primary ml-1">↑</span>;
    }

    if (sortState.direction === 'desc') {
      return <span className="text-primary ml-1">↓</span>;
    }

    return null; // 정렬이 해제된 상태에서도 아이콘 표시하지 않음
  };

  // 복사 버튼 컴포넌트
  const CopyButton = ({
    text,
    containerId,
    columnId,
    isCopied,
  }: {
    text: string;
    containerId: number;
    columnId: string;
    isCopied: boolean;
  }) => (
    <button
      onClick={e => {
        e.stopPropagation();
        copyToClipboard(text, containerId, columnId);
      }}
      onMouseDown={e => {
        e.preventDefault();
      }}
      className="cursor-pointer absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100  p-1 bg-white hover:shadow-md rounded-full z-10"
      title={isCopied ? '복사됨' : '복사'}
    >
      {isCopied ? (
        <Check size={14} className="hover:opacity-50" />
      ) : (
        <Copy size={14} className="hover:opacity-50" />
      )}
    </button>
  );

  // 셀 데이터 추출 함수
  const getCellData = (container: MonitoringContainer, columnId: string) => {
    switch (columnId) {
      case 'transshipmentType':
        return getTransshipmentType(container);
      case 'dischargeCompletedAt':
      case 'dischargeYardAt':
      case 'dischargeGateOutAt':
      case 'loadingGateInAt':
      case 'loadingYardAt':
      case 'loadingCompletedAt':
        return formatDateTime(
          container[columnId as keyof MonitoringContainer] as string | null
        );
      default:
        return container[columnId as keyof MonitoringContainer] || '-';
    }
  };

  // 보이는 컬럼들을 order 순으로 정렬
  const sortedVisibleColumns = Object.values(visibleColumnObject)
    .filter(column => column.visible)
    .sort((a, b) => a.order - b.order);

  // 정렬된 컨테이너 목록
  const sortedContainers = sortContainers(containers);

  // 테이블 헤더 컴포넌트 분리
  const TableHeaderComponent = () => (
    <TableHeader className="[&_tr]:border-b sticky top-0 z-10 bg-filter">
      <TableRow className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors [&_th]:text-center">
        {sortedVisibleColumns.map(column => (
          <TableHead
            key={column.name}
            className={`text-foreground h-10 border-r border-r-stroke px-2 text-center align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] cursor-pointer hover:bg-gray-50 select-none ${column.width || 'w-32'}`}
            onClick={() => handleSort(column.name)}
          >
            <div className="flex items-center justify-center">
              <span>{column.label}</span>
              <SortIcon columnName={column.name as ColumnName} />
            </div>
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );

  // 로딩 상태 테이블 바디
  const LoadingTableBody = () => (
    <TableBody className="[&_tr:last-child]:border-0 bg-white">
      {Array.from({ length: MIN_VISIBLE_ROWS }).map((_, index) => (
        <TableRow
          key={`skeleton-${index}`}
          style={{ height: `${ROW_HEIGHT}px` }}
        >
          {sortedVisibleColumns.map(config => (
            <TableCell
              key={config.name}
              className="p-2 align-middle border border-stroke first:border-l-0 last:border-r-0"
              style={{ height: `${ROW_HEIGHT}px` }}
            >
              <Skeleton className="h-6 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );

  // 빈 데이터 테이블 바디
  const EmptyTableBody = () => (
    <TableBody className="[&_tr:last-child]:border-0 bg-white">
      <TableRow style={{ height: `${ROW_HEIGHT * 3}px` }}>
        <TableCell
          colSpan={sortedVisibleColumns.length}
          className="p-8 text-center text-gray-500"
          style={{ height: `${ROW_HEIGHT * 3}px` }}
        >
          검색 결과가 없습니다.
        </TableCell>
      </TableRow>
    </TableBody>
  );

  // 에러 테이블 바디
  const ErrorTableBody = () => (
    <TableBody className="[&_tr:last-child]:border-0 bg-white">
      <TableRow style={{ height: `${ROW_HEIGHT * 3}px` }}>
        <TableCell
          colSpan={sortedVisibleColumns.length}
          className="text-center text-gray-500"
          style={{ height: `${ROW_HEIGHT * 3}px` }}
        >
          <p>데이터 조회에 실패했습니다.</p>
          <p>잠시 후 다시 시도해주세요.</p>
        </TableCell>
      </TableRow>
      {/* 나머지 빈 행들 */}
      {Array.from({ length: MIN_VISIBLE_ROWS - 3 }).map((_, index) => (
        <EmptyRow key={`empty-${index}`} index={index} />
      ))}
    </TableBody>
  );

  // 빈 행 컴포넌트 (데이터가 적을 때 빈 공간 채우기용)
  const EmptyRow = ({ index }: { index: number }) => (
    <TableRow
      key={`empty-${index}`}
      className="border-b transition-colors"
      style={{ height: `${ROW_HEIGHT}px` }}
    >
      {sortedVisibleColumns.map(config => (
        <TableCell
          key={config.name}
          className="p-2 align-middle border border-stroke first:border-l-0 last:border-r-0"
          style={{ height: `${ROW_HEIGHT}px` }}
        />
      ))}
    </TableRow>
  );

  // 데이터 테이블 바디
  const DataTableBody = () => {
    const dataRows = sortedContainers.map(container => (
      <TableRow
        key={container.id}
        className="data-[state=selected]:bg-muted border-b transition-colors [&_td]:text-center hover:bg-[#EEF0FC] cursor-pointer"
        style={{ height: `${ROW_HEIGHT}px` }}
      >
        {sortedVisibleColumns.map(config => {
          const cellData = getCellData(container, config.name);
          const isCopyable = COPYABLE_COLUMNS.includes(
            config.name as ColumnName
          );
          const rawValue =
            (container[config.name as keyof MonitoringContainer] as string) ||
            '-';
          const cellKey = `${container.id}-${config.name}`;
          const isCopied = copiedCells.has(cellKey);

          return (
            <TableCell
              key={config.name}
              className={`p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] border border-stroke first:border-l-0 last:border-r-0 ${isCopyable ? 'group relative' : ''}`}
              style={{ height: `${ROW_HEIGHT}px` }}
              onClick={() => handleRowClick(container.id)}
            >
              <span>{cellData}</span>
              {isCopyable && rawValue !== '-' && (
                <CopyButton
                  text={rawValue}
                  containerId={container.id}
                  columnId={config.name}
                  isCopied={isCopied}
                />
              )}
            </TableCell>
          );
        })}
      </TableRow>
    ));

    // 데이터가 적을 때 빈 행으로 나머지 공간 채우기
    const emptyRows = [];
    const dataCount = sortedContainers.length;
    const remainingRows = Math.max(0, MIN_VISIBLE_ROWS - dataCount);

    for (let i = 0; i < remainingRows; i++) {
      emptyRows.push(<EmptyRow key={`empty-${i}`} index={i} />);
    }

    return (
      <TableBody className="[&_tr:last-child]:border-0 bg-white">
        {dataRows}
        {emptyRows}
      </TableBody>
    );
  };

  // 상태에 따른 테이블 바디 렌더링
  const renderTableBody = () => {
    if (isFetching) return <LoadingTableBody />;
    if (isError) return <ErrorTableBody />;
    if (containers.length === 0) return <EmptyTableBody />;
    return <DataTableBody />;
  };

  return (
    // TODO: 확대 시 테이블 높이 안 맞음
    <Table className="text-base min-w-max table-fixed h-[calc(100vh-300px)]">
      <TableHeaderComponent />
      {renderTableBody()}
    </Table>
  );
};

export { TContainerTable };

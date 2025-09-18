'use client';

import { useState } from 'react';

import { useExcelDownload } from '@/app/t-container/_hook/useExcelDownload';
import { convertToExcelData } from '@/app/t-container/_util/excel-utils';
import {
  ColumnObject,
  TContainerListResponse,
} from '@/app/t-container/t-container.type';
import { Button } from '@/component/shadcn-ui/button';
import { Checkbox } from '@/component/shadcn-ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/component/shadcn-ui/dialog';
import { Label } from '@/component/shadcn-ui/label';
import { VesselLoader } from '@/component/vessel-loader';

const ExcelDownloadModal = ({
  isOpen,
  onClose,
  visibleColumnList,
  tContainerListData,
}: {
  isOpen: boolean;
  onClose: () => void;
  visibleColumnList: ColumnObject;
  tContainerListData: TContainerListResponse['result'] | undefined;
}) => {
  // 현재 보이는 컬럼들만 선택된 상태로 초기화
  const [selectedColumns, setSelectedColumns] = useState<
    Record<string, boolean>
  >(() => {
    const initial: Record<string, boolean> = {};
    Object.values(visibleColumnList).forEach(col => {
      initial[col.name] = col.visible === true; // visible이 true인 것만 선택
    });
    return initial;
  });

  // 엑셀 다운로드 훅 사용
  const { downloadExcel, isDownloading } = useExcelDownload({
    onSuccess: () => onClose(),
  });

  const selectedCount = Object.values(selectedColumns).filter(Boolean).length;
  const totalCount = Object.values(visibleColumnList).length;
  const isAllSelected = selectedCount === totalCount;

  const handleSelectAll = () => {
    const newSelected: Record<string, boolean> = {};
    Object.values(visibleColumnList).forEach(col => {
      newSelected[col.name] = !isAllSelected;
    });
    setSelectedColumns(newSelected);
  };

  const handleColumnToggle = (columnId: string) => {
    setSelectedColumns(prev => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  const handleDownload = async () => {
    // 선택된 컬럼들만 필터링
    const selectedColumnNames = Object.entries(selectedColumns)
      .filter(([, isSelected]) => isSelected)
      .map(([columnName]) => columnName);

    if (selectedColumnNames.length === 0) {
      alert('다운로드할 컬럼을 선택해주세요.');
      return;
    }

    if (!tContainerListData?.monitoringContainers?.length) {
      alert('다운로드할 데이터가 없습니다.');
      return;
    }

    try {
      // 엑셀 데이터로 변환
      const excelData = convertToExcelData(
        tContainerListData,
        selectedColumnNames,
        visibleColumnList
      );

      // 파일명에 현재 날짜 추가
      const now = new Date();
      const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD 형식
      const filename = `t-container-list-${dateStr}.xlsx`;

      // excelData의 각 셀에서 undefined를 빈 문자열로 변환하여 타입 오류 방지
      const sanitizedExcelData = excelData.map(row =>
        row.map(cell => (cell === undefined ? '' : cell))
      );

      // 엑셀 다운로드 실행
      await downloadExcel(
        sanitizedExcelData,
        filename,
        '환적 컨테이너 조회 목록'
      );
    } catch (error) {
      console.error('엑셀 다운로드 중 오류 발생:', error);
      alert('엑셀 다운로드 중 오류가 발생했습니다.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col max-w-[calc(100vw-10rem)] w-[55rem]">
        {/* 헤더 */}
        <DialogHeader className="flex flex-row justify-between">
          <DialogTitle className="text-left font-semibold">
            엑셀 다운로드
          </DialogTitle>
        </DialogHeader>

        {/* 설명 */}
        <DialogDescription>
          엑셀파일에 포함할 정보의 컬럼을 선택하세요.
        </DialogDescription>

        {/* 전체선택 */}
        <div className="flex items-center gap-x-3">
          <Checkbox
            checked={isAllSelected}
            onCheckedChange={handleSelectAll}
            variant="custom"
            id="all-select"
          />
          <Label className="text-sm cursor-pointer" htmlFor="all-select">
            전체선택
          </Label>
        </div>

        {/* 컬럼 리스트 */}
        <div className="overflow-x-auto">
          <div className="grid grid-flow-col grid-rows-7 text-sm gap-x-2 min-w-max">
            {Object.values(visibleColumnList).map((column, index) => (
              <div
                key={column.name}
                className="flex flex-wrap gap-2 items-center border-r border-r-stroke pl-0 py-3 pr-4 min-w-[250px] whitespace-nowrap"
              >
                <div className="flex items-center gap-2 rounded-lg px-2 bg-gray-100 w-16">
                  <span>컬럼</span>
                  <span className="ml-auto">{index + 1}</span>
                </div>
                <Label
                  className="font-medium text-primary cursor-pointer"
                  htmlFor={column.name}
                >
                  {column.label}
                </Label>
                <div className="ml-auto flex items-center">
                  <Checkbox
                    checked={selectedColumns[column.name] || false}
                    onCheckedChange={() => handleColumnToggle(column.name)}
                    id={column.name}
                    variant="custom"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 다운로드 */}
        <div className="ml-auto flex gap-x-4">
          <Button
            onClick={handleDownload}
            className="cursor-pointer"
            disabled={isDownloading}
          >
            {isDownloading ? '다운로드 중...' : '다운로드'}
          </Button>
        </div>
      </DialogContent>

      {/* 로딩 오버레이 */}
      {isDownloading && <VesselLoader />}
    </Dialog>
  );
};

export { ExcelDownloadModal };

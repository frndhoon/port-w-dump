'use client';

import { useExcelDownload } from '@/app/t-container/_hook/useExcelDownload';
import { convertOperationLogToExcelData } from '@/app/t-container/_util/excel-utils';
import { Operation } from '@/app/t-container/t-container.type';
import { ExcelIcon } from '@/component/icons';
import { Button } from '@/component/shadcn-ui/button';
import { VesselLoader } from '@/component/vessel-loader';

type ExcelDownloadButtonProps = {
  operations: Operation[];
  conNo?: string;
};

export const ExcelDownloadButton = ({
  operations,
  conNo,
}: ExcelDownloadButtonProps) => {
  const { downloadExcel, isDownloading } = useExcelDownload();

  const handleDownload = async () => {
    const excelData = convertOperationLogToExcelData(operations);
    await downloadExcel(
      excelData,
      `excel-container-work-log-${conNo}.xlsx`,
      '작업 로그'
    );
  };

  return (
    <>
      <Button
        className="text-white cursor-pointer"
        onClick={handleDownload}
        disabled={isDownloading}
      >
        <ExcelIcon />
        {isDownloading ? '다운로드 중...' : '엑셀 다운로드'}
      </Button>
      {isDownloading && <VesselLoader />}
    </>
  );
};

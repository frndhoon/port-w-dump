import { toast } from 'sonner';
import * as XLSX from 'xlsx';

import {
  ColumnObject,
  MonitoringContainer,
  Operation,
  TContainerListResponse,
} from '@/app/t-container/t-container.type';

// TODO: monitoring/list/all 로 구현해야함

// 엑셀 다운로드를 위한 데이터 변환 함수
export const convertToExcelData = (
  tContainerListData: TContainerListResponse['result'] | undefined,
  selectedColumns: string[],
  visibleColumnObject: ColumnObject
) => {
  if (!tContainerListData?.monitoringContainers) {
    return [];
  }

  // 선택된 컬럼들의 순서대로 헤더 생성
  const headers = selectedColumns.map(columnName => {
    const column = Object.values(visibleColumnObject).find(
      col => col.name === columnName
    );
    return column?.label || columnName;
  });

  // 데이터 행 생성
  const rows = tContainerListData.monitoringContainers.map(container => {
    return selectedColumns.map(columnName => {
      // 컨테이너 데이터에서 해당 컬럼의  추출
      const value = getContainerValue(container, columnName);
      return value;
    });
  });

  return [headers, ...rows];
};

// 컨테이너 객체에서 특정 컬럼의 값을 추출하는 함수
const getContainerValue = (
  container: MonitoringContainer,
  columnName: string
): string | undefined => {
  // 컬럼명 따라 적절한 값을 반환
  switch (columnName) {
    case 'conNo':
      return container.conNo || '';
    case 'blNo':
      return container.blNo || '';
    case 'bookingNo':
      return container.bookingNo || '';
    case 'loadingVesselName':
      return container.loadingVesselName || '';
    case 'dischargeVesselName':
      return container.dischargeVesselName || '';
    case 'transshipmentType':
      return container.transshipmentType || '';
    case 'dischargeCompletedAt':
      return container.dischargeCompletedAt
        ? new Date(container.dischargeCompletedAt).toLocaleString()
        : '';
    case 'dischargeYardAt':
      return container.dischargeYardAt
        ? new Date(container.dischargeYardAt).toLocaleString()
        : '';
    case 'dischargeGateOutAt':
      return container.dischargeGateOutAt
        ? new Date(container.dischargeGateOutAt).toLocaleString()
        : '';
    case 'loadingGateInAt':
      return container.loadingGateInAt
        ? new Date(container.loadingGateInAt).toLocaleString()
        : '';
    case 'nonArrivalYn':
      return container.loadingYardAt
        ? new Date(container.loadingYardAt).toLocaleString()
        : '';
    case 'loadingCompletedAt':
      return container.loadingCompletedAt
        ? new Date(container.loadingCompletedAt).toLocaleString()
        : '';
  }
};

// 작업 로그 엑셀 다운로드를 위한 데이터 변환 함수
export const convertOperationLogToExcelData = (operations: Operation[]) => {
  if (!operations || operations.length === 0) {
    return [];
  }

  // 헤더 정의
  const headers = [
    '작업 단계',
    '작업 주체',
    '작업 상태',
    '작업 시작 일시',
    '작업 종료 일시',
  ];

  // 데이터 행 생성
  const rows = operations.map(operation => [
    operation.operationType || '',
    operation.terminalName || '',
    operation.operationStatus || '',
    operation.operationStartedTime || '-',
    operation.operationEndedTime || '-',
  ]);

  return [headers, ...rows];
};

// 로딩 상태를 관리하는 함수
export const downloadExcelWithLoading = async (
  data: (string | number)[][],
  filename: string = 't-container-list.xlsx',
  title: string = '엑셀 파일',
  onLoadingChange?: (isLoading: boolean) => void
) => {
  try {
    // 로딩 시작
    onLoadingChange?.(true);

    // 약간의 지연을 주어 사용자가 로딩 상태를 인지할 수 있도록 함
    await new Promise(resolve => setTimeout(resolve, 800));

    // 워크시트 생성
    const ws = XLSX.utils.aoa_to_sheet(data);

    // 워크북 생성
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // 파일 다운로드
    XLSX.writeFile(wb, filename);

    toast.success(`${title} 다운로드가 완료되었습니다.`);
  } catch (error) {
    toast.error('다운로드 중 오류가 발생했습니다.');
    console.error('Excel download error:', error);
  } finally {
    // 로딩 종료
    onLoadingChange?.(false);
  }
};

// 기존 함수는 호환성을 위해 유지
export const downloadExcel = (
  data: (string | number)[][],
  filename: string = 't-container-list.xlsx',
  title: string = '엑셀 파일'
) => {
  // 워크시트 생성
  const ws = XLSX.utils.aoa_to_sheet(data);

  // 워크북 생성
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  // 파일 다운로드
  XLSX.writeFile(wb, filename);

  toast.success(`${title} 다운로드가 완료되었습니다.`);
};

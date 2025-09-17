import { ApiResponse } from '@/type/api.type';

// 실제 API에 보낼 Terminal ID 숫자 타입
type TerminalId = 1 | 2 | 3 | 4 | 9 | 10 | 11 | 14 | 15 | 16;

// UI에서 표시할 Terminal 이름들
type TerminalName =
  | 'PNIT'
  | 'PNC'
  | 'HJNC'
  | 'HPNT'
  | 'BNCT'
  | 'BCT'
  | 'DGT'
  | 'BPTG'
  | 'BPTS'
  | 'HKTG';

// Terminal ID와 이름을 매핑하는 맵
type TerminalMap = Record<TerminalName, TerminalId>;

// 컬럼 ID 타입 (기존 TContainerColumn과 동일)
type ColumnName =
  | 'conNo'
  | 'dischargeVesselName'
  | 'loadingVesselName'
  | 'transshipmentType'
  | 'bookingNo'
  | 'blNo'
  | 'size'
  | 'feType'
  | 'yardLocation'
  | 'referTemp'
  | 'oog'
  | 'dischargeTerminalName'
  | 'loadingTerminalName'
  | 'dischargeCompletedAt'
  | 'dischargeYardAt'
  | 'dischargeGateOutAt'
  | 'loadingGateInAt'
  | 'loadingYardAt'
  | 'loadingCompletedAt';

// 컬럼 설정 객체 타입
type Column = {
  name: ColumnName;
  label: string;
  order: number; // 순서 관리용
  visible: boolean; // 표시 여부
  width?: string; // Tailwind CSS 클래스 (예: 'w-32')
};

// 컬럼 설정 맵 타입 (DND와 순서 관리에 유리)
type ColumnObject = Record<ColumnName, Column>;

// Excel 다운로드 모달에서 사용할 컬럼 타입
type TContainerColumn = Column;

// 작업상태
type OperationStatus =
  | 'ALL'
  | 'DISCHARGE'
  | 'DISCHARGE_YARD'
  | 'GATE_OUT'
  | 'GATE_IN'
  | 'LOADING'
  | 'PENDING_DISCHARGE'
  | 'PENDING_LOADING';

// 컨테이너 목록 정렬 옵션
type TContainerListSortOption = 'id' | 'ASC' | 'DESC';

// 컨테이너 목록 요청 시 쿼리 타입
type TContainerListQuery = {
  searchKeyword: string;
  searchType: 'CON_NO' | 'BL_NO' | 'BK_NO' | 'VESSEL_NAME';
  page: number;
  size: number;
  sort: TContainerListSortOption;
};

// 컨테이너 목록 요청 타입 (containers/monitoring)
type TContainerListRequest = {
  terminalIds: TerminalId[];
  normalYn: boolean; // 정상
  gateInUnavailableYn: boolean; // 반입불가
  nonArrivalYn: boolean; // 미반입
  loadingCancelYn: boolean; // 선적취소
  operationStatus: OperationStatus; // 작업상태
  accumulatedYn: boolean; // 현재/누적
  onlyBoxOperatorYn: boolean; // 기본값 false 지정
  conNos?: string[]; // 컨테이너 번호 검색 input 목록
  blNos?: string[]; // B/L 번호 검색 input 목록
  bkNos?: string[]; // BK 번호 검색 input 목록
  vesselNames?: string[]; // 선박명 검색 input 목록
};

// 검색 필터 상태 타입
type SearchFilter = {
  // 터미널 선택
  selectedTerminals: TerminalId[];
  // 이상탐지 필터
  normalYn: boolean;
  gateInUnavailableYn: boolean;
  nonArrivalYn: boolean;
  loadingCancelYn: boolean;
  // 작업상태
  operationStatus: OperationStatus;
  // 현재/누적
  accumulatedYn: boolean;
};

type SearchKeywordFilter = {
  searchType: 'CON_NO' | 'BL_NO' | 'BK_NO' | 'VESSEL_NAME';
  searchKeyword: string;
};

// 페이지네이션 상태 타입
type PaginationState = {
  page: number;
  size: number;
  sort: string;
};

// 모니터링 컨테이너 타입
type MonitoringContainer = {
  id: number; // 화물 모니터링 id
  oprShipping: string;
  conNo: string;
  dischargeContainerId: number;
  loadingContainerId: number | null;
  transshipmentType: string;
  dischargeTerminalName: string;
  dischargeVesselName: string;
  dischargeTerminalVesselCode: string | null;
  dischargeTerminalVoyageNo: string | null;
  dischargeShippingVoyageNo: string | null;
  loadingTerminalName: string | null;
  loadingVesselName: string | null;
  loadingTerminalVesselCode: string | null;
  loadingTerminalVoyageNo: string | null;
  loadingShippingVoyageNo: string | null;
  size: string;
  conType: string;
  feType: string;
  weight: string;
  blNo: string;
  bookingNo: string;
  oog: string;
  yardLocation: string;
  referTemp: string | null;
  dischargeCompletedAt: string | null; // datetime
  dischargeYardAt: string | null; // datetime
  dischargeGateOutAt: string | null; // datetime
  loadingGateInAt: string | null; // datetime
  loadingYardAt: string | null; // datetime
  loadingCompletedAt: string | null; // datetime
  operationalIncidents: string | null;
  containerIds: number[];
};

// 컨테이너 목록 응답 타입 (containers/monitoring)
type TContainerListResponse = ApiResponse<{
  totalRows: number; // 행 개수
  previousPage: number | null; // 이전 페이지
  nowPage: number; // 현재 페이지
  nextPage: number; // 다음 페이지
  pageSize: number; // 페이지 크기
  monitoringContainers: MonitoringContainer[]; // 컨테이너 목록
}>;

type TContainerDetailRequest = {
  id: number; // 화물 모니터링 id
};

// 작업 타입
type OperationType =
  | 'LOADING'
  | 'DISCHARGE_YARD'
  | 'DISCHARGE'
  | 'GATE_OUT'
  | 'GATE_IN'
  | 'LOADING_YARD';

// 작업 상태 타입
type DetailOperationStatus = '작업예정' | '작업중' | '작업완료';

// 개별 작업 정보 타입
type Operation = {
  terminalName: string;
  berthCode: string | null;
  operationType: OperationType;
  operationSubject: string | null;
  operationStatus: DetailOperationStatus;
  operationStartedTime: string | null; // datetime
  operationEndedTime: string | null; // datetime
};

// 운영 이슈 타입 (현재 빈 배열)
type OperationalIncident = {
  // 향후 정의될 필드들
  [key: string]: unknown;
};

// 컨테이너 상세 응답 타입
type TContainerDetailResponse = ApiResponse<{
  id: number; // 화물 모니터링 id
  oprShipping: string;
  conNo: string;
  transshipmentType: string;
  dischargeTerminalName: string;
  dischargeVesselName: string;
  dischargeTerminalVesselCode: string;
  dischargeTerminalVoyageNo: string;
  dischargeShippingVoyageNo: string;
  loadingTerminalName: string;
  loadingVesselName: string;
  loadingTerminalVesselCode: string;
  loadingTerminalVoyageNo: string;
  loadingShippingVoyageNo: string;
  truckerId: string | null;
  truckCode: string | null;
  operations: Operation[];
  operationalIncidents: OperationalIncident[];
}>;

export type {
  ColumnName,
  ColumnObject,
  DetailOperationStatus,
  MonitoringContainer,
  Operation,
  OperationalIncident,
  OperationStatus,
  OperationType,
  PaginationState,
  SearchFilter,
  SearchKeywordFilter,
  TContainerColumn,
  TContainerDetailRequest,
  TContainerDetailResponse,
  TContainerListQuery,
  TContainerListRequest,
  TContainerListResponse,
  TerminalId,
  TerminalMap,
};

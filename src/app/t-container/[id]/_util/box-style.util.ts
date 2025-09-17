import { OperationType } from '@/app/t-container/t-container.type';

// 박스 상태 타입 정의
type BoxStatus = '작업중' | '작업완료' | '작업예정';

/**
 * 박스 상태와 작업 타입에 따른 인사이드 보더 클래스를 반환
 */
const getBoxShadowClass = (operationType: OperationType, status: BoxStatus) => {
  // 작업예정 상태는 항상 stroke 색상 사용
  if (status === '작업예정') {
    return 'box-border-stroke';
  }

  // 작업중 상태는 thick, 완료 상태는 thin
  if (status === '작업중') {
    if (
      operationType === 'LOADING' ||
      operationType === 'LOADING_YARD' ||
      operationType === 'GATE_IN'
    ) {
      return 'box-border-crimson-thick';
    } else {
      return 'box-border-radiance-thick';
    }
  } else {
    if (
      operationType === 'LOADING' ||
      operationType === 'LOADING_YARD' ||
      operationType === 'GATE_IN'
    ) {
      return 'box-border-crimson-thin';
    } else {
      return 'box-border-radiance-thin';
    }
  }
};

/**
 * 작업 타입별 텍스트 색상 클래스를 반환
 */
const getTextColorClass = (operationType: OperationType) => {
  switch (operationType) {
    case 'LOADING':
    case 'LOADING_YARD':
    case 'GATE_IN':
      return 'text-crimson';
    case 'GATE_OUT':
    case 'DISCHARGE_YARD':
    case 'DISCHARGE':
      return 'text-radiance';
    default:
      return 'text-gray-500';
  }
};

/**
 * 박스 상태별 배경색 클래스를 반환
 */
const getBackgroundClass = (status: BoxStatus) => {
  switch (status) {
    case '작업중':
      return 'bg-[#2F2F2F]';
    case '작업완료':
    case '작업예정':
      return 'bg-white';
    default:
      return 'bg-white';
  }
};

/**
 * 박스 상태별 텍스트 색상 클래스를 반환
 */
const getStatusTextClass = (status: BoxStatus) => {
  switch (status) {
    case '작업중':
      return 'text-white';
    case '작업완료':
    case '작업예정':
      return 'text-gray-500';
    default:
      return 'text-gray-500';
  }
};

/**
 * MixedBox 전용 클래스를 반환 (왼쪽 빨간색, 오른쪽 파란색)
 */
const getMixedBoxClass = (status: BoxStatus) => {
  const backgroundColor =
    status === '작업중' ? 'bg-[#2F2F2F] text-white' : 'bg-white text-gray-900';
  const baseClasses = `${backgroundColor} border-none before:absolute before:inset-y-0 before:left-0 before:w-1/2 before:rounded-l-2xl before:border-r-0 before:border-[#e12c3e] after:absolute after:inset-y-0 after:right-0 after:w-1/2 after:rounded-r-2xl after:border-l-0 after:border-[#0092fc] relative flex h-full w-full flex-col items-center justify-center gap-y-[0.7rem] rounded-2xl p-2`;

  if (status === '작업중') {
    return `${baseClasses} before:border-[3px] after:border-[3px]`;
  } else {
    return `${baseClasses} before:border-[2px] after:border-[2px]`;
  }
};

/**
 * 공통 박스 레이아웃 클래스를 반환
 */
const getCommonBoxLayoutClass = () => {
  return 'flex-1 relative flex h-full w-full flex-col items-center justify-center rounded-2xl';
};

/**
 * 작업중 상태가 아닌 박스의 패딩 클래스를 반환
 */
const getBoxPaddingClass = () => {
  return 'p-5';
};

/**
 * 작업중 상태 박스의 패딩 클래스를 반환 (아이콘이 하단에 붙도록)
 */
const getLoadingBoxPaddingClass = () => {
  return 'px-5 pt-5';
};

/**
 * 공통 제목 스타일 클래스를 반환
 */
const getCommonTitleClass = () => {
  return 'z-20 text-2xl font-medium';
};

/**
 * 공통 시간 표시 영역 클래스를 반환
 */
const getCommonTimeDisplayClass = () => {
  return 'flex flex-col items-center space-y-1 text-sm';
};

/**
 * 공통 구분선 클래스를 반환
 */
const getCommonDividerClass = () => {
  return 'w-20 h-px bg-black/10';
};

/**
 * 공통 시간 컨테이너 클래스를 반환
 */
const getCommonTimeContainerClass = () => {
  return 'h-2 flex items-center justify-center';
};

/**
 * 시간 표시 로직을 처리하는 함수
 */
const getDisplayTime = (
  operationEndedTime: string,
  operationStartedTime: string
) => {
  if (operationEndedTime) {
    return operationEndedTime;
  }
  if (operationStartedTime) {
    return operationStartedTime;
  }
  return '-';
};

export {
  type BoxStatus,
  getBackgroundClass,
  getBoxPaddingClass,
  getBoxShadowClass,
  getCommonBoxLayoutClass,
  getCommonDividerClass,
  getCommonTimeContainerClass,
  getCommonTimeDisplayClass,
  getCommonTitleClass,
  getDisplayTime,
  getLoadingBoxPaddingClass,
  getMixedBoxClass,
  getStatusTextClass,
  getTextColorClass,
};

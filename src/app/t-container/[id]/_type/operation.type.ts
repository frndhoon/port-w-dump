const operationType = {
  DISCHARGE: 'DISCHARGE',
  DISCHARGE_YARD: 'DISCHARGE_YARD',
  GATE_OUT: 'GATE_OUT',
  GATE_IN: 'GATE_IN',
  LOADING: 'LOADING',
  LOADING_YARD: 'LOADING_YARD',
} as const;

// 자부두 작업 타입
const selfDockOperationType = {
  [operationType.LOADING]: 'completeLoadingAt',
  [operationType.DISCHARGE_YARD]: 'unloadingYardAt',
  [operationType.DISCHARGE]: 'completeUnloadingAt',
} as const;

// 타부두 작업 타입
const otherDockOperationType = {
  [operationType.LOADING]: 'completeLoadingAt',
  [operationType.LOADING_YARD]: 'loadingYardAt',
  [operationType.GATE_IN]: 'loadingInAt',
  [operationType.GATE_OUT]: 'unloadingOutAt',
  [operationType.DISCHARGE_YARD]: 'unloadingYardAt',
  [operationType.DISCHARGE]: 'completeUnloadingAt',
} as const;

const selfDockOperationKorean = {
  [operationType.LOADING]: '양하',
  [operationType.DISCHARGE_YARD]: '야드',
  [operationType.DISCHARGE]: '선적',
} as const;

const otherDockOperationKorean = {
  [operationType.LOADING]: '양하',
  [operationType.LOADING_YARD]: '양하 야드',
  [operationType.GATE_IN]: '양하 반출',
  [operationType.GATE_OUT]: '선적 반입',
  [operationType.DISCHARGE_YARD]: '선적 야드',
  [operationType.DISCHARGE]: '선적 완료',
};

export {
  operationType,
  otherDockOperationKorean,
  otherDockOperationType,
  selfDockOperationKorean,
  selfDockOperationType,
};

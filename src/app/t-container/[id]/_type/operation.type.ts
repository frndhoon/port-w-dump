type OperationType =
  | 'DISCHARGE'
  | 'DISCHARGE_YARD'
  | 'GATE_OUT'
  | 'GATE_IN'
  | 'LOADING'
  | 'LOADING_YARD';

type SelfDockOperationKorean = '양하' | '야드' | '선적';

type OtherDockOperationKorean =
  | '양하'
  | '양하 야드'
  | '양하 반출'
  | '선적 반입'
  | '선적 야드'
  | '선적 완료';

export type {
  OperationType,
  OtherDockOperationKorean,
  SelfDockOperationKorean,
};

import { CargoIcon } from '@/app/t-container/[id]/_component/icons';
import {
  otherDockOperationKorean,
  selfDockOperationKorean,
} from '@/app/t-container/[id]/_type/operation.type';
import {
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
} from '@/app/t-container/[id]/_util/box-style.util';
import {
  DetailOperationStatus,
  OperationType,
} from '@/app/t-container/t-container.type';

const OperationBox = ({
  operationType,
  operationStatus,
  operationStartedTime,
  operationEndedTime,
  isSelfDock,
}: {
  operationType: OperationType;
  operationStatus: DetailOperationStatus;
  operationStartedTime: string;
  operationEndedTime: string;
  isSelfDock: boolean;
}) => {
  const koreanOperationType = isSelfDock
    ? selfDockOperationKorean[
        operationType as keyof typeof selfDockOperationKorean
      ]
    : otherDockOperationKorean[operationType];

  // 자부두의 경우 야드일 때 mixed=true
  const isMixed = isSelfDock && operationType === 'DISCHARGE_YARD';

  // 박스 클래스 결정
  const baseBoxClassName = isMixed
    ? `${getCommonBoxLayoutClass()} ${getMixedBoxClass(operationStatus)}`
    : `${getCommonBoxLayoutClass()} ${getBackgroundClass(operationStatus)} ${getBoxShadowClass(operationType, operationStatus)}`;

  // 상태별 패딩 클래스 결정
  const paddingClassName =
    operationStatus === '작업중'
      ? getLoadingBoxPaddingClass()
      : getBoxPaddingClass();

  const boxClassName = `${baseBoxClassName} ${paddingClassName}`;

  // 시간 표시 로직
  const displayTime = getDisplayTime(operationEndedTime, operationStartedTime);

  // 작업완료 상태 렌더링
  if (operationStatus === '작업완료') {
    return (
      <div className={boxClassName}>
        <div className="flex-1 flex flex-col items-center justify-center space-y-2">
          <span
            className={`${getCommonTitleClass()} text-lg ${getTextColorClass(operationType)}`}
          >
            완료
          </span>
          <h3
            className={`${getCommonTitleClass()} ${getStatusTextClass(operationStatus)}`}
          >
            {koreanOperationType}
          </h3>
          <div className={getCommonTimeDisplayClass()}>
            <div className={getCommonDividerClass()}></div>
            <p className={getStatusTextClass(operationStatus)}>
              {`${koreanOperationType} 시간`}
            </p>
            <div className={getCommonTimeContainerClass()}>
              <p className={getStatusTextClass(operationStatus)}>
                {displayTime}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 작업중 상태 렌더링
  if (operationStatus === '작업중') {
    return (
      <div className={boxClassName}>
        <div className="flex-1 flex flex-col items-center justify-center space-y-2">
          <h3
            className={`${getCommonTitleClass()} ${getStatusTextClass(operationStatus)}`}
          >
            {koreanOperationType}
          </h3>
          <div className={getCommonTimeDisplayClass()}>
            <div className={getCommonDividerClass()}></div>
            <p className={getStatusTextClass(operationStatus)}>
              {`${koreanOperationType} 시간`}
            </p>
            <div className={getCommonTimeContainerClass()}>
              <p className={getStatusTextClass(operationStatus)}>
                {displayTime}
              </p>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 pb-0">
          <CargoIcon operationType={operationType} />
        </div>
      </div>
    );
  }

  // 작업예정 상태 렌더링
  return (
    <div className={boxClassName}>
      <div className="flex-1 flex flex-col items-center justify-center space-y-2">
        <h3
          className={`${getCommonTitleClass()} ${getStatusTextClass(operationStatus)}`}
        >
          {koreanOperationType}
        </h3>
        <div className={getCommonTimeDisplayClass()}>
          <div className={getCommonDividerClass()}></div>
          <p className={getStatusTextClass(operationStatus)}>
            {`${koreanOperationType} 시간`}
          </p>
          <div className={getCommonTimeContainerClass()}>
            <p className={getStatusTextClass(operationStatus)}>{displayTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TransportBox = ({
  operationType,
  mixed = false,
  loading = false,
  status = '작업예정',
}: {
  operationType: OperationType;
  mixed?: boolean;
  loading?: boolean;
  status?: '작업예정' | '작업중' | '작업완료';
}) => {
  const boxClassName = mixed
    ? `${getCommonBoxLayoutClass()} ${getMixedBoxClass(status)}`
    : `${getCommonBoxLayoutClass()} ${getBackgroundClass(status)} ${getBoxShadowClass(operationType, status)}`;

  // 상황에 따른 텍스트와 색상 결정
  const getDisplayText = () => {
    if (status === '작업완료' && mixed) {
      return '운송완료';
    }
    if (loading) {
      return '운송중';
    }
    return '-';
  };

  const getTextColorClass = () => {
    if (status === '작업완료' && mixed) {
      return 'text-crimson'; // 운송완료: 빨간색
    }
    if (loading) {
      return 'text-white'; // 운송중: 하얀색
    }
    return 'text-black'; // -: 검은색
  };

  return (
    <div className={boxClassName}>
      <h3 className={`${getCommonTitleClass()} text-xl ${getTextColorClass()}`}>
        {getDisplayText()}
      </h3>
    </div>
  );
};

export { OperationBox, TransportBox };

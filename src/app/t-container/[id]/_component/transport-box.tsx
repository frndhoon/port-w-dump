import {
  getCommonBoxLayoutClass,
  getMixedBoxClass,
} from '@/app/t-container/[id]/_util/box-style.util';
import {
  getBackgroundClass,
  getBoxShadowClass,
  getCommonTitleClass,
} from '@/app/t-container/[id]/_util/box-style.util';
import { OperationType } from '@/app/t-container/t-container.type';

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
    return '운송중';
  };

  const getTextColorClass = () => {
    if (status === '작업완료' && mixed) {
      return 'text-crimson'; // 운송완료: 빨간색
    }
    if (loading) {
      return 'text-white'; // 운송중: 하얀색
    }
    return 'text-gray-500'; // -: 검은색
  };

  return (
    <div className={boxClassName}>
      <h3 className={`${getCommonTitleClass()} text-xl ${getTextColorClass()}`}>
        {getDisplayText()}
      </h3>
    </div>
  );
};

export { TransportBox };

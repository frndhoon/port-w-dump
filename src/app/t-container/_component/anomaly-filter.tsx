'use client';

import { Checkbox } from '@/component/shadcn-ui/checkbox';
import { Label } from '@/component/shadcn-ui/label';

type AnomalyFilterProps = {
  normalYn: boolean;
  gateInUnavailableYn: boolean;
  nonArrivalYn: boolean;
  loadingCancelYn: boolean;
  onAnomalyChange: (
    field: keyof Omit<
      AnomalyFilterProps,
      'onAnomalyChange' | 'isFetching' | 'isError'
    >,
    value: boolean
  ) => void;
  isFetching: boolean;
  isError: boolean;
};

const AnomalyFilter = ({
  normalYn,
  gateInUnavailableYn,
  nonArrivalYn,
  loadingCancelYn,
  onAnomalyChange,
  isFetching,
  isError,
}: AnomalyFilterProps) => {
  return (
    <div className="flex flex-row gap-2 first:border-r first:pr-5 py-5 border-stroke">
      <Label className="opacity-50">이상탐지</Label>

      <Checkbox
        variant="custom"
        id="NORMAL"
        checked={normalYn}
        onCheckedChange={checked => onAnomalyChange('normalYn', !!checked)}
        disabled={isFetching || isError}
      />
      <Label variant="custom" htmlFor="NORMAL">
        정상
      </Label>

      <Checkbox
        variant="custom"
        id="NON_ARRIVAL"
        checked={nonArrivalYn}
        onCheckedChange={checked => onAnomalyChange('nonArrivalYn', !!checked)}
        disabled={isFetching || isError}
      />
      <Label variant="custom" htmlFor="NON_ARRIVAL">
        미반입
      </Label>

      <Checkbox
        variant="custom"
        id="GATE_IN_UNAVAILABLE"
        checked={gateInUnavailableYn}
        onCheckedChange={checked =>
          onAnomalyChange('gateInUnavailableYn', !!checked)
        }
        disabled={isFetching || isError}
      />
      <Label variant="custom" htmlFor="GATE_IN_UNAVAILABLE">
        반입불가
      </Label>

      <Checkbox
        variant="custom"
        id="LOADING_CANCEL"
        checked={loadingCancelYn}
        onCheckedChange={checked =>
          onAnomalyChange('loadingCancelYn', !!checked)
        }
        disabled={isFetching || isError}
      />
      <Label variant="custom" htmlFor="LOADING_CANCEL">
        선적취소
      </Label>
    </div>
  );
};

export { AnomalyFilter };

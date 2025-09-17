'use client';

import { Label } from '@/component/shadcn-ui/label';
import { RadioGroup, RadioGroupItem } from '@/component/shadcn-ui/radio-group';

type AccumulationFilterProps = {
  accumulatedYn: boolean;
  onAccumulationChange: (accumulated: boolean) => void;
  isFetching: boolean;
  isError: boolean;
};

const AccumulationFilter = ({
  accumulatedYn,
  onAccumulationChange,
  isFetching,
  isError,
}: AccumulationFilterProps) => {
  return (
    <RadioGroup
      className="flex flex-row"
      value={accumulatedYn ? 'ALL' : 'CURRENT'}
      onValueChange={value => onAccumulationChange(value === 'ALL')}
    >
      <div className="flex items-center gap-2">
        <RadioGroupItem
          value="ALL"
          id="RADIO_ALL"
          className="cursor-pointer"
          disabled={isFetching || isError}
        />
        <Label variant="custom" htmlFor="RADIO_ALL">
          전체(누적)
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem
          value="CURRENT"
          id="CURRENT"
          className="cursor-pointer"
          disabled={isFetching || isError}
        />
        <Label variant="custom" htmlFor="CURRENT">
          현재
        </Label>
      </div>
    </RadioGroup>
  );
};

export { AccumulationFilter };

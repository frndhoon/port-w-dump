'use client';

import { OperationStatus } from '@/app/t-container/t-container.type';
import { Label } from '@/component/shadcn-ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/component/shadcn-ui/select';

type OperationStatusFilterProps = {
  operationStatus: OperationStatus;
  onOperationStatusChange: (status: OperationStatus) => void;
  isFetching: boolean;
  isError: boolean;
};

const OPERATION_STATUS_OPTIONS = [
  { value: 'ALL', label: '전체' },
  { value: 'DISCHARGE', label: '양하 완료' },
  { value: 'DISCHARGE_YARD', label: '양하 야드' },
  { value: 'GATE_OUT', label: '양하 반출' },
  { value: 'GATE_IN', label: '선적 반입' },
  { value: 'LOADING', label: '선적완료' },
  { value: 'PENDING_DISCHARGE', label: '미양하' },
  { value: 'PENDING_LOADING', label: '미선적' },
];

const OperationStatusFilter = ({
  operationStatus,
  onOperationStatusChange,
  isFetching,
  isError,
}: OperationStatusFilterProps) => {
  return (
    <div className="flex flex-row gap-2">
      <Label className="opacity-50">작업 상태</Label>
      <Select
        value={operationStatus}
        onValueChange={onOperationStatusChange}
        disabled={isFetching || isError}
      >
        <SelectTrigger variant="custom">
          <SelectValue placeholder="전체" />
        </SelectTrigger>
        <SelectContent variant="custom">
          <SelectGroup>
            {OPERATION_STATUS_OPTIONS.map(option => (
              <SelectItem
                key={option.value}
                className="cursor-pointer"
                value={option.value}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export { OperationStatusFilter };

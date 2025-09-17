'use client';

import { TerminalId, TerminalMap } from '@/app/t-container/t-container.type';
import { Checkbox } from '@/component/shadcn-ui/checkbox';
import { Label } from '@/component/shadcn-ui/label';

const TERMINAL_MAP: TerminalMap = {
  PNIT: 1,
  PNC: 2,
  HJNC: 3,
  HPNT: 4,
  BNCT: 9,
  BCT: 10,
  DGT: 11,
  BPTG: 14,
  BPTS: 15,
  HKTG: 16,
};

const SHINHANG_TERMINALS = [
  'PNIT',
  'PNC',
  'HJNC',
  'HPNT',
  'BNCT',
  'BCT',
  'DGT',
];
const BUKHANG_TERMINALS = ['BPTG', 'BPTS', 'HKTG'];

type TerminalFilterProps = {
  selectedTerminals: TerminalId[];
  onTerminalChange: (terminals: TerminalId[]) => void;
  isFetching: boolean;
  isError: boolean;
};

const TerminalFilter = ({
  selectedTerminals,
  onTerminalChange,
  isFetching,
  isError,
}: TerminalFilterProps) => {
  const handleTerminalToggle = (terminalName: keyof TerminalMap) => {
    const terminalId = TERMINAL_MAP[terminalName];
    const isSelected = selectedTerminals.includes(terminalId);

    if (isSelected) {
      onTerminalChange(selectedTerminals.filter(id => id !== terminalId));
    } else {
      onTerminalChange([...selectedTerminals, terminalId]);
    }
  };

  const handleAllToggle = (terminals: string[]) => {
    const terminalIds = terminals.map(
      name => TERMINAL_MAP[name as keyof TerminalMap]
    );
    const allSelected = terminalIds.every(id => selectedTerminals.includes(id));

    if (allSelected) {
      // 모든 터미널 선택 해제
      onTerminalChange(
        selectedTerminals.filter(id => !terminalIds.includes(id))
      );
    } else {
      // 모든 터미널 선택
      const newTerminals = [...selectedTerminals];
      terminalIds.forEach(id => {
        if (!newTerminals.includes(id)) {
          newTerminals.push(id);
        }
      });
      onTerminalChange(newTerminals);
    }
  };

  const isAllSelected = (terminals: string[]) => {
    const terminalIds = terminals.map(
      name => TERMINAL_MAP[name as keyof TerminalMap]
    );
    return terminalIds.every(id => selectedTerminals.includes(id));
  };

  return (
    <div className="flex flex-row gap-2 items-center">
      {/* 신항 */}
      <div className="flex flex-row gap-2 first:border-r first:pr-3 py-5 border-stroke">
        <Label className="opacity-50">신항</Label>

        <Checkbox
          variant="custom"
          id="SHINHANG_ALL"
          checked={isAllSelected(SHINHANG_TERMINALS)}
          onCheckedChange={() => handleAllToggle(SHINHANG_TERMINALS)}
          disabled={isFetching || isError}
        />
        <Label variant="custom" htmlFor="SHINHANG_ALL">
          ALL
        </Label>

        {SHINHANG_TERMINALS.map(terminal => (
          <div key={terminal} className="flex items-center gap-1">
            <Checkbox
              variant="custom"
              id={terminal}
              checked={selectedTerminals.includes(
                TERMINAL_MAP[terminal as keyof TerminalMap]
              )}
              onCheckedChange={() =>
                handleTerminalToggle(terminal as keyof TerminalMap)
              }
              disabled={isFetching || isError}
            />
            <Label variant="custom" htmlFor={terminal}>
              {terminal}
            </Label>
          </div>
        ))}
      </div>

      {/* 북항 */}
      <div className="flex flex-row gap-2">
        <Label className="opacity-50">북항</Label>

        <Checkbox
          variant="custom"
          id="BUKHANG_ALL"
          checked={isAllSelected(BUKHANG_TERMINALS)}
          onCheckedChange={() => handleAllToggle(BUKHANG_TERMINALS)}
          disabled={isFetching || isError}
        />
        <Label variant="custom" htmlFor="BUKHANG_ALL">
          ALL
        </Label>

        {BUKHANG_TERMINALS.map(terminal => (
          <div key={terminal} className="flex items-center gap-1">
            <Checkbox
              variant="custom"
              id={terminal}
              checked={selectedTerminals.includes(
                TERMINAL_MAP[terminal as keyof TerminalMap]
              )}
              onCheckedChange={() =>
                handleTerminalToggle(terminal as keyof TerminalMap)
              }
              disabled={isFetching || isError}
            />
            <Label variant="custom" htmlFor={terminal}>
              {terminal}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export { TerminalFilter };

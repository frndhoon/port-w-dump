import { ArrowLeft, ChevronRight } from 'lucide-react';

import { getInstance } from '@/api/instance';
import { BackButton } from '@/app/t-container/[id]/_component/back-button';
import { ExcelDownloadButton } from '@/app/t-container/[id]/_component/excel-download-button';
import {
  BlueCargoArrowIcon,
  CargoIcon,
  RedCargoArrowIcon,
  TruckIcon,
  VesselIcon,
} from '@/app/t-container/[id]/_component/icons';
import { OperationBox } from '@/app/t-container/[id]/_component/operation-box';
import { TransportBox } from '@/app/t-container/[id]/_component/transport-box';
import {
  Operation,
  TContainerDetailResponse,
} from '@/app/t-container/t-container.type';
import { RightArrowIcon } from '@/component/icons';
import { Badge } from '@/component/shadcn-ui/badge';
import { Button } from '@/component/shadcn-ui/button';
import { Label } from '@/component/shadcn-ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/component/shadcn-ui/table';
// Mock 데이터 import
// import mockDetailSelf from '@/mock/mock-use-tcontainer-detail-30002.json';
// import mockDetailOther from '@/mock/mock-use-tcontainer-detail-30009.json';

// Mock 데이터 선택 함수
// const getMockData = (id: string) => {
//   const mockDataMap: Record<string, any> = {
//     // 순차적 진행 상황별 mock 데이터
//     '30002': mockDetailSelf, // 타부두: 작업중/작업예정/작업예정
//     '30009': mockDetailOther, // 자부두: 작업완료/작업예정/작업예정
//   };

//   return mockDataMap[id];
// };

const TContainerPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  try {
    const response = await getInstance(`/containers/monitoring/${id}`);
    const rawData: TContainerDetailResponse['result'] =
      response.result as TContainerDetailResponse['result'];

    // Mock 데이터 사용
    // const mockResponse = getMockData(id);
    // const rawData: TContainerDetailResponse['result'] =
    //   mockResponse.result as TContainerDetailResponse['result'];

    // 시간을 미리 가공하여 새로운 데이터로 재선언
    const formattedOperations =
      rawData?.operations?.map(operation => ({
        ...operation,
        operationStartedTime: operation.operationStartedTime
          ? new Date(operation.operationStartedTime).toLocaleString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })
          : null,
        operationEndedTime: operation.operationEndedTime
          ? new Date(operation.operationEndedTime).toLocaleString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })
          : null,
      })) || [];

    const data = {
      ...rawData,
      operations: formattedOperations,
    };

    const dockType =
      data?.dischargeTerminalName === data?.loadingTerminalName
        ? '자부두'
        : '타부두';

    // 운송중 박스의 상태를 결정하는 함수
    const getTransportBoxStatus = () => {
      if (dockType === '자부두') return null; // 자부두는 운송중 박스 없음

      // GATE_IN 작업 찾기
      const gateInOperation = data?.operations?.find(
        op => op.operationType === 'GATE_IN'
      );

      // GATE_IN이 없으면 운송중 박스 표시 안함
      if (!gateInOperation) return null;

      // GATE_OUT, DISCHARGE_YARD, DISCHARGE 중 하나라도 작업중 또는 작업완료인지 확인
      const hasActiveDischargeOperation = data?.operations?.some(
        op =>
          ['GATE_OUT', 'DISCHARGE_YARD', 'DISCHARGE'].includes(
            op.operationType
          ) && ['작업중', '작업완료'].includes(op.operationStatus)
      );

      // GATE_OUT, DISCHARGE_YARD, DISCHARGE 중 하나라도 작업중/완료라면 mixed=true로 운송완료
      if (hasActiveDischargeOperation) {
        return { status: '작업완료', mixed: true, loading: false };
      }

      // GATE_IN이 작업완료라면 운송중에 loading상태
      if (gateInOperation.operationStatus === '작업완료') {
        return { status: '작업중', mixed: true, loading: true };
      }

      // GATE_IN이 작업예정이면 운송예정 상태로 표시
      if (gateInOperation.operationStatus === '작업예정') {
        return { status: '작업예정', mixed: false, loading: false };
      }

      // GATE_IN이 작업중이면 작업예정 상태로 표시
      if (gateInOperation.operationStatus === '작업중') {
        return { status: '작업예정', mixed: false, loading: false };
      }

      // 기본값: 작업예정
      return { status: '작업예정', mixed: false, loading: false };
    };

    // 작업 단계의 상태를 결정하는 함수 (순차적 진행 고려)
    const getEffectiveOperationStatus = (currentIndex: number) => {
      const operations = data?.operations || [];

      // 현재 단계 다음부터 뒤로 진행하면서 작업중 또는 작업완료인 단계 찾기
      for (let i = currentIndex + 1; i < operations.length; i++) {
        const status = operations[i].operationStatus;
        if (status === '작업중' || status === '작업완료') {
          // 뒤의 단계가 진행 중이면 현재 단계는 작업완료로 표시
          return '작업완료';
        }
      }

      // 뒤의 단계가 모두 작업예정이면 원래 상태 반환
      return operations[currentIndex]?.operationStatus || '작업예정';
    };

    // operationStatus에 따라 적절한 컴포넌트를 렌더링하는 함수
    const renderOperationBox = (operation: Operation, index: number) => {
      // 자부두일 때는 3:1:3 비율, 타부두일 때는 각각 1비율
      const boxWidthClass =
        dockType === '자부두'
          ? operation.operationType === 'DISCHARGE_YARD'
            ? 'w-50 h-50' // 중간 박스 (1비율)
            : 'min-w-150 max-w-180 h-50' // 양쪽 박스 (3비율)
          : 'w-50 h-50'; // 타부두는 모든 박스가 동일한 크기

      // 순차적 진행을 고려한 실제 표시 상태
      const effectiveStatus = getEffectiveOperationStatus(index);

      return (
        <div className={boxWidthClass}>
          <OperationBox
            key={index}
            isSelfDock={dockType === '자부두'}
            operationType={operation.operationType}
            operationStatus={effectiveStatus}
            operationStartedTime={operation.operationStartedTime || ''}
            operationEndedTime={operation.operationEndedTime || ''}
          />
        </div>
      );
    };

    return (
      <div className="flex flex-col h-screen">
        {/* 메인 콘텐츠 부분 - 가로/세로 스크롤 가능 */}
        <div className="flex-1 overflow-auto">
          <div className="overflow-x-auto">
            <div className="min-w-max">
              {/* 헤더를 스크롤 영역 내부로 이동 */}
              <div className="mb-2 flex items-center p-4 bg-white min-w-[1200px]">
                <div className="flex items-center gap-4 text-2xl font-semibold">
                  <BackButton />
                  화물 모니터링
                  <ChevronRight size={30} />
                  화물그룹
                  <ChevronRight size={30} />
                  {data?.conNo}
                </div>
              </div>
              <div className="flex flex-col w-full gap-8">
                {/* 컨테이너 상태 정보 섹션 */}
                <div className="flex flex-col w-full">
                  <div className="h-12 flex items-center gap-8 px-8 bg-primary text-2xl font-semibold text-white min-w-[1200px]">
                    <div
                      className={`flex items-center justify-center h-8 px-4 py-1 rounded-full ${
                        data?.operations?.[data?.operations?.length - 1]
                          ?.operationStatus === '작업완료'
                          ? 'bg-green-500'
                          : data?.operations?.[data?.operations?.length - 1]
                                ?.operationStatus === '작업중'
                            ? 'bg-secondary'
                            : 'bg-gray-500'
                      }`}
                    >
                      <p>
                        {data?.operations?.[data?.operations?.length - 1]
                          ?.operationStatus || '작업예정'}
                      </p>
                    </div>
                    <p>컨테이너 번호</p>
                    <p>{data?.conNo}</p>
                  </div>
                  <div className="h-12 flex items-center gap-8 px-8 text-lg min-w-[1200px]">
                    <div className="flex items-center gap-2">
                      <Label className="text-control">양하 선박</Label>
                      <p>
                        {data?.dischargeVesselName}
                        {data?.dischargeShippingVoyageNo}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label className="text-control">선적 선박</Label>
                      <p>
                        {data?.loadingVesselName}
                        {data?.loadingShippingVoyageNo}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label className="text-control">자/타부두</Label>
                      <p>{dockType}</p>
                    </div>
                  </div>
                </div>

                {/* 터미널 정보 섹션 */}
                <div className="flex flex-col w-full">
                  <div className="mt-[-2rem] flex items-center min-w-[1200px]">
                    {dockType === '자부두' ? (
                      // 자부두: 하나의 터미널만 표시
                      <div className="flex items-center justify-center w-full py-2 border-r-2 border-r-white bg-filter">
                        <p className="text-lg font-semibold">
                          {data?.dischargeTerminalName}
                        </p>
                      </div>
                    ) : (
                      // 타부두: 양하부두와 선적부두를 3:1:3 비율로 표시 (선박 시각화와 동일)
                      <>
                        <div className="flex py-2 items-center flex-[3] border-r-1 border-r-white bg-filter justify-center">
                          <p className="text-lg font-semibold">
                            {data?.dischargeTerminalName}
                          </p>
                        </div>
                        <div className="flex py-2 items-center flex-[1] border-r-1 border-r-white bg-filter justify-center">
                          <p className="text-lg font-semibold">&nbsp;</p>
                        </div>
                        <div className="flex py-2 items-center flex-[3] bg-filter justify-center">
                          <p className="text-lg font-semibold">
                            {data?.loadingTerminalName}
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* 선박 시각화 영역 */}
                  <section
                    className={`flex h-80 items-center justify-center bg-gray-100 min-w-[1200px] ${data?.operations[data?.operations.length - 1]?.operationStatus === '작업완료' ? 'opacity-50' : ''}`}
                  >
                    {/* 자부두인 경우 1:1 비율, 타부두인 경우 3:1:3 비율 */}
                    {data?.dischargeTerminalName ===
                    data?.loadingTerminalName ? (
                      // 자부두: 1:1 비율
                      <>
                        <div className="flex flex-col items-center flex-1 h-full pt-8 pb-16 font-medium text-center">
                          <div className="flex items-start gap-x-2">
                            <span className="flex items-center rounded-xs border border-[#00000005] bg-[#FFE5E5] px-1 mt-1.5 text-xs text-crimson">
                              양하
                            </span>
                            <h2 className="whitespace-pre-wrap">
                              {`${data?.dischargeVesselName}
${data?.dischargeShippingVoyageNo}`}
                            </h2>
                          </div>
                          <div className="relative mt-auto">
                            {/* 양하 선박 시각화 컴포넌트 자리 */}
                            {data?.operations[0].operationStatus ===
                              '작업완료' &&
                              !(
                                data?.operations[data.operations.length - 1]
                                  .operationStatus === '작업완료'
                              ) &&
                              data?.operations[1].operationStatus ===
                                '작업예정' && (
                                <RedCargoArrowIcon className="absolute bottom-10 left-7" />
                              )}
                            <VesselIcon />
                          </div>
                        </div>

                        {/* 구분선 */}
                        <div className="w-px h-full bg-white"></div>

                        <div className="flex flex-col items-center flex-1 h-full pt-8 pb-16 font-medium text-center">
                          <div className="flex items-start gap-x-2">
                            <span className="flex items-center rounded-xs border border-[#00000005] bg-[#D9EFFF] px-1 mt-1.5 text-xs text-radiance">
                              선적
                            </span>
                            <h2 className="whitespace-pre-wrap">
                              {`${data?.loadingVesselName}
${data?.loadingShippingVoyageNo}`}
                            </h2>
                          </div>
                          <div className="relative mt-auto">
                            {/* 선적 선박 시각화 컴포넌트 자리 */}
                            {data?.operations[data?.operations.length - 1]
                              .operationStatus === '작업완료' && (
                              <BlueCargoArrowIcon className="absolute bottom-10 left-10" />
                            )}

                            <VesselIcon />
                          </div>
                        </div>
                      </>
                    ) : (
                      // 타부두: 3:1:3 비율
                      <>
                        <div className="flex h-full flex-[3] flex-col items-center pb-16 pt-8 text-center font-medium">
                          <div className="flex items-start gap-x-2">
                            <span className="flex items-center rounded-xs border border-[#00000005] bg-[#FFE5E5] px-1 mt-1.5 text-xs text-crimson">
                              양하
                            </span>
                            <h2 className="whitespace-pre-wrap">
                              {`${data?.dischargeVesselName}
${data?.dischargeShippingVoyageNo}`}
                            </h2>
                          </div>
                          <div className="relative mt-auto">
                            {/* 양하 선박 시각화 컴포넌트 자리 */}
                            {data?.operations[0].operationStatus ===
                              '작업완료' &&
                              !(
                                data?.operations[data.operations.length - 1]
                                  .operationStatus === '작업완료'
                              ) &&
                              data?.operations[1].operationStatus ===
                                '작업예정' && (
                                <RedCargoArrowIcon className="absolute bottom-10 left-7" />
                              )}
                            <VesselIcon />
                          </div>
                        </div>

                        {/* 구분선 */}
                        <div className="w-px h-full bg-white"></div>

                        {/* 중간 구분 영역 */}
                        <div className="flex h-full flex-[1] flex-col items-center pb-16 pt-8 text-center font-medium">
                          <div className="flex items-start gap-x-2">
                            <h2 className="whitespace-pre-wrap">
                              {data?.truckCode ? data?.truckCode : '-'}
                            </h2>
                          </div>
                          <div className="relative mt-auto">
                            {data?.operations[2].operationStatus ===
                              '작업완료' &&
                              data?.operations[3].operationStatus ===
                                '작업예정' && (
                                <CargoIcon
                                  operationType="GATE_IN"
                                  className="absolute bottom-6 left-5"
                                />
                              )}
                            <TruckIcon />
                          </div>
                        </div>

                        {/* 구분선 */}
                        <div className="w-px h-full bg-white"></div>

                        <div className="flex h-full flex-[3] flex-col items-center gap-y-12 pb-16 pt-8 text-center font-medium">
                          <div className="flex items-start gap-x-2">
                            <span className="flex items-center rounded-xs border border-[#00000005] bg-[#D9EFFF] px-1 mt-1.5 text-xs text-radiance">
                              선적
                            </span>
                            <h2 className="whitespace-pre-wrap">
                              {`${data?.loadingVesselName}
${data?.loadingShippingVoyageNo}`}
                            </h2>
                          </div>
                          <div className="relative mt-auto">
                            {/* 선적 선박 시각화 컴포넌트 자리 */}
                            {data?.operations[data?.operations.length - 1]
                              .operationStatus === '작업완료' && (
                              <BlueCargoArrowIcon className="absolute bottom-10 left-10" />
                            )}
                            <VesselIcon />
                          </div>
                        </div>
                      </>
                    )}
                  </section>

                  {/* 작업 프로세스 단계 표시 */}
                  <div className="flex flex-col -translate-y-8 min-w-[1200px] mx-2">
                    <div className="flex items-center mx-auto flex-3">
                      {data?.operations?.map((operation, index) => {
                        const isGateIn = operation.operationType === 'GATE_IN';
                        const transportStatus = getTransportBoxStatus();

                        return (
                          <div key={index} className="flex items-center">
                            {renderOperationBox(operation, index)}

                            {/* 타부두이고 양하반입 다음에 운송중 박스 추가 */}
                            {dockType === '타부두' && isGateIn && (
                              <>
                                <div className="flex items-center justify-center w-6 h-20 bg-control">
                                  <RightArrowIcon />
                                </div>
                                <div className="w-50 h-50">
                                  <TransportBox
                                    operationType="GATE_IN" // 운송중은 양하반입과 관련된 작업
                                    status={
                                      (transportStatus?.status as
                                        | '작업예정'
                                        | '작업중'
                                        | '작업완료') || '작업예정'
                                    }
                                    mixed={transportStatus?.mixed || false}
                                    loading={transportStatus?.loading || false}
                                  />
                                </div>
                                <div className="flex items-center justify-center w-6 h-20 bg-control">
                                  <RightArrowIcon />
                                </div>
                              </>
                            )}

                            {/* 일반적인 화살표 (운송중 박스가 아닌 경우) */}
                            {!(dockType === '타부두' && isGateIn) &&
                              index < (data?.operations?.length || 0) - 1 && (
                                <div className="flex items-center justify-center w-6 h-20 bg-control">
                                  <RightArrowIcon />
                                </div>
                              )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 작업 로그 정보 섹션 */}
                <div className="flex flex-col gap-4 px-8 min-w-[1200px]">
                  <div className="flex justify-between">
                    <h2 className="text-lg font-medium">작업 로그 정보</h2>
                    <ExcelDownloadButton
                      operations={data?.operations || []}
                      conNo={data?.conNo}
                    />
                  </div>

                  <Table className="mb-10 border-t border-t-black">
                    <TableHeader className="h-10 border-t border-t-black bg-filter">
                      <TableRow className="text-lg">
                        <TableHead className="w-40 h-12 px-8 select-none">
                          작업 단계
                        </TableHead>
                        <TableHead className="w-40 h-12 px-8 select-none">
                          작업 주체
                        </TableHead>
                        <TableHead className="w-40 h-12 px-8 select-none">
                          작업 상태
                        </TableHead>
                        <TableHead className="w-40 h-12 px-8 select-none ">
                          작업 시작 일시
                        </TableHead>
                        <TableHead className="w-40 h-12 px-8 select-none">
                          작업 종료 일시
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data?.operations?.map((operation, index) => {
                        // 작업 상태에 따른 Badge 색상 결정
                        const getBadgeVariant = (status: string) => {
                          switch (status) {
                            case '작업완료':
                              return 'bg-green-500';
                            case '작업중':
                              return 'bg-secondary';
                            case '작업예정':
                              return 'bg-gray-500';
                            default:
                              return 'bg-gray-500';
                          }
                        };

                        return (
                          <TableRow
                            key={index}
                            className="text-base font-light text-left border-b border-stroke"
                          >
                            <TableCell className="h-16 px-8 py-4">
                              {operation.operationType}
                            </TableCell>
                            <TableCell className="h-16 px-8 py-4">
                              {operation.terminalName}
                            </TableCell>
                            <TableCell className="h-16 px-8 py-4">
                              <Badge
                                className={`rounded-full ${getBadgeVariant(operation.operationStatus)} px-4 py-1 text-sm text-white`}
                              >
                                {operation.operationStatus}
                              </Badge>
                            </TableCell>
                            <TableCell className="h-16 px-8 py-4">
                              {operation.operationStartedTime || '-'}
                            </TableCell>
                            <TableCell className="h-16 px-8 py-4">
                              {operation.operationEndedTime || '-'}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch {
    return (
      <div className="flex flex-col h-screen">
        <div className="flex-1 overflow-auto">
          <div className="overflow-x-auto">
            <div className="min-w-max">
              {/* 헤더를 스크롤 영역 내부로 이동 */}
              <div className="mb-2 flex items-center justify-between p-4 bg-white min-w-[1200px]">
                <h2 className="flex items-center gap-4 text-2xl font-semibold">
                  화물 모니터링
                  <ChevronRight size={30} />
                  화물그룹
                  <ChevronRight size={30} />
                  {id}
                </h2>
                <Button variant="ghost" className="px-3 py-2 rounded-lg">
                  <ArrowLeft className="cursor-pointer opacity hover:opacity-100" />
                </Button>
              </div>
              <div className="flex items-center justify-center min-h-[400px] min-w-[1200px]">
                <div className="text-center">
                  <h3 className="mb-2 text-xl font-semibold text-red-600">
                    데이터 로드 실패
                  </h3>
                  <p className="text-gray-600">
                    컨테이너 정보를 불러올 수 없습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default TContainerPage;

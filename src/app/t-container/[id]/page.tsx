import { ArrowBigRight, ArrowLeft, ChevronRight } from 'lucide-react';

import { ExcelIcon } from '@/component/icons';
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

const TContainerPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-shrink-0">
        <div className="sticky top-0 z-10 mb-2 flex items-center justify-between p-4">
          <h2 className="flex items-center gap-4 text-2xl font-semibold">
            화물 모니터링
            <ChevronRight size={30} />
            화물그룹
            <ChevronRight size={30} />
            {params.id}
          </h2>
          <Button variant="ghost" className="rounded-lg px-3 py-2">
            <ArrowLeft className="opacity cursor-pointer hover:opacity-100" />
          </Button>
        </div>
      </div>

      {/* 메인 콘텐츠 부분 - 독립적인 스크롤 */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-auto">
          <div className="flex w-full flex-col gap-8">
            {/* 컨테이너 상태 정보 섹션 */}
            <div className="flex flex-col">
              <div className="h-12 flex items-center gap-8 px-8 bg-primary text-2xl font-semibold text-white">
                <div className="h-8 flex items-center justify-center rounded-full bg-secondary px-4 py-1">
                  <p>작업중</p>
                </div>
                <p>컨테이너 번호</p>
                <p>{params.id}</p>
              </div>
              <div className="h-12 flex items-center gap-8 px-8 text-lg">
                <div className="flex items-center gap-2">
                  <Label className="text-control">양하 선박</Label>
                  <p>HMM EMERALD 0009E</p>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-control">선적 선박</Label>
                  <p>YM TRILLION 0016E</p>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-control">자/타부두</Label>
                  <p>자부두</p>
                </div>
              </div>
            </div>

            {/* 터미널 정보 섹션 */}
            <div className="flex flex-col">
              <div className="mt-[-2rem] flex items-center">
                <div className="flex py-2 items-center w-full border-r-2 border-r-white bg-filter justify-center">
                  <p className="text-lg font-semibold">HPNT</p>
                </div>
              </div>

              {/* 선박 시각화 영역 */}
              <section className="flex h-80 items-center justify-center bg-gray-100 gap-x-8">
                <div className="flex h-full w-96 flex-col items-center pb-16 pt-8 text-center font-medium">
                  <div className="flex items-start gap-x-2">
                    <span className="mt-2 h-4 rounded-sm border border-[#0000000D] bg-red-300 px-1 py-0 text-xs text-red-700">
                      양하
                    </span>
                    <h2 className="whitespace-pre-wrap">
                      {`HMM EMERALD
0009E`}
                    </h2>
                  </div>
                  <div className="mt-auto">
                    {/* 양하 선박 시각화 컴포넌트 자리 */}
                    <div className="w-40 h-16 bg-gray-300 rounded flex items-center justify-center">
                      <img
                        src="https://placehold.co/400x300"
                        alt="양하 선박 시각화"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex h-full w-96 flex-col items-center gap-y-12 pb-16 pt-8 text-center font-medium">
                  <div className="flex items-start gap-x-2">
                    <span className="mt-2 h-4 rounded-sm border border-[##0000000D] bg-blue-100 px-1 py-0 text-xs text-blue-600">
                      선적
                    </span>
                    <h2 className="whitespace-pre-wrap">
                      {`YM TRILLION
0016E`}
                    </h2>
                  </div>
                  <div className="mt-auto">
                    {/* 선적 선박 시각화 컴포넌트 자리 */}
                    <div className="w-40 h-16 bg-gray-300 rounded flex items-center justify-center">
                      <img
                        src="https://placehold.co/600x400"
                        alt="선적 선박 시각화"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* 작업 프로세스 단계 표시 */}
              <div className="mx-auto flex -translate-y-8 items-center">
                <div className="w-64 flex-1 bg-white border-red-700 flex h-40 flex-col items-center justify-center gap-y-2 rounded-2xl border">
                  <span className="font-medium text-red-700">완료</span>
                  <h3 className="border-b border-black/10 pb-4 font-medium">
                    양하 완료
                  </h3>
                  <p>양하완료 일시</p>
                  <p>2025.09.15 14:31</p>
                </div>

                <div className="flex h-20 w-6 items-center justify-center bg-control">
                  <ArrowBigRight size={20} />
                </div>

                <div className="w-64 bg-white relative flex h-40 flex-col items-center justify-center gap-y-2 rounded-2xl border before:absolute before:inset-y-0 before:left-0 before:w-1/2 before:rounded-l-2xl before:border before:border-r-0 before:border-red-700 after:absolute after:inset-y-0 after:right-0 after:w-1/2 after:rounded-r-2xl after:border after:border-l-0 after:border-blue-600">
                  <span className="font-medium text-red-700">완료</span>
                  <h3 className="border-b border-black/10 pb-4 font-medium">
                    야드
                  </h3>
                  <p>야드 적재 시간</p>
                  <p>2025.09.13 02:10</p>
                </div>

                <div className="flex h-20 w-6 items-center justify-center bg-control">
                  <ArrowBigRight size={20} />
                </div>

                <div className="w-64 flex-1 bg-gray-900 border-blue-600 relative flex h-40 flex-col items-center justify-center rounded-2xl border-2 text-white">
                  <h3 className="pb-4 text-xl">선적 완료</h3>
                  <p>선적 완료 일시</p>
                  <p>2025.09.11 00:33</p>
                  <div className="absolute bottom-0 w-16 h-8 bg-gray-500 rounded">
                    {/* 선적 컨테이너 이미지 자리 */}
                  </div>
                </div>
              </div>
            </div>

            {/* 작업 로그 정보 섹션 */}
            <div className="flex flex-col gap-4 px-8">
              <div className="flex justify-between">
                <h2 className="text-lg font-medium">작업 로그 정보</h2>
                <Button
                  variant="secondary"
                  className="text-white cursor-pointer"
                >
                  <ExcelIcon />
                  엑셀 다운로드
                </Button>
              </div>

              <Table className="border-t border-t-black mb-10">
                <TableHeader className="sticky top-0 z-10 h-10 border-t border-t-black bg-filter">
                  <TableRow>
                    <TableHead className="h-12 min-w-64 select-none px-8 text-left text-sm font-medium">
                      작업 단계
                    </TableHead>
                    <TableHead className="h-12 min-w-64 select-none px-8 text-left text-sm font-medium">
                      작업 주체
                    </TableHead>
                    <TableHead className="h-12 min-w-64 select-none px-8 text-left text-sm font-medium">
                      작업 상태
                    </TableHead>
                    <TableHead className="h-12 min-w-64 select-none px-8 text-left text-sm font-medium">
                      작업 시작 일시
                    </TableHead>
                    <TableHead className="h-12 min-w-64 select-none px-8 text-left text-sm font-medium">
                      작업 종료 일시
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-b border-stroke text-left text-sm font-light">
                    <TableCell className="h-16 px-8 py-4">LOADING</TableCell>
                    <TableCell className="h-16 px-8 py-4">HPNTC050</TableCell>
                    <TableCell className="h-16 px-8 py-4">
                      <Badge className="rounded-full bg-secondary px-4 py-1 text-white">
                        작업중
                      </Badge>
                    </TableCell>
                    <TableCell className="h-16 px-8 py-4">
                      2025.08.22 07:00
                    </TableCell>
                    <TableCell className="h-16 px-8 py-4">-</TableCell>
                  </TableRow>
                  <TableRow className="border-b border-stroke text-left text-sm font-light">
                    <TableCell className="h-16 px-8 py-4 text-left text-sm font-light">
                      DISCHARGE_YARD
                    </TableCell>
                    <TableCell className="h-16 px-8 py-4">HPNT</TableCell>
                    <TableCell className="h-16 px-8 py-4">
                      <Badge className="rounded-full bg-green-500 px-4 py-1 text-white">
                        작업완료
                      </Badge>
                    </TableCell>
                    <TableCell className="h-16 px-8 py-4">
                      2025.09.15 07:14
                    </TableCell>
                    <TableCell className="h-16 px-8 py-4">
                      2025.09.15 08:17
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-b border-stroke">
                    <TableCell className="h-16  px-8 py-4">DISCHARGE</TableCell>
                    <TableCell className="h-16 px-8 py-4">BPTS</TableCell>
                    <TableCell className="h-16 px-8 py-4">
                      <Badge className="rounded-full bg-green-500 px-4 py-1 text-white">
                        작업완료
                      </Badge>
                    </TableCell>
                    <TableCell className="h-16 px-8 py-4">
                      2025.09.14 11:47
                    </TableCell>
                    <TableCell className="h-16 px-8 py-4">
                      2025.09.14 13:24
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TContainerPage;

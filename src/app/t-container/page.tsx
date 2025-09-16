import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Settings,
} from 'lucide-react';

import { ExcelIcon } from '@/component/icons';
import { SearchInput } from '@/component/search-input';
import { Badge } from '@/component/shadcn-ui/badge';
import { Button } from '@/component/shadcn-ui/button';
import { Checkbox } from '@/component/shadcn-ui/checkbox';
import { Label } from '@/component/shadcn-ui/label';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/component/shadcn-ui/pagination';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/component/shadcn-ui/popover';
import { RadioGroup, RadioGroupItem } from '@/component/shadcn-ui/radio-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/component/shadcn-ui/select';
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TContainerTable,
} from '@/component/t-container-table';

const TContainerPage = () => {
  return (
    <div className="flex flex-col h-screen min-w-[1800px]">
      {/* 헤더 부분 - 고정 너비, 스크롤 없음 */}
      <div className="flex-shrink-0">
        <div className="flex flex-row justify-between p-4">
          <div className="flex flex-col">
            <h2 className="opacity-40">환적 컨테이너 조회</h2>
            <h1>화물 모니터링</h1>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <p className="font-bold">총 200개</p>
            <Button variant="secondary" className="text-white cursor-pointer">
              <ExcelIcon />
              엑셀 다운로드
            </Button>
          </div>
        </div>
      </div>

      {/* 검색 부분 - 독립적인 스크롤 */}
      <div className="flex-shrink-0 bg-filter">
        <div className="overflow-x-auto overflow-y-hidden">
          <div className="flex flex-row gap-2 items-center justify-between border-b border-stroke">
            <div className="flex flex-row gap-2 items-center px-4">
              <div className="flex flex-row gap-2 first:border-r first:pr-3 py-5 border-stroke">
                <Label className="opacity-50">신항</Label>

                <Checkbox variant="custom" id="SHINHANG_ALL" />
                <Label htmlFor="SHINHANG_ALL">ALL</Label>

                <Checkbox variant="custom" id="PNIT" />
                <Label htmlFor="PNIT">PNIT</Label>

                <Checkbox variant="custom" id="PNC" />
                <Label htmlFor="PNC">PNC</Label>

                <Checkbox variant="custom" id="HJNC" />
                <Label htmlFor="HJNC">HJNC</Label>

                <Checkbox variant="custom" id="HPNT" />
                <Label htmlFor="HPNT">HPNT</Label>

                <Checkbox variant="custom" id="BNCT" />
                <Label htmlFor="BNCT">BNCT</Label>

                <Checkbox variant="custom" id="BCT" />
                <Label htmlFor="BCT">BCT</Label>

                <Checkbox variant="custom" id="DGT" />
                <Label htmlFor="DGT">DGT</Label>
              </div>

              <div className="flex flex-row gap-2">
                <Label className="opacity-50">북항</Label>

                <Checkbox variant="custom" id="BUKHANG_ALL" />
                <Label htmlFor="BUKHANG_ALL">ALL</Label>

                <Checkbox variant="custom" id="BPTS" />
                <Label htmlFor="BPTS">BPTS</Label>

                <Checkbox variant="custom" id="BPTG" />
                <Label htmlFor="BPTG">BPTG</Label>

                <Checkbox variant="custom" id="HKTG" />
                <Label htmlFor="HKTG">HKTG</Label>
              </div>
            </div>

            <div className="flex flex-row gap-5 items-center pr-20">
              <div className="flex flex-row gap-2 first:border-r first:pr-5 py-5 border-stroke">
                <Label className="opacity-50">이상탐지</Label>

                <Checkbox variant="custom" id="NORMAL" />
                <Label htmlFor="NORMAL">정상</Label>

                <Checkbox variant="custom" id="PENDING_DISCHARGE" />
                <Label htmlFor="PENDING_DISCHARGE">미반입</Label>

                <Checkbox variant="custom" id="PENDING_LOADING" />
                <Label htmlFor="PENDING_LOADING">반입불가</Label>

                <Checkbox variant="custom" id="SHIPPING_CANCELLED" />
                <Label htmlFor="SHIPPING_CANCELLED">선적취소</Label>
              </div>

              <div className="flex flex-row gap-2">
                <Label className="opacity-50">작업 상태</Label>
                <Select defaultValue="ALL">
                  <SelectTrigger variant="custom">
                    <SelectValue placeholder="전체" />
                  </SelectTrigger>
                  <SelectContent variant="custom">
                    <SelectGroup>
                      <SelectItem value="ALL">전체</SelectItem>
                      <SelectItem value="DISCHARGE">양하 완료</SelectItem>
                      <SelectItem value="DISCHARGE_YARD">양하 야드</SelectItem>
                      <SelectItem value="GATE_OUT">양하 반출</SelectItem>
                      <SelectItem value="GATE_IN">선적 반입</SelectItem>
                      <SelectItem value="LOADING">선적 야드</SelectItem>
                      <SelectItem value="PENDING_LOADING">선적 완료</SelectItem>
                      <SelectItem value="PENDING_DISCHARGE">미양하</SelectItem>
                      <SelectItem value="PENDING_LOADING">미선적</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <RadioGroup className="flex flex-row" defaultValue="ALL">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="ALL" id="RADIO_ALL" />
                  <Label htmlFor="RADIO_ALL">전체(누적)</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="CURRENT" id="CURRENT" />
                  <Label htmlFor="CURRENT">현재</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="flex flex-row px-4 py-2 justify-between items-center gap-2">
            <Select defaultValue="ALL">
              <SelectTrigger variant="custom">
                <SelectValue placeholder="전체" />
              </SelectTrigger>
              <SelectContent variant="custom">
                <SelectGroup>
                  <SelectLabel>검색 조건</SelectLabel>
                  <SelectItem value="ALL">컨테이너 번호</SelectItem>
                  <SelectItem value="DISCHARGE">B/L No.</SelectItem>
                  <SelectItem value="DISCHARGE_YARD">BK No.</SelectItem>
                  <SelectItem value="GATE_OUT">선박명</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <SearchInput placeholder="컨테이너 번호를 입력하세요." />

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost">
                  <Settings />
                  컬럼 선택
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" side="bottom">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-row gap-2 items-center">
                    <Checkbox id="containerNumber" />
                    <Label htmlFor="containerNumber">컨테이너 번호</Label>
                  </div>

                  <div className="flex flex-row gap-2 items-center">
                    <Checkbox id="unloadingVessel" />
                    <Label htmlFor="unloadingVessel">양하 선박</Label>
                  </div>

                  <div className="flex flex-row gap-2 items-center">
                    <Checkbox id="shippingVessel" />
                    <Label htmlFor="shippingVessel">선적 선박</Label>
                  </div>

                  <div className="flex flex-row gap-2 items-center">
                    <Checkbox id="dockType" />
                    <Label htmlFor="dockType">자/타부두</Label>
                  </div>

                  <div className="flex flex-row gap-2 items-center">
                    <Checkbox id="bkNo" />
                    <Label htmlFor="bkNo">BK No.</Label>
                  </div>

                  <div className="flex flex-row gap-2 items-center">
                    <Checkbox id="blNo" />
                    <Label htmlFor="blNo">B/L No.</Label>
                  </div>

                  <div className="flex flex-row gap-2 items-center">
                    <Checkbox id="feet" />
                    <Label htmlFor="feet">20/40피트</Label>
                  </div>

                  <div className="flex flex-row gap-2 items-center">
                    <Checkbox id="fe" />
                    <Label htmlFor="fe">F/E</Label>
                  </div>

                  <div className="flex flex-row gap-2 items-center">
                    <Checkbox id="location" />
                    <Label htmlFor="location">야드 위치</Label>
                  </div>

                  <div className="flex flex-row gap-2 items-center">
                    <Checkbox id="temperature" />
                    <Label htmlFor="temperature">온도(°C)</Label>
                  </div>

                  <div className="flex flex-row gap-2 items-center">
                    <Checkbox id="oog" />
                    <Label htmlFor="oog">OOG</Label>
                  </div>

                  <div className="flex flex-row gap-2 items-center">
                    <Checkbox id="unloadingTerminal" />
                    <Label htmlFor="unloadingTerminal">양하 터미널</Label>
                  </div>

                  <div className="flex flex-row gap-2 items-center">
                    <Checkbox id="loadingTerminal" />
                    <Label htmlFor="loadingTerminal">선적 터미널</Label>
                  </div>

                  <div className="flex flex-row gap-2 items-center">
                    <Checkbox id="completeUnloading" />
                    <Label htmlFor="completeUnloading">양하 완료</Label>
                  </div>

                  <div className="flex flex-row gap-2 items-center">
                    <Checkbox id="unloadingYard" />
                    <Label htmlFor="unloadingYard">양하 야드</Label>
                  </div>

                  <div className="flex flex-row gap-2 items-center">
                    <Checkbox id="unloadingOut" />
                    <Label htmlFor="unloadingOut">양하 반출</Label>
                  </div>

                  <div className="flex flex-row gap-2 items-center">
                    <Checkbox id="loadingIn" />
                    <Label htmlFor="loadingIn">선적 반입</Label>
                  </div>

                  <div className="flex flex-row gap-2 items-center">
                    <Checkbox id="loadingYard" />
                    <Label htmlFor="loadingYard">선적 야드</Label>
                  </div>

                  <div className="flex flex-row gap-2 items-center">
                    <Checkbox id="completeLoading" />
                    <Label htmlFor="completeLoading">선적 완료</Label>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <TContainerTable className="text-base min-w-max">
        <TableHeader className="[&_tr]:border-b sticky top-0 z-10 bg-filter">
          <TableRow className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors [&_th]:text-center">
            <TableHead className="text-foreground h-10 border-r border-r-stroke px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] min-w-32">
              컨테이너 번호
            </TableHead>
            <TableHead className="text-foreground h-10 border-r border-r-stroke px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] min-w-40">
              양하 선박
            </TableHead>
            <TableHead className="text-foreground h-10 border-r border-r-stroke px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] min-w-40">
              선적 선박
            </TableHead>
            <TableHead className="text-foreground h-10 border-r border-r-stroke px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] min-w-24">
              자/타부두
            </TableHead>
            <TableHead className="text-foreground h-10 border-r border-r-stroke px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] min-w-32">
              BK No.
            </TableHead>
            <TableHead className="text-foreground h-10 border-r border-r-stroke px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] min-w-32">
              B/L No.
            </TableHead>
            <TableHead className="text-foreground h-10 border-r border-r-stroke px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] min-w-24">
              20/40 피트
            </TableHead>
            <TableHead className="text-foreground h-10 border-r border-r-stroke px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] min-w-16">
              F/E
            </TableHead>
            <TableHead className="text-foreground h-10 border-r border-r-stroke px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] min-w-32">
              야드 위치
            </TableHead>
            <TableHead className="text-foreground h-10 border-r border-r-stroke px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] min-w-24">
              온도(℃)
            </TableHead>
            <TableHead className="text-foreground h-10 border-r border-r-stroke px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] min-w-16">
              OOG
            </TableHead>
            <TableHead className="text-foreground h-10 border-r border-r-stroke px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] min-w-32">
              양하 터미널
            </TableHead>
            <TableHead className="text-foreground h-10 border-r border-r-stroke px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] min-w-32">
              선적 터미널
            </TableHead>
            <TableHead className="text-foreground h-10 border-r border-r-stroke px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] min-w-40">
              양하 완료
            </TableHead>
            <TableHead className="text-foreground h-10 border-r border-r-stroke px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] min-w-40">
              양하 야드
            </TableHead>
            <TableHead className="text-foreground h-10 border-r border-r-stroke px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] min-w-40">
              양하 반출
            </TableHead>
            <TableHead className="text-foreground h-10 border-r border-r-stroke px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] min-w-40">
              선적 반입
            </TableHead>
            <TableHead className="text-foreground h-10 border-r border-r-stroke px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] min-w-40">
              선적 야드
            </TableHead>
            <TableHead className="text-foreground h-10 border-r border-r-stroke px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] min-w-40">
              선적 완료
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="[&_tr:last-child]:border-0 bg-white">
          {Array.from({ length: 50 }, (_, index) => (
            <TableRow
              key={index}
              className="data-[state=selected]:bg-muted border-b transition-colors [&_td]:text-center hover:bg-[#EEF0FC]"
            >
              <TableCell className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] border border-stroke first:border-l-0 last:border-r-0">
                CONT{String(index + 1).padStart(7, '0')}
              </TableCell>
              <TableCell className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] border border-stroke first:border-l-0 last:border-r-0">
                VESSEL{String(index + 1).padStart(6, '0')}
              </TableCell>
              <TableCell className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] border border-stroke first:border-l-0 last:border-r-0">
                SHIP{String(index + 1).padStart(8, '0')}
              </TableCell>
              <TableCell className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] border border-stroke first:border-l-0 last:border-r-0">
                {index % 2 === 0 ? '자부두' : '타부두'}
              </TableCell>
              <TableCell className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] border border-stroke first:border-l-0 last:border-r-0">
                BK2025{String(index + 1).padStart(6, '0')}
              </TableCell>
              <TableCell className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] border border-stroke first:border-l-0 last:border-r-0">
                BL2025{String(index + 1).padStart(6, '0')}
              </TableCell>
              <TableCell className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] border border-stroke first:border-l-0 last:border-r-0">
                {index % 2 === 0 ? '40' : '20'}
              </TableCell>
              <TableCell className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] border border-stroke first:border-l-0 last:border-r-0">
                {index % 2 === 0 ? 'F' : 'E'}
              </TableCell>
              <TableCell className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] border border-stroke first:border-l-0 last:border-r-0">
                {String(index + 10).padStart(2, '0')}A/
                {String(index + 20).padStart(2, '0')}/
                {String(index + 30).padStart(2, '0')}/
                {String(index + 40).padStart(2, '0')}
              </TableCell>
              <TableCell className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] border border-stroke first:border-l-0 last:border-r-0">
                {index % 2 === 0
                  ? `-${15 + (index % 10)}`
                  : `${20 + (index % 10)}`}
              </TableCell>
              <TableCell className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] border border-stroke first:border-l-0 last:border-r-0">
                {index % 3 === 0 ? 'Y' : 'N'}
              </TableCell>
              <TableCell className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] border border-stroke first:border-l-0 last:border-r-0">
                {
                  ['PNIT', 'PNC', 'HJNC', 'HPNT', 'BNCT', 'BCT', 'DGT'][
                    index % 7
                  ]
                }
              </TableCell>
              <TableCell className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] border border-stroke first:border-l-0 last:border-r-0">
                {
                  ['PNIT', 'PNC', 'HJNC', 'HPNT', 'BNCT', 'BCT', 'DGT'][
                    (index + 1) % 7
                  ]
                }
              </TableCell>
              <TableCell className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] border border-stroke first:border-l-0 last:border-r-0">
                2025.09.{String(18 + (index % 10)).padStart(2, '0')}{' '}
                {String(5 + (index % 20)).padStart(2, '0')}:
                {String(30 + (index % 30)).padStart(2, '0')}
              </TableCell>
              <TableCell className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] border border-stroke first:border-l-0 last:border-r-0">
                2025.09.{String(18 + (index % 10)).padStart(2, '0')}{' '}
                {String(7 + (index % 20)).padStart(2, '0')}:
                {String(30 + (index % 30)).padStart(2, '0')}
              </TableCell>
              <TableCell className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] border border-stroke first:border-l-0 last:border-r-0">
                2025.09.{String(18 + (index % 10)).padStart(2, '0')}{' '}
                {String(1 + (index % 20)).padStart(2, '0')}:
                {String(30 + (index % 30)).padStart(2, '0')}
              </TableCell>
              <TableCell className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] border border-stroke first:border-l-0 last:border-r-0">
                2025.09.{String(16 + (index % 10)).padStart(2, '0')}{' '}
                {String(11 + (index % 20)).padStart(2, '0')}:
                {String(30 + (index % 30)).padStart(2, '0')}
              </TableCell>
              <TableCell className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] border border-stroke first:border-l-0 last:border-r-0">
                2025.09.{String(17 + (index % 10)).padStart(2, '0')}{' '}
                {String(8 + (index % 20)).padStart(2, '0')}:
                {String(30 + (index % 30)).padStart(2, '0')}
              </TableCell>
              <TableCell className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] border border-stroke first:border-l-0 last:border-r-0">
                2025.09.{String(18 + (index % 10)).padStart(2, '0')}{' '}
                {String(21 + (index % 20)).padStart(2, '0')}:
                {String(30 + (index % 30)).padStart(2, '0')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TContainerTable>

      {/* 푸터 부분 - 고정 너비, 스크롤 없음 */}
      <footer className="bg-white border-t border-stroke flex-shrink-0">
        <div className="flex flex-row items-center w-full justify-center gap-2 py-8 px-4 flex-nowrap">
          <Badge variant="gray" className="text-sm py-1">
            컨테이너 수 <span className="font-bold">총 200개</span>
          </Badge>
          <Badge variant="gray" className="text-sm py-1">
            조회결과 <span className="font-bold">총 200건</span>
          </Badge>
          <Badge variant="outlineDestructive" className="text-sm py-1">
            조회실패 <span className="font-bold">0건</span>
          </Badge>

          <Pagination className="block w-auto !mx-0">
            <PaginationContent>
              <div className="flex">
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className="rounded-r-none border border-control"
                  >
                    <ChevronsLeft className="h-4 w-4" />
                    <span className="sr-only">첫 페이지</span>
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className="rounded-l-none border border-control border-l-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">이전 페이지</span>
                  </PaginationLink>
                </PaginationItem>
              </div>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(page => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === 1}
                    className={`${page === 1 ? 'border-none bg-filter' : ''}`}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <div className="flex">
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className="rounded-r-none border border-control"
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">다음 페이지</span>
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className="rounded-l-none border border-control border-l-0"
                  >
                    <ChevronsRight className="h-4 w-4" />
                    <span className="sr-only">마지막 페이지</span>
                  </PaginationLink>
                </PaginationItem>
              </div>
            </PaginationContent>
          </Pagination>
        </div>
      </footer>
    </div>
  );
};

export default TContainerPage;

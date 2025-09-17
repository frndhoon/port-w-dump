import {
  SearchKeywordFilter,
  TContainerListResponse,
} from '@/app/t-container/t-container.type';

// 조회실패 계산 로직
const calculateSearchFailure = (
  searchKeywordFilter: SearchKeywordFilter,
  tContainerListData: TContainerListResponse['result'] | undefined
) => {
  // 검색 키워드가 없으면 조회실패 없음
  if (!searchKeywordFilter.searchKeyword.trim()) {
    return { informationNotFound: 0, duplicateSearch: 0 };
  }

  // 입력된 검색 키워드들을 배열로 변환
  const inputKeywords = searchKeywordFilter.searchKeyword
    .split(',')
    .map(keyword => keyword.trim())
    .filter(keyword => keyword.length > 0);

  if (inputKeywords.length === 0) {
    return { informationNotFound: 0, duplicateSearch: 0 };
  }

  // 중복검색 계산: 입력값에서 중복된 키워드 개수
  const keywordCountMap = new Map<string, number>();
  inputKeywords.forEach(keyword => {
    keywordCountMap.set(keyword, (keywordCountMap.get(keyword) || 0) + 1);
  });

  const duplicateSearch = Array.from(keywordCountMap.values()).reduce(
    (sum, count) => sum + (count > 1 ? count - 1 : 0),
    0
  );

  // 정보없음 계산: 입력값과 응답값의 유일값 개수 비교
  const uniqueInputCount = keywordCountMap.size;

  let uniqueResponseCount = 0;
  if (tContainerListData?.monitoringContainers) {
    const responseValues = new Set<string>();

    tContainerListData.monitoringContainers.forEach(container => {
      let value: string | null = null;

      switch (searchKeywordFilter.searchType) {
        case 'CON_NO':
          value = container.conNo;
          break;
        case 'BL_NO':
          value = container.blNo;
          break;
        case 'BK_NO':
          value = container.bookingNo;
          break;
        case 'VESSEL_NAME':
          // 선박명은 하역선박과 적재선박 모두 확인
          if (container.dischargeVesselName) {
            responseValues.add(container.dischargeVesselName);
          }
          if (container.loadingVesselName) {
            responseValues.add(container.loadingVesselName);
          }
          break;
      }

      if (value && searchKeywordFilter.searchType !== 'VESSEL_NAME') {
        responseValues.add(value);
      }
    });

    uniqueResponseCount = responseValues.size;
  }

  const informationNotFound = Math.max(
    0,
    uniqueInputCount - uniqueResponseCount
  );

  return { informationNotFound, duplicateSearch };
};

export { calculateSearchFailure };

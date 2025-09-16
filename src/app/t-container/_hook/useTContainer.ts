import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getInstance, postInstance } from '@/api/instance';
import {
  PaginationState,
  TContainerListRequest,
  TContainerListResponse,
} from '@/app/t-container/t-container.type';

// 컨테이너 목록 조회
const useTContainerList = (
  requestBody: TContainerListRequest,
  pagination: PaginationState
) => {
  const queryParams = {
    page: pagination.page.toString(),
    size: pagination.size.toString(),
    sort: pagination.sort,
  };

  const { data, isLoading, isError, isFetching, refetch } = useQuery<
    TContainerListResponse['result']
  >({
    queryKey: ['tContainerList', requestBody, pagination], // pagination 다시 추가
    queryFn: async () => {
      const responseData = await postInstance<
        TContainerListRequest,
        TContainerListResponse['result']
      >('/containers/monitoring', queryParams, requestBody);

      return responseData.result;
    },

    placeholderData: keepPreviousData, // 이전 데이터를 유지하여 페이지네이션 시 부드러운 전환
    staleTime: 5 * 60 * 1000, // 5분간 데이터를 fresh로 유지
  });

  return { data, isLoading, isError, isFetching, refetch };
};

// 컨테이너 상세 조회
const useTContainerDetail = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['tContainerDetail'],
    queryFn: () => getInstance(`/containers/monitoring/${id}`),
  });

  return { data, isLoading, error };
};

export { useTContainerDetail, useTContainerList };

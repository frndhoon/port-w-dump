import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getInstance, postInstance } from '@/api/instance';
import {
  PaginationState,
  TContainerListRequest,
  TContainerListResponse,
} from '@/app/t-container/t-container.type';
// Mock 데이터 import
// import mockListData from '@/mock/mock-use-tcontainer-list.json';
import {
  shouldRetry,
  showDetailErrorMessage,
  showListErrorMessage,
} from '@/util/error-utils';

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

  const { data, isLoading, isError, isFetching, refetch, error } = useQuery<
    TContainerListResponse['result']
  >({
    queryKey: ['tContainerList', requestBody, pagination],
    queryFn: async () => {
      const responseData = await postInstance<
        TContainerListRequest,
        TContainerListResponse['result']
      >('/containers/monitoring', queryParams, requestBody);
      return responseData.result;

      // Mock 데이터 사용
      // return mockListData.result;
    },

    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    retry: shouldRetry,
  });

  // 에러 발생 시 토스트 메시지 표시
  useEffect(() => {
    if (error) {
      showListErrorMessage(error);
    }
  }, [error]);

  return { data, isLoading, isError, isFetching, refetch, error };
};

// 컨테이너 상세 조회
const useTContainerDetail = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['tContainerDetail', id],
    queryFn: () => getInstance(`/containers/monitoring/${id}`),
    retry: shouldRetry,
  });

  // 에러 발생 시 토스트 메시지 표시
  useEffect(() => {
    if (error) {
      showDetailErrorMessage(error);
    }
  }, [error]);

  return { data, isLoading, error };
};

export { useTContainerDetail, useTContainerList };

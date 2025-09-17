import { ApiResponse } from '@/type/api.type';
import {
  createHttpError,
  createNetworkError,
  getErrorMessage,
  isNetworkError,
} from '@/util/error-utils';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

const getInstance = async <T>(endpoint: string): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${SERVER_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    // fetch는 400, 500 에러를 모두 처리하지 않음
    if (!response.ok) {
      const errorMessage = getErrorMessage(response.status);
      const httpError = createHttpError(
        response.status,
        errorMessage.message,
        `HTTP_${response.status}`
      );

      console.error('GET 요청 실패:', {
        endpoint,
        status: response.status,
        userMessage: errorMessage,
      });

      throw httpError;
    }

    return await response.json();
  } catch (error) {
    // 네트워크 오류나 기타 예외 처리
    if (isNetworkError(error)) {
      throw createNetworkError();
    }

    // 이미 처리된 HTTP 에러는 그대로 전달
    throw error;
  }
};

const postInstance = async <TRequest, TResponse>(
  endpoint: string,
  queryString?: Record<string, string>,
  data?: TRequest
): Promise<ApiResponse<TResponse>> => {
  try {
    const url = queryString
      ? `${SERVER_URL}${endpoint}?${new URLSearchParams(queryString).toString()}`
      : `${SERVER_URL}${endpoint}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: data ? JSON.stringify(data) : null,
    });

    // fetch는 400, 500 에러를 모두 처리하지 않음
    if (!response.ok) {
      const errorMessage = getErrorMessage(response.status);
      const httpError = createHttpError(
        response.status,
        errorMessage.message,
        `HTTP_${response.status}`
      );

      console.error('POST 요청 실패:', {
        endpoint,
        status: response.status,
        userMessage: errorMessage,
      });

      throw httpError;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    // 네트워크 오류나 기타 예외 처리
    if (isNetworkError(error)) {
      throw createNetworkError();
    }

    // 이미 처리된 HTTP 에러는 그대로 전달
    throw error;
  }
};

export { getInstance, postInstance };

import { ApiResponse } from '@/type/api.type';

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

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('GET 요청 실패:', error);
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

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();

    return result;
  } catch (error) {
    console.error('POST 요청 실패:', error);
    throw error;
  }
};

export { getInstance, postInstance };

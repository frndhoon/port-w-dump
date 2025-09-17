type ApiResponse<T> = {
  statusCode: number;
  message?: string;
  result?: T;
};

// HTTP 에러 타입 정의
type HttpError = {
  status: number;
  message: string;
  code: string;
};

// 사용자 친화적 에러 메시지 타입
type UserFriendlyError = {
  title: string;
  message: string;
  action?: string;
};

export type { ApiResponse, HttpError, UserFriendlyError };

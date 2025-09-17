import { toast } from 'sonner';

import { HttpError, UserFriendlyError } from '@/type/api.type';

// HTTP 상태 코드를 사용자 친화적 메시지로 변환
export const getErrorMessage = (status: number): UserFriendlyError => {
  switch (status) {
    case 400:
      return {
        title: '잘못된 요청',
        message: '요청한 데이터가 올바르지 않습니다. 입력값을 확인해주세요.',
        action: '다시 시도해주세요',
      };
    case 401:
      return {
        title: '인증 실패',
        message: '로그인이 필요합니다. 다시 로그인해주세요.',
        action: '로그인 페이지로 이동',
      };
    case 403:
      return {
        title: '접근 권한 없음',
        message: '해당 기능에 접근할 권한이 없습니다.',
        action: '관리자에게 문의하세요',
      };
    case 404:
      return {
        title: '데이터를 찾을 수 없음',
        message: '요청한 컨테이너 정보를 찾을 수 없습니다.',
        action: '목록을 새로고침해주세요',
      };
    case 429:
      return {
        title: '요청 한도 초과',
        message: '너무 많은 요청을 보냈습니다. 잠시 후 다시 시도해주세요.',
        action: '잠시 후 다시 시도',
      };
    case 500:
      return {
        title: '서버 오류',
        message: '서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        action: '잠시 후 다시 시도',
      };
    case 502:
    case 503:
    case 504:
      return {
        title: '서비스 일시 중단',
        message:
          '서비스가 일시적으로 중단되었습니다. 잠시 후 다시 시도해주세요.',
        action: '잠시 후 다시 시도',
      };
    default:
      return {
        title: '알 수 없는 오류',
        message: '예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        action: '잠시 후 다시 시도',
      };
  }
};

// HttpError 타입 가드 함수
export const isHttpError = (error: unknown): error is HttpError => {
  return (
    error instanceof Error &&
    'status' in error &&
    'code' in error &&
    typeof (error as HttpError).status === 'number'
  );
};

// 네트워크 오류인지 확인하는 함수
export const isNetworkError = (error: unknown): boolean => {
  return error instanceof TypeError && error.message.includes('fetch');
};

// HTTP 에러 객체 생성 함수
export const createHttpError = (
  status: number,
  message: string,
  code: string
): HttpError => {
  return {
    status,
    message,
    code,
  };
};

// 네트워크 에러 객체 생성 함수
export const createNetworkError = (): HttpError => {
  return {
    status: 0,
    message: '네트워크 연결을 확인해주세요.',
    code: 'NETWORK_ERROR',
  };
};

// 컨테이너 목록 조회용 에러 메시지 표시 함수
export const showListErrorMessage = (error: unknown) => {
  // HttpError 타입인지 확인 (status와 code 속성이 있는지 체크)
  if (
    error &&
    typeof error === 'object' &&
    'status' in error &&
    'code' in error
  ) {
    const httpError = error as HttpError;

    switch (httpError.status) {
      case 400:
        toast.error('검색 조건을 확인해주세요', {
          description: '입력한 검색 조건이 올바르지 않습니다.',
        });
        break;
      case 401:
        toast.error('로그인이 필요합니다', {
          description: '다시 로그인해주세요.',
          action: {
            label: '로그인',
            onClick: () => {},
          },
        });
        break;
      case 403:
        toast.error('접근 권한이 없습니다', {
          description: '관리자에게 문의하세요.',
        });
        break;
      case 404:
        toast.error('데이터를 찾을 수 없습니다', {
          description: '요청한 컨테이너 정보가 존재하지 않습니다.',
        });
        break;
      case 429:
        toast.error('요청이 너무 많습니다', {
          description: '잠시 후 다시 시도해주세요.',
        });
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        toast.error('서버 오류가 발생했습니다', {
          description: '잠시 후 다시 시도해주세요.',
        });
        break;
      default:
        toast.error('알 수 없는 오류가 발생했습니다', {
          description: '잠시 후 다시 시도해주세요.',
        });
    }
  } else {
    // 네트워크 오류
    toast.error('네트워크 연결을 확인해주세요', {
      description: '인터넷 연결 상태를 확인하고 다시 시도해주세요.',
    });
  }
};

// 컨테이너 상세 조회용 에러 메시지 표시 함수
export const showDetailErrorMessage = (error: unknown) => {
  // HttpError 타입인지 확인 (status와 code 속성이 있는지 체크)
  if (
    error &&
    typeof error === 'object' &&
    'status' in error &&
    'code' in error
  ) {
    const httpError = error as HttpError;

    switch (httpError.status) {
      case 400:
        toast.error('잘못된 요청입니다', {
          description: '컨테이너 ID가 올바르지 않습니다.',
        });
        break;
      case 401:
        toast.error('로그인이 필요합니다', {
          description: '다시 로그인해주세요.',
          action: {
            label: '로그인',
            onClick: () => {
              window.location.href = '/login';
            },
          },
        });
        break;
      case 403:
        toast.error('접근 권한이 없습니다', {
          description: '관리자에게 문의하세요.',
        });
        break;
      case 404:
        toast.error('컨테이너를 찾을 수 없습니다', {
          description: '요청한 컨테이너가 존재하지 않습니다.',
          action: {
            label: '목록으로',
            onClick: () => {
              window.location.href = '/t-container';
            },
          },
        });
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        toast.error('서버 오류가 발생했습니다', {
          description: '잠시 후 다시 시도해주세요.',
        });
        break;
      default:
        toast.error('알 수 없는 오류가 발생했습니다', {
          description: '잠시 후 다시 시도해주세요.',
        });
    }
  } else {
    // 네트워크 오류
    toast.error('네트워크 연결을 확인해주세요', {
      description: '인터넷 연결 상태를 확인하고 다시 시도해주세요.',
    });
  }
};

// 재시도 정책 함수
export const shouldRetry = (failureCount: number, error: unknown): boolean => {
  // HTTP 에러인 경우 재시도 정책 설정
  if (
    error &&
    typeof error === 'object' &&
    'status' in error &&
    'code' in error
  ) {
    const httpError = error as HttpError;

    // 4xx 에러는 재시도하지 않음 (클라이언트 오류)
    if (httpError.status >= 400 && httpError.status < 500) {
      return false;
    }

    // 5xx 에러는 최대 2번 재시도
    if (httpError.status >= 500) {
      return failureCount < 2;
    }
  }

  // 네트워크 오류는 최대 3번 재시도
  return failureCount < 3;
};

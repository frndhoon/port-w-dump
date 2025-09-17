'use client';

import { CircleArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    // 깔끔한 URL로 메인 페이지로 이동 (sessionStorage에서 상태 복원)
    router.push('/t-container');
  };

  return (
    <button
      className="cursor-pointer opacity hover:opacity-50"
      onClick={handleBack}
    >
      <CircleArrowLeft className="" size={24} />
    </button>
  );
};

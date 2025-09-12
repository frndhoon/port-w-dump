import '@/app/globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2', // woff2: 폰트 파일 크기 줄이기 위해 사용
  display: 'swap', // 폰트 로딩 방식 설정 (swap: 폰트 로딩 시 대체 폰트 사용)
});

const metadata: Metadata = {
  title: 'Port-w Dump',
  description: 'port monitoring dump',
  openGraph: {
    title: 'Port-w Dump',
    siteName: 'Port-w',
    url: 'https://port-i.smartm2m.co.kr',
    images: {
      url: 'https://port-i.smartm2m.co.kr/portiweb/opengraph_thumbnail.png',
      width: 1200,
      height: 630,
      alt: '포트아이 오픈그래프 썸네일',
    },
    type: 'website',
    locale: 'ko_KR',
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      {/* body에 직접 폰트 클래스 적용 -> font-family 적용 */}
      <body className={`${pretendard.className}`}>{children}</body>
    </html>
  );
};

export { metadata };

export default RootLayout;

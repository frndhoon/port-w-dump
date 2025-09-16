'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import bpaLogo from '@/asset/icons/bpa_logo.svg';
import {
  ContainerIcon,
  ScheduleIcon,
  ShipMonitoringIcon,
  StatisticsIcon,
  UserIcon,
} from '@/component/icons';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex h-screen w-26 flex-col border-r border-stroke">
      {/* 로고 섹션 */}
      <NavMenuItem
        href="/"
        icon={
          <Image
            src={bpaLogo}
            alt="logo"
            className="w-16 h-3.5 object-contain"
          />
        }
        isActive={pathname === '/'}
      />

      {/* 메인 네비게이션 메뉴 */}
      <div className="flex flex-grow flex-col">
        <NavMenuItem
          href="/ship-monitoring"
          icon={<ShipMonitoringIcon />}
          label={'선박\n모니터링'}
          isActive={pathname.startsWith('/ship-monitoring')}
        />
        <NavMenuItem
          href="/t-container"
          icon={<ContainerIcon />}
          label={'화물\n모니터링'}
          isActive={pathname.startsWith('/t-container')}
        />
        <NavMenuItem
          href="/schedule"
          icon={<ScheduleIcon />}
          label={'선석\n스케줄(G)'}
          isActive={pathname === '/schedule'}
        />
        <NavMenuItem
          href="/table-schedule"
          icon={<ScheduleIcon />}
          label={'선석\n스케줄(T)'}
          isActive={pathname.startsWith('/table-schedule')}
        />
        <NavMenuItem
          href="/container"
          icon={<ContainerIcon />}
          label={'컨테이너\n조회'}
          isActive={pathname.startsWith('/container')}
        />
        <NavMenuItem
          href="/statistics/portmis-statistics"
          icon={<StatisticsIcon />}
          label={'통계'}
          isActive={pathname.startsWith('/statistics')}
        />
        <NavMenuItem
          href="/user/address-book"
          icon={<UserIcon />}
          label={'개인화\n설정'}
          isActive={pathname.startsWith('/user')}
        />
      </div>

      <hr className="border-stroke w-full" />

      {/* 사용자 프로필 섹션 */}
      <NavMenuItem
        href="/user/profile"
        icon={
          // data를 받아오면 해당 img src를 넣어줘야함
          <div className="h-9 w-9 rounded-full bg-gray-900 object-contain flex items-center justify-center">
            <span className="text-white text-base font-semibold">P</span>
          </div>
        }
        label={'Port-i'}
        isActive={pathname === '/user/profile'}
      />
    </nav>
  );
};

const NavMenuItem = ({
  href,
  icon,
  label,
  isActive,
}: {
  href: string;
  icon: React.ReactNode;
  label?: string;
  isActive?: boolean;
}) => {
  const activeClasses = isActive
    ? 'text-primary bg-gray-100 font-bold'
    : 'bg-white text-gray-900 font-light';

  return (
    <Link
      href={href}
      className={`relative flex flex-col items-center justify-center h-26 gap-2 whitespace-pre-line py-3 text-center text-lg/5 hover:bg-gray-100 ${activeClasses}`}
    >
      {icon}
      {label}
    </Link>
  );
};

export { Navbar };

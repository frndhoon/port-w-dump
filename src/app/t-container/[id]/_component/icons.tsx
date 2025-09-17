import { OperationType } from '@/app/t-container/t-container.type';

const BlueCargoArrowIcon = ({ className }: { className?: string }) => (
  <svg
    width="62"
    height="51"
    viewBox="0 0 62 51"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M31.1602 47.2646L45.17 36.2548H17.1503L31.1602 47.2646Z"
      fill="#85C8FF"
    />
    <rect
      width="17.3479"
      height="12.7617"
      transform="matrix(1 0 0 -1 22.4824 38.8047)"
      fill="#85C8FF"
    />
    <rect
      x="-0.5"
      y="0.5"
      width="27.3042"
      height="27.3042"
      transform="matrix(-1 0 0 1 60.6855 0.964355)"
      fill="#DBEFFF"
      stroke="#85C8FF"
    />
    <rect
      x="-0.5"
      y="0.5"
      width="33.1211"
      height="27.3042"
      transform="matrix(-1 0 0 1 33.7559 0.964355)"
      fill="#DBEFFF"
      stroke="#85C8FF"
    />
    <line
      x1="26.4512"
      y1="8.53174"
      x2="26.4512"
      y2="22.2437"
      stroke="#85C8FF"
    />
    <line
      x1="17.2148"
      y1="8.53174"
      x2="17.2148"
      y2="22.2437"
      stroke="#85C8FF"
    />
    <line x1="7.9707" y1="8.53174" x2="7.9707" y2="22.2437" stroke="#85C8FF" />
  </svg>
);

const CargoIcon = ({
  operationType,
  className,
}: {
  operationType: OperationType;
  className?: string;
}) => {
  const getFillClass = (operationType: OperationType) => {
    switch (operationType) {
      case 'LOADING':
        return '#FFDDDD';
      case 'LOADING_YARD':
        return '#FFDDDD';
      case 'GATE_IN':
        return '#FFDDDD';
      case 'GATE_OUT':
        return '#DBEFFF';
      case 'DISCHARGE_YARD':
        return '#DBEFFF';
      case 'DISCHARGE':
        return '#DBEFFF';
    }
  };

  const getStrokeClass = (operationType: OperationType) => {
    switch (operationType) {
      case 'LOADING':
        return '#FF8C8C';
      case 'LOADING_YARD':
        return '#FF8C8C';
      case 'GATE_IN':
        return '#FF8C8C';
      case 'GATE_OUT':
        return '#85C8FF';
      case 'DISCHARGE_YARD':
        return '#85C8FF';
      case 'DISCHARGE':
        return '#85C8FF';
    }
  };

  const fillColor = getFillClass(operationType);
  const strokeColor = getStrokeClass(operationType);
  return (
    <svg
      width="62"
      height="30"
      viewBox="0 0 62 30"
      fill={fillColor}
      stroke={strokeColor}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="-0.5"
        y="0.5"
        width="27.3042"
        height="27.3042"
        transform="matrix(-1 0 0 1 60.6855 0.964355)"
        fill={fillColor}
        stroke={strokeColor}
      />
      <rect
        x="-0.5"
        y="0.5"
        width="33.1211"
        height="27.3042"
        transform="matrix(-1 0 0 1 33.7559 0.964355)"
        fill={fillColor}
        stroke={strokeColor}
      />
      <line
        x1="26.4512"
        y1="8.53174"
        x2="26.4512"
        y2="22.2437"
        stroke={strokeColor}
      />
      <line
        x1="17.2148"
        y1="8.53174"
        x2="17.2148"
        y2="22.2437"
        stroke={strokeColor}
      />
      <line
        x1="7.9707"
        y1="8.53174"
        x2="7.9707"
        y2="22.2437"
        stroke={strokeColor}
      />
    </svg>
  );
};

const RedCargoArrowIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="74"
      height="64"
      viewBox="0 0 74 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="0.5"
        y="-0.5"
        width="33.1808"
        height="33.1808"
        transform="matrix(1 8.74228e-08 8.74228e-08 -1 0.137207 62.6226)"
        fill="#FFDDDD"
        stroke="#FF8C8C"
      />
      <rect
        x="0.5"
        y="-0.5"
        width="40.2054"
        height="33.1808"
        transform="matrix(1 8.74228e-08 8.74228e-08 -1 32.6577 62.6226)"
        fill="#FFDDDD"
        stroke="#FF8C8C"
      />
      <line x1="42.79" y1="54.4849" x2="42.79" y2="37.9261" stroke="#FF8C8C" />
      <line
        x1="53.9438"
        y1="54.4849"
        x2="53.9439"
        y2="37.9261"
        stroke="#FF8C8C"
      />
      <line
        x1="65.1079"
        y1="54.4849"
        x2="65.1079"
        y2="37.9261"
        stroke="#FF8C8C"
      />
      <path
        d="M37.0005 4.06281L20.0819 17.3586L53.9191 17.3586L37.0005 4.06281Z"
        fill="#FF8C8C"
      />
      <rect
        width="20.9497"
        height="15.4113"
        transform="matrix(-1 -8.74228e-08 -8.74228e-08 1 47.479 14.2803)"
        fill="#FF8C8C"
      />
    </svg>
  );
};

const TruckIcon = () => {
  return (
    <svg
      width="145"
      height="63"
      viewBox="0 0 145 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.5">
        <rect
          width="23.0376"
          height="23.0376"
          rx="11.5188"
          transform="matrix(1 8.74228e-08 8.74228e-08 -1 66.8867 62.7241)"
          fill="#CED1DC"
        />
        <rect
          x="0.5"
          y="-0.5"
          width="22.0376"
          height="22.0376"
          rx="11.0188"
          transform="matrix(1 8.74228e-08 8.74228e-08 -1 66.8867 61.7241)"
          stroke="black"
          strokeOpacity="0.1"
        />
        <rect
          width="9.14951"
          height="9.14951"
          rx="4.57476"
          transform="matrix(1 8.74228e-08 8.74228e-08 -1 73.832 55.7749)"
          fill="#757780"
        />
      </g>
      <g opacity="0.5">
        <rect
          width="23.0376"
          height="23.0376"
          rx="11.5188"
          transform="matrix(1 8.74228e-08 8.74228e-08 -1 8.58398 62.7295)"
          fill="#CED1DC"
        />
        <rect
          x="0.5"
          y="-0.5"
          width="22.0376"
          height="22.0376"
          rx="11.0188"
          transform="matrix(1 8.74228e-08 8.74228e-08 -1 8.58398 61.7295)"
          stroke="black"
          strokeOpacity="0.1"
        />
        <rect
          width="9.14951"
          height="9.14951"
          rx="4.57476"
          transform="matrix(1 8.74228e-08 8.74228e-08 -1 15.5293 55.7803)"
          fill="#757780"
        />
      </g>
      <path
        d="M131.813 10.9602C130.864 9.78361 129.433 9.09961 127.921 9.09961H101.883V47.2546H0.82785V53.0519L144.223 53.6657L144.223 26.3435L131.813 10.9602Z"
        fill="#757780"
      />
      <path
        d="M127.921 9.59961H102.384V47.7549H1.32812V52.5537L143.723 53.1631V26.5186L131.424 11.2744C130.623 10.2817 129.441 9.67802 128.176 9.60645L127.921 9.59961Z"
        stroke="black"
        strokeOpacity="0.1"
      />
      <path
        d="M134.706 14.5132H120.855V26.2547H144.223L134.706 14.5132Z"
        fill="#CED1DC"
      />
      <path
        d="M121.355 15.0132V25.7544H143.173L134.469 15.0132H121.355Z"
        stroke="black"
        strokeOpacity="0.1"
      />
      <rect
        x="0.875"
        y="47.3013"
        width="40.2055"
        height="5.7458"
        fill="#999BA5"
      />
      <rect
        x="1.375"
        y="47.8013"
        width="39.2055"
        height="4.7458"
        stroke="black"
        strokeOpacity="0.1"
      />
      <rect
        width="23.0376"
        height="23.0376"
        rx="11.5188"
        transform="matrix(1 8.74228e-08 8.74228e-08 -1 29.6465 62.7241)"
        fill="#CED1DC"
      />
      <rect
        x="0.5"
        y="-0.5"
        width="22.0376"
        height="22.0376"
        rx="11.0188"
        transform="matrix(1 8.74228e-08 8.74228e-08 -1 29.6465 61.7241)"
        stroke="black"
        strokeOpacity="0.1"
      />
      <rect
        width="9.14951"
        height="9.14951"
        rx="4.57476"
        transform="matrix(1 8.74228e-08 8.74228e-08 -1 36.5918 55.7749)"
        fill="#757780"
      />
      <rect
        width="23.0376"
        height="23.0376"
        rx="11.5188"
        transform="matrix(1 8.74228e-08 8.74228e-08 -1 94.832 62.7192)"
        fill="#CED1DC"
      />
      <rect
        x="0.5"
        y="-0.5"
        width="22.0376"
        height="22.0376"
        rx="11.0188"
        transform="matrix(1 8.74228e-08 8.74228e-08 -1 94.832 61.7192)"
        stroke="black"
        strokeOpacity="0.1"
      />
      <rect
        width="9.14951"
        height="9.14951"
        rx="4.57476"
        transform="matrix(1 8.74228e-08 8.74228e-08 -1 101.777 55.77)"
        fill="#757780"
      />
    </svg>
  );
};

const VesselIcon = () => {
  return (
    <svg
      width="160"
      height="66"
      viewBox="0 0 160 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.9195 1.51556C14.9357 1.11215 15.2674 0.793457 15.6712 0.793457C16.0749 0.793457 16.4067 1.11215 16.4229 1.51556L17.9166 38.6853H13.4258L14.9195 1.51556Z"
        fill="#9A9DAC"
      />
      <path
        d="M17.3616 24.9717H13.978L13.2949 41.5815H18.0184L17.3616 24.9717Z"
        fill="#5D606B"
      />
      <path
        d="M141.707 10.8946C140.79 9.45021 139.198 8.5752 137.486 8.5752H107.519V43.3097H148.416V21.4583L141.707 10.8946Z"
        fill="#757780"
      />
      <path
        d="M137.486 9.0752H108.019V42.8096H147.916V21.6035L141.285 11.1631C140.46 9.8631 139.026 9.0752 137.486 9.0752Z"
        stroke="black"
        strokeOpacity="0.1"
      />
      <rect
        width="37.3591"
        height="2.90435"
        transform="matrix(-1 0 0 1 148.416 21.4302)"
        fill="#CED1DC"
      />
      <rect
        width="2.55429"
        height="4.55201"
        transform="matrix(-1 0 0 1 134.459 14.7007)"
        fill="#CED1DC"
      />
      <rect
        width="2.55429"
        height="4.55201"
        transform="matrix(-1 0 0 1 129.244 14.7007)"
        fill="#CED1DC"
      />
      <rect
        width="2.55429"
        height="4.55201"
        transform="matrix(-1 0 0 1 124.035 14.7007)"
        fill="#CED1DC"
      />
      <rect
        width="2.55429"
        height="4.55201"
        transform="matrix(-1 0 0 1 118.82 14.7007)"
        fill="#CED1DC"
      />
      <rect
        width="2.55429"
        height="4.55201"
        transform="matrix(-1 0 0 1 113.605 14.7007)"
        fill="#CED1DC"
      />
      <rect
        width="2.55429"
        height="1.8571"
        transform="matrix(-1 0 0 1 134.459 11.7632)"
        fill="#CED1DC"
      />
      <rect
        width="2.55429"
        height="1.8571"
        transform="matrix(-1 0 0 1 129.244 11.7632)"
        fill="#CED1DC"
      />
      <rect
        width="2.55429"
        height="1.8571"
        transform="matrix(-1 0 0 1 124.035 11.7632)"
        fill="#CED1DC"
      />
      <rect
        width="2.55429"
        height="1.8571"
        transform="matrix(-1 0 0 1 118.82 11.7632)"
        fill="#CED1DC"
      />
      <rect
        width="2.55429"
        height="1.8571"
        transform="matrix(-1 0 0 1 113.605 11.7632)"
        fill="#CED1DC"
      />
      <path
        d="M129.734 3.06703C128.812 1.64892 127.235 0.793457 125.543 0.793457H107.53V8.57403L133.316 8.57403L129.734 3.06703Z"
        fill="#CFD1DC"
      />
      <path
        d="M125.543 1.29346H108.03V8.07373H132.395L129.315 3.33936C128.485 2.0631 127.065 1.2935 125.543 1.29346Z"
        stroke="black"
        strokeOpacity="0.1"
      />
      <path
        d="M0.175781 35.3672H55.0911C56.4765 35.3672 57.7998 35.942 58.7454 36.9545L61.721 40.1408C62.6666 41.1533 63.9899 41.7281 65.3753 41.7281H126.288C127.706 41.7281 129.058 41.1255 130.006 40.0705L132.744 37.0247C133.692 35.9697 135.044 35.3672 136.463 35.3672H159.623L148.524 54.9952L155.638 65.1693H20.1518L0.175781 35.3672Z"
        fill="url(#paint0_linear_650_157243)"
      />
      <path
        d="M55.0908 35.8672C56.3377 35.8672 57.5289 36.3846 58.3799 37.2959L61.3555 40.4824C62.3955 41.596 63.8512 42.2284 65.375 42.2285H126.288C127.848 42.2284 129.335 41.5654 130.378 40.4053L133.116 37.3594C133.916 36.4691 135.036 35.936 136.225 35.873L136.463 35.8672H158.767L148.089 54.749L147.934 55.0234L148.114 55.2812L154.678 64.6689H20.4189L1.1123 35.8672H55.0908Z"
        stroke="black"
        strokeOpacity="0.1"
      />
      <path
        d="M155.801 65.1709L148.524 55.0088H13.3281L20.1875 65.1709H155.801Z"
        fill="url(#paint1_linear_650_157243)"
      />
      <g style={{ mixBlendMode: 'multiply' }}>
        <path
          d="M3.60938 40.2988H55.0897C56.4751 40.2988 57.7984 40.8736 58.7439 41.8861L61.7196 45.0724C62.6652 46.0849 63.9885 46.6597 65.3739 46.6597H126.286C127.705 46.6597 129.057 46.0572 130.005 45.0022L132.743 41.9564C133.691 40.9014 135.043 40.2988 136.461 40.2988H156.701L148.523 54.7743L155.637 64.9484H20.1503L3.60938 40.2988Z"
          fill="url(#paint2_linear_650_157243)"
        />
      </g>
      <rect
        x="138.512"
        y="46.9019"
        width="3.00562"
        height="5.15249"
        rx="1.50281"
        fill="#54575A"
      />
      <rect
        x="129.275"
        y="46.9019"
        width="3.00562"
        height="5.15249"
        rx="1.50281"
        fill="#54575A"
      />
      <rect
        x="120.045"
        y="46.9019"
        width="3.00562"
        height="5.15249"
        rx="1.50281"
        fill="#54575A"
      />
      <rect
        x="20.3203"
        y="46.9019"
        width="3.00562"
        height="5.15249"
        rx="1.50281"
        fill="#54575A"
      />
      <path
        d="M55.1661 35.3658V31.7036C55.1661 30.599 54.2707 29.7036 53.1661 29.7036H6.52734C5.42277 29.7036 4.52734 30.599 4.52734 31.7036V35.3658"
        stroke="#9A9DAC"
        strokeWidth="1.5"
      />
      <line
        x1="13.4004"
        y1="30.1216"
        x2="13.4004"
        y2="35.3653"
        stroke="#9A9DAC"
        strokeWidth="1.5"
      />
      <line
        x1="21.9941"
        y1="30.1216"
        x2="21.9941"
        y2="35.3653"
        stroke="#9A9DAC"
        strokeWidth="1.5"
      />
      <line
        x1="30.5938"
        y1="30.1216"
        x2="30.5938"
        y2="35.3653"
        stroke="#9A9DAC"
        strokeWidth="1.5"
      />
      <line
        x1="39.1895"
        y1="30.1216"
        x2="39.1895"
        y2="35.3653"
        stroke="#9A9DAC"
        strokeWidth="1.5"
      />
      <line
        x1="47.7832"
        y1="30.1216"
        x2="47.7832"
        y2="35.3653"
        stroke="#9A9DAC"
        strokeWidth="1.5"
      />
      <defs>
        <linearGradient
          id="paint0_linear_650_157243"
          x1="152.604"
          y1="50.2682"
          x2="36.6726"
          y2="50.2682"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CED0DC" />
          <stop offset="1" stopColor="#BABCC7" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_650_157243"
          x1="149.529"
          y1="60.0898"
          x2="45.9396"
          y2="60.0898"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8B8D96" />
          <stop offset="1" stopColor="#747680" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_650_157243"
          x1="3.60938"
          y1="52.6236"
          x2="156.701"
          y2="52.6236"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#272B3A" stopOpacity="0.3" />
          <stop offset="1" stopColor="#9196AB" stopOpacity="0.15" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export {
  BlueCargoArrowIcon,
  CargoIcon,
  RedCargoArrowIcon,
  TruckIcon,
  VesselIcon,
};

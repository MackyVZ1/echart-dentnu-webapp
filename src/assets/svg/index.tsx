import { colors } from "../../theme/theme";

interface Props {
  color?: keyof typeof colors;
}

// *** Header ***
export function HamburgerIcon() {
  return (
    <svg
      width="130"
      height="130"
      viewBox="0 0 130 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[30px] h-[30px] md:w-[42px] md:h-[42px]"
    >
      <path d="M0 0H129.14V129.14H0V0Z" fill="white" fillOpacity="0.01" />
      <path
        d="M21.3884 32.1497H107.482"
        stroke="white"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.3884 64.4348H107.482"
        stroke="white"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.3884 96.7197H107.482"
        stroke="white"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CloseIcon({ color }: Props) {
  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 0H26.52V26.52H0V0Z"
        fill={color ?? colors.primary}
        fillOpacity="0.01"
      />
      <path
        d="M4.41992 4.42041L22.0999 22.1004"
        stroke={color ?? colors.primary}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.41992 22.1004L22.0999 4.42041"
        stroke={color ?? colors.primary}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SearchIcon({ color }: Props) {
  return (
    <svg
      width="130"
      height="130"
      viewBox="0 0 130 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[30px] h-[30px]"
    >
      <path
        d="M0 0H129.14V129.14H0V0Z"
        fill={color || "white"}
        fillOpacity="0.01"
      />
      <path
        d="M56.4988 102.236C81.7586 102.236 102.236 81.7586 102.236 56.4988C102.236 31.239 81.7586 10.7617 56.4988 10.7617C31.239 10.7617 10.7617 31.239 10.7617 56.4988C10.7617 81.7586 31.239 102.236 56.4988 102.236Z"
        stroke={color || "#A861D4"}
        strokeWidth="10.7617"
        strokeLinejoin="round"
      />
      <path
        d="M71.7176 38.5888C67.8227 34.6939 62.4419 32.2849 56.4985 32.2849C50.5551 32.2849 45.1742 34.6939 41.2791 38.5888"
        stroke={color || "#A861D4"}
        strokeWidth="10.7617"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M89.3809 89.3809L112.21 112.21"
        stroke={color || "#A861D4"}
        strokeWidth="10.7617"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UserSearchIcon() {
  return (
    <svg
      width="130"
      height="130"
      viewBox="0 0 130 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[30px] h-[30px]"
    >
      <path d="M0 0H129.14V129.14H0V0Z" fill="white" fillOpacity="0.01" />
      <path
        d="M51.1178 53.8084C61.519 53.8084 69.9508 45.3767 69.9508 34.9755C69.9508 24.5744 61.519 16.1426 51.1178 16.1426C40.7167 16.1426 32.2849 24.5744 32.2849 34.9755C32.2849 45.3767 40.7167 53.8084 51.1178 53.8084Z"
        stroke="white"
        strokeWidth="10.7617"
        strokeLinejoin="round"
      />
      <path
        d="M72.6414 75.3318H50.5799C38.5258 75.3318 32.4987 75.3318 27.8946 77.6776C23.8447 79.7411 20.552 83.0339 18.4885 87.0838C16.1426 91.6879 16.1426 97.715 16.1426 109.769V112.998H72.6414"
        stroke="white"
        strokeWidth="10.7617"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M107.616 110.307L99.0837 101.774"
        stroke="white"
        strokeWidth="10.7617"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M102.236 94.1648C102.236 97.1366 101.031 99.827 99.0839 101.774C97.1366 103.722 94.4462 104.926 91.4743 104.926C85.5309 104.926 80.7126 100.108 80.7126 94.1648C80.7126 88.2213 85.5309 83.4031 91.4743 83.4031C97.4177 83.4031 102.236 88.2213 102.236 94.1648Z"
        stroke="white"
        strokeWidth="10.7617"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LogoutIcon() {
  return (
    <svg
      width="130"
      height="130"
      viewBox="0 0 130 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[30px] h-[30px]"
    >
      <path d="M0 0H129.14V129.14H0V0Z" fill="white" fillOpacity="0.01" />
      <path
        d="M64.5478 16.1426H16.1426V112.998H64.5701"
        stroke="white"
        strokeWidth="10.7617"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M88.7837 88.7837L112.997 64.57L88.7837 40.3562"
        stroke="white"
        strokeWidth="10.7617"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M43.0466 64.5476H112.998"
        stroke="white"
        strokeWidth="10.7617"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StaffManagementIcon() {
  return (
    <svg
      width="130"
      height="130"
      viewBox="0 0 130 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[30px] h-[30px]"
    >
      <path d="M0 0H129.14V129.14H0V0Z" fill="white" fillOpacity="0.01" />
      <path
        d="M37.666 91.4743C45.0953 91.4743 51.1181 85.4515 51.1181 78.0222C51.1181 70.5928 45.0953 64.5701 37.666 64.5701C30.2366 64.5701 24.2139 70.5928 24.2139 78.0222C24.2139 85.4515 30.2366 91.4743 37.666 91.4743Z"
        stroke="white"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M91.4743 91.4743C98.9037 91.4743 104.926 85.4515 104.926 78.0222C104.926 70.5928 98.9037 64.5701 91.4743 64.5701C84.0449 64.5701 78.0222 70.5928 78.0222 78.0222C78.0222 85.4515 84.0449 91.4743 91.4743 91.4743Z"
        stroke="white"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M64.57 37.6659C71.9994 37.6659 78.0221 31.6432 78.0221 24.2138C78.0221 16.7844 71.9994 10.7617 64.57 10.7617C57.1406 10.7617 51.1179 16.7844 51.1179 24.2138C51.1179 31.6432 57.1406 37.6659 64.57 37.6659Z"
        stroke="white"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M64.5701 118.378C64.5701 103.52 52.5245 91.4741 37.6659 91.4741C22.8071 91.4741 10.7617 103.52 10.7617 118.378"
        stroke="white"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M118.378 118.378C118.378 103.52 106.333 91.4741 91.4743 91.4741C76.6156 91.4741 64.5701 103.52 64.5701 118.378"
        stroke="white"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M91.4741 64.57C91.4741 49.7113 79.4286 37.6658 64.57 37.6658C49.7113 37.6658 37.6658 49.7113 37.6658 64.57"
        stroke="white"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AdduserIcon() {
  return (
    <svg
      width="130"
      height="130"
      viewBox="0 0 130 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[30px] h-[30px]"
    >
      <path d="M0 0H129.14V129.14H0V0Z" fill="white" fillOpacity="0.01" />
      <path
        d="M64.57 53.8084C76.457 53.8084 86.0933 44.1721 86.0933 32.2851C86.0933 20.398 76.457 10.7617 64.57 10.7617C52.683 10.7617 43.0466 20.398 43.0466 32.2851C43.0466 44.1721 52.683 53.8084 64.57 53.8084Z"
        stroke="white"
        strokeWidth="10.7617"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M112.997 118.378C112.997 91.6327 91.3156 69.9509 64.5699 69.9509C37.8241 69.9509 16.1423 91.6327 16.1423 118.378"
        stroke="white"
        strokeWidth="10.7617"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M51.1178 104.926H78.022"
        stroke="white"
        strokeWidth="10.7617"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M64.5699 91.4741V118.378"
        stroke="white"
        strokeWidth="10.7617"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ReserveChartIcon() {
  return (
    <svg
      width="130"
      height="130"
      viewBox="0 0 130 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[30px] h-[30px]"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0H129.14V129.14H0V0Z"
        fill="white"
        fillOpacity="0.01"
      />
      <path
        d="M61.8796 16.1426H88.7838V112.998H61.8796V16.1426Z"
        fill="white"
        stroke="#CDC7C7"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <path
        d="M88.7838 16.1426H115.688V112.998H88.7838V16.1426Z"
        fill="white"
        stroke="#CDC7C7"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <path
        d="M22.8686 13.4521L51.118 15.7145L41.7015 112.998L13.4521 110.735L22.8686 13.4521Z"
        fill="white"
        stroke="#CDC7C7"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <path
        d="M102.236 48.4275V40.3562"
        stroke="#A861D4"
        strokeWidth="10.7617"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M75.3317 48.4275V40.3562"
        stroke="#A861D4"
        strokeWidth="10.7617"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Modal
export function SuccessModalIcon() {
  return (
    <svg
      width="247"
      height="247"
      viewBox="0 0 247 247"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[200px] h-[191px] md:w-[247px] md:h-[247px]"
    >
      <circle cx="123.5" cy="123.5" r="123.5" fill="#30EB62" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M54.75 123.5L73.1875 105.062L110.062 141.938L183.812 68.1875L202.25 86.625L110.062 178.812L54.75 123.5Z"
        fill="white"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ErrorModalIcon() {
  return (
    <svg
      width="247"
      height="247"
      viewBox="0 0 247 247"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[200px] h-[191px] md:w-[247px] md:h-[247px]"
    >
      <circle cx="123.5" cy="123.5" r="123.5" fill="#FF4D4D" />
      <path d="M37 35H214V212H37V35Z" fill="white" fillOpacity="0.01" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M59.125 75.5627L77.5625 57.1252L125.5 105.063L173.437 57.1252L191.875 75.5627L143.937 123.5L191.875 171.438L173.437 189.875L125.5 141.938L77.5625 189.875L59.125 171.438L107.062 123.5L59.125 75.5627Z"
        fill="white"
        stroke="white"
        strokeWidth="10.233"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function VerifyModalIcon() {
  return (
    <svg
      width="247"
      height="247"
      viewBox="0 0 247 247"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="123.5" cy="123.5" r="123.5" fill="#EBC630" />
      <path
        d="M152.07 88.4328C149.338 83.3157 145.06 79.052 139.76 75.9593C134.463 72.8803 128.069 71.0001 121.129 71.0001C112.574 70.9793 105.467 73.1752 100.103 76.2162C94.717 79.2464 92.3949 82.7745 92.3949 82.7745C91.4898 83.5483 90.9793 84.674 91.0006 85.8517C91.0251 87.031 91.5763 88.1379 92.5094 88.8733L99.9634 94.7554C101.483 95.9539 103.657 95.909 105.123 94.6496C105.123 94.6496 106.039 93.019 108.909 91.404C111.794 89.7996 115.535 88.5072 121.129 88.4899C126.007 88.4794 130.261 90.2731 133.164 92.7241C134.606 93.9383 135.683 95.2981 136.343 96.542C137.009 97.7961 137.252 98.8924 137.248 99.725C137.234 102.539 136.68 104.379 135.879 105.947C135.268 107.118 134.47 108.157 133.444 109.165C131.912 110.674 129.835 112.068 127.504 113.35C125.171 114.648 122.657 115.789 120.116 117.168C117.217 118.75 114.148 121.022 111.881 124.433C110.75 126.119 109.866 128.047 109.305 130.082C108.736 132.119 108.479 134.254 108.479 136.433C108.479 138.757 108.479 140.665 108.479 140.665C108.479 142.856 110.282 144.632 112.506 144.632H122.206C124.43 144.632 126.233 142.856 126.233 140.665C126.233 140.665 126.233 138.757 126.233 136.433C126.233 135.593 126.33 135.052 126.423 134.708C126.583 134.195 126.673 134.067 126.935 133.754C127.203 133.458 127.743 133.003 128.74 132.46C130.196 131.654 132.535 130.564 135.185 129.154C139.151 127.017 143.974 124.117 148.041 119.331C150.063 116.943 151.852 114.067 153.086 110.754C154.331 107.441 155.003 103.716 155 99.725C154.996 95.6815 153.884 91.8411 152.07 88.4328Z"
        fill="white"
      />
      <path
        d="M117.36 154.07C111.312 154.07 106.409 158.902 106.409 164.859C106.409 170.814 111.312 175.645 117.36 175.645C123.404 175.645 128.305 170.814 128.305 164.859C128.305 158.902 123.404 154.07 117.36 154.07Z"
        fill="white"
      />
    </svg>
  );
}

export function DashboardIcon() {
  return (
    <svg
      width="130"
      height="129"
      viewBox="0 0 130 129"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[30px] h-[30px]"
    >
      <path
        d="M22.8685 111.306C12.0861 100.682 5.41699 86.0058 5.41699 69.795C5.41699 37.3731 32.0933 11.0901 65.0003 11.0901C97.9074 11.0901 124.584 37.3731 124.584 69.795C124.584 86.0058 117.915 100.682 107.132 111.306"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38.1885 96.2108C31.327 89.4504 27.083 80.111 27.083 69.7949C27.083 49.1628 44.0588 32.4373 64.9997 32.4373"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M65 69.795V48.4478"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RoomIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800px"
      height="800px"
      viewBox="0 0 512 512"
      className="w-[30px] h-[30px]"
    >
      <path
        fill="var(--ci-primary-color, #FFFFFF)"
        d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"
        className="ci-primary"
      />
      <rect
        width="32"
        height="64"
        x="256"
        y="232"
        fill="var(--ci-primary-color, #FFFFFF)"
        className="ci-primary"
      />
    </svg>
  );
}

export function DeleteIcon() {
  return (
    <svg
      width="130"
      height="130"
      viewBox="0 0 130 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[30px] h-[30px]"
    >
      <path
        d="M24.375 27.0833V119.167H105.625V27.0833H24.375Z"
        stroke="white"
        strokeWidth="8"
        strokeLinejoin="round"
      />
      <path
        d="M54.166 54.1665V89.3748"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M75.833 54.1665V89.3748"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.833 27.0833H119.166"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M43.333 27.0833L52.2407 10.8333H77.9377L86.6663 27.0833H43.333Z"
        stroke="white"
        strokeWidth="10"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AddIcon() {
  return (
    <svg
      width="130"
      height="130"
      viewBox="0 0 130 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[30px] h-[30px]"
    >
      <path
        d="M64.9997 119.167C94.9151 119.167 119.166 94.9154 119.166 64.9999C119.166 35.0845 94.9151 10.8333 64.9997 10.8333C35.0842 10.8333 10.833 35.0845 10.833 64.9999C10.833 94.9154 35.0842 119.167 64.9997 119.167Z"
        stroke="white"
        strokeWidth="10"
        strokeLinejoin="round"
      />
      <path
        d="M65 43.3333V86.6666"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M43.333 65H86.6663"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EditIcon() {
  return (
    <svg
      width="130"
      height="130"
      viewBox="0 0 130 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[30px] h-[30px]"
    >
      <path
        d="M18.9585 113.75H116.458"
        stroke="white"
        strokeWidth="6.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.792 72.3664V92.0833H49.6094L105.625 36.0428L85.8412 16.25L29.792 72.3664Z"
        stroke="white"
        strokeWidth="6.33333"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SaveIcon() {
  return (
    <svg
      width="147"
      height="147"
      viewBox="0 0 147 147"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[30px] h-[30px]"
    >
      <path
        d="M104.125 128.625V79.625H42.875V128.625M42.875 18.375V49H91.875M116.375 128.625H30.625C27.3761 128.625 24.2603 127.334 21.9629 125.037C19.6656 122.74 18.375 119.624 18.375 116.375V30.625C18.375 27.3761 19.6656 24.2603 21.9629 21.9629C24.2603 19.6656 27.3761 18.375 30.625 18.375H98L128.625 49V116.375C128.625 119.624 127.334 122.74 125.037 125.037C122.74 127.334 119.624 128.625 116.375 128.625Z"
        stroke="#F3F3F3"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RightArrow() {
  return (
    <svg
      width="172"
      height="116"
      viewBox="0 0 172 116"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[30px] h-[30px]"
    >
      <path
        d="M150.5 58H21.5"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M107.5 29L150.5 58L107.5 87"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LeftArrow() {
  return (
    <svg
      width="172"
      height="116"
      viewBox="0 0 172 116"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[30px] h-[30px]"
    >
      <path
        d="M21.5001 58L150.5 58"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M64.5 87L21.5 58L64.5 29"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InfoIcon() {
  return (
    <svg
      width="144"
      height="145"
      viewBox="0 0 144 145"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[30px] h-[30px]"
    >
      <path
        d="M43.0144 19.6986V3L40.4855 5.52884L5.52857 40.488L3 43.0146H19.7032C32.5556 43.0146 43.0144 32.5556 43.0144 19.6986Z"
        fill="white"
        stroke="#FDFCFC"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M138.363 119.959C138.363 119.959 127.767 110.692 125.232 108.163C121.512 104.46 120.027 102.676 121.338 99.6686C127.081 87.9552 125.095 73.4149 115.353 63.6747C103.104 51.4235 83.2379 51.4235 70.9887 63.6747C58.7394 75.9283 58.7394 95.7874 70.9887 108.039C80.7265 117.776 95.2754 119.763 106.98 114.021C109.99 112.71 111.776 114.196 115.477 117.918C118.007 120.451 127.273 131.047 127.273 131.047C132.077 135.851 135.774 132.898 137.997 130.679C140.212 128.46 143.168 124.763 138.363 119.959ZM106.015 98.6992C98.9216 105.789 87.4215 105.789 80.3258 98.6992C73.2363 91.6076 73.2363 80.1035 80.3258 73.0161C87.4215 65.9245 98.9216 65.9245 106.015 73.0161C113.105 80.1035 113.105 91.6076 106.015 98.6992Z"
        fill="white"
        stroke="#FDFCFC"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M108.18 123.243C103.428 125.145 98.2922 126.14 93.1585 126.14C82.3992 126.14 72.2866 121.952 64.6811 114.346C48.9754 98.6383 48.9754 73.0773 64.6789 57.3674C72.2888 49.7575 82.4079 45.5647 93.1693 45.5647C101.483 45.5647 109.398 48.0911 116.084 52.7367V26.3155C116.084 13.459 105.623 3 92.7709 3H51.9353V19.6986C51.9353 37.4735 37.4757 51.9356 19.7032 51.9356H3V118.667C3 131.524 13.459 141.983 26.3177 141.983H92.7709C101.886 141.983 109.777 136.71 113.608 129.065C111.65 126.878 109.934 124.995 109.165 124.224C108.958 124.014 108.583 123.638 108.18 123.243Z"
        fill="white"
        stroke="#FDFCFC"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ReferIcon() {
  return (
    <svg
      width="164"
      height="129"
      viewBox="0 0 164 129"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[30px] h-[30px]"
    >
      <path d="M0 0H128.185V128.185H0V0Z" fill="white" fillOpacity="0.01" />
      <path
        d="M64.093 53.4104C74.4172 53.4104 82.7866 45.041 82.7866 34.7168C82.7866 24.3926 74.4172 16.0232 64.093 16.0232C53.7688 16.0232 45.3994 24.3926 45.3994 34.7168C45.3994 45.041 53.7688 53.4104 64.093 53.4104Z"
        fill="white"
        stroke="white"
        strokeWidth="10.7617"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.0234 108.957V112.162H112.162V108.957C112.162 96.992 112.162 91.0095 109.833 86.4395C107.785 82.4196 104.517 79.1511 100.497 77.1028C95.9268 74.7744 89.9443 74.7744 77.9793 74.7744H50.206C38.241 74.7744 32.2586 74.7744 27.6885 77.1028C23.6685 79.1511 20.4002 82.4196 18.352 86.4395C16.0234 91.0095 16.0234 96.992 16.0234 108.957Z"
        fill="white"
        stroke="white"
        strokeWidth="10.7617"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M155.125 58H101.875"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M137.375 44L155.125 58L137.375 72"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

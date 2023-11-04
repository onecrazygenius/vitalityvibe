import {
  Award,
  CalendarIcon,
  Cookie,
  User,
  Users,
  Moon,
  X,
  type Icon as LucideIcon,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  close: X,
  calendar: CalendarIcon,
  circles: Users,
  cookie: Cookie,
  goals: Award,
  user: User,
  sleep: Moon,
  github: (props: IconProps) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      ></path>
    </svg>
  ),
  logo: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="44px"
      height="44px"
      viewBox="0 0 1024 1024"
      style={{
        shapeRendering: 'geometricPrecision',
        textRendering: 'geometricPrecision',
        fillRule: 'evenodd',
        clipRule: 'evenodd',
      }}
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g><path style={{opacity:1}} fill="#02444e" d="M 256.5,291.5 C 276.663,306.044 295.496,322.378 313,340.5C 319.113,347.725 323.946,355.725 327.5,364.5C 323.194,364.899 319.36,366.566 316,369.5C 314.255,375.441 314.255,381.441 316,387.5C 325.256,405.679 334.256,424.013 343,442.5C 346.814,448.929 350.814,455.263 355,461.5C 355.494,459.866 355.66,458.199 355.5,456.5C 357.035,462.151 358.368,467.985 359.5,474C 359.472,475.07 359.139,475.903 358.5,476.5C 320.347,441.84 286.181,403.507 256,361.5C 231.542,325.425 212.042,286.925 197.5,246C 197.833,245.5 198.167,245 198.5,244.5C 212.609,256.567 226.609,268.734 240.5,281C 245.691,284.759 251.024,288.259 256.5,291.5 Z"/></g>
      <g><path style={{opacity:1}} fill="#01434d" d="M 806.5,290.5 C 786.601,306.889 767.101,323.889 748,341.5C 743.391,349.107 738.391,356.441 733,363.5C 732.517,364.448 732.351,365.448 732.5,366.5C 726.506,375.029 722.006,384.362 719,394.5C 714,416.167 709,437.833 704,459.5C 703.19,463.358 703.357,467.024 704.5,470.5C 703.434,472.701 702.767,475.035 702.5,477.5C 687.323,537.515 667.823,596.182 644,653.5C 635.258,670.274 625.592,686.607 615,702.5C 604.013,716.16 590.68,726.826 575,734.5C 573.395,733.899 572.062,732.899 571,731.5C 567.667,726.833 564.333,722.167 561,717.5C 554.731,706.628 548.731,695.628 543,684.5C 538.333,673.167 533.667,661.833 529,650.5C 525.918,639.587 522.252,628.92 518,618.5C 514.882,605.417 511.882,592.417 509,579.5C 524.721,596.554 541.054,612.887 558,628.5C 572.993,577.174 587.327,525.84 601,474.5C 609.006,447.163 617.339,419.83 626,392.5C 631.678,379.454 637.344,366.454 643,353.5C 658.735,328.78 680.902,312.946 709.5,306C 736.813,299.793 764.48,295.793 792.5,294C 797.359,293.243 802.026,292.077 806.5,290.5 Z"/></g>
      <g><path style={{opacity:1}} fill="#02a376" d="M 702.5,477.5 C 702.767,475.035 703.434,472.701 704.5,470.5C 717.13,444.472 729.297,418.139 741,391.5C 743.087,383.177 743.42,374.844 742,366.5C 738.839,363.914 735.672,363.914 732.5,366.5C 732.351,365.448 732.517,364.448 733,363.5C 738.391,356.441 743.391,349.107 748,341.5C 767.101,323.889 786.601,306.889 806.5,290.5C 825.762,277.346 843.762,262.512 860.5,246C 861.877,244.759 863.21,244.592 864.5,245.5C 846.741,290.351 824.241,332.684 797,372.5C 768.795,410.535 737.295,445.535 702.5,477.5 Z"/></g>
      <g><path style={{opacity:1}} fill="#021a0f" d="M 327.5,364.5 C 331.784,373.95 335.617,383.617 339,393.5C 344.14,414.724 349.64,435.724 355.5,456.5C 355.66,458.199 355.494,459.866 355,461.5C 350.814,455.263 346.814,448.929 343,442.5C 334.256,424.013 325.256,405.679 316,387.5C 314.255,381.441 314.255,375.441 316,369.5C 319.36,366.566 323.194,364.899 327.5,364.5 Z"/></g>
      <g><path style={{opacity:1}} fill="#021a11" d="M 704.5,470.5 C 703.357,467.024 703.19,463.358 704,459.5C 709,437.833 714,416.167 719,394.5C 722.006,384.362 726.506,375.029 732.5,366.5C 735.672,363.914 738.839,363.914 742,366.5C 743.42,374.844 743.087,383.177 741,391.5C 729.297,418.139 717.13,444.472 704.5,470.5 Z"/></g>
      <g><path style={{opacity:1}} fill="#05f99b" d="M 256.5,291.5 C 281.708,295.768 307.042,299.268 332.5,302C 355.965,306.59 377.632,315.257 397.5,328C 411.316,340.773 421.816,355.939 429,373.5C 441.368,406.947 452.368,440.947 462,475.5C 476.241,531.892 491.908,587.892 509,643.5C 519.36,671.921 532.027,699.254 547,725.5C 551.348,732.193 556.182,738.526 561.5,744.5C 528.566,753.18 498.566,747.347 471.5,727C 451.503,710.516 435.67,690.682 424,667.5C 414.897,649.813 406.897,631.813 400,613.5C 384.555,568.464 370.722,522.797 358.5,476.5C 359.139,475.903 359.472,475.07 359.5,474C 358.368,467.985 357.035,462.151 355.5,456.5C 349.64,435.724 344.14,414.724 339,393.5C 335.617,383.617 331.784,373.95 327.5,364.5C 323.946,355.725 319.113,347.725 313,340.5C 295.496,322.378 276.663,306.044 256.5,291.5 Z"/></g>
    </svg>
  ),
  stripe:(props: IconProps) => (
    <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
      <path 
        d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"
        fill="currentColor"
      />
    </svg>
  ),
  spinner: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
};
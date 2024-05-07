import React from "react";
import { userRole } from "config/const";

const Loader = ({ role_id }) => {
  const isTeacherPath = role_id !== userRole.STUDENT.role_id;
  return (
    <>
      {isTeacherPath ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          style={{ margin: "auto", display: "block" }}
          width="191px"
          height="191px"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <defs>
            <clipPath id="ldio-h7719c84zss-cp" clipPathUnits="userSpaceOnUse">
              <rect x={0} y={53} width={100} height={47} />
            </clipPath>
            <pattern id="ldio-h7719c84zss-pattern" patternUnits="userSpaceOnUse" x={0} y={0} width={100} height={100}>
              <rect x={0} y={0} width={100} height={100} fill="#e0f7ed" />
              <circle cx={72} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 109;0 -9"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.3684210526315788s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={49} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 135;0 -35"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.7368421052631579s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={76} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 140;0 -40"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.07017543859649122s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={30} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 105;0 -5"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.1052631578947367s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={80} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 124;0 -24"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.3508771929824561s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={7} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 114;0 -14"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.38596491228070173s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={25} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 106;0 -6"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.719298245614035s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={92} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 126;0 -26"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.6666666666666665s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={53} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 123;0 -23"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.9649122807017543s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={21} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 106;0 -6"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.526315789473684s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={86} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 139;0 -39"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.08771929824561403s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={82} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 147;0 -47"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.2807017543859649s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={49} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 136;0 -36"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.3157894736842105s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={47} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 126;0 -26"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.157894736842105s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={91} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 111;0 -11"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.5964912280701754s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={36} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 138;0 -38"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.3859649122807016s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={90} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 142;0 -42"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.03508771929824561s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={94} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 102;0 -2"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.807017543859649s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={82} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 133;0 -33"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.38596491228070173s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={30} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 106;0 -6"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.07017543859649122s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={13} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 103;0 -3"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.3684210526315789s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={38} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 126;0 -26"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.8596491228070174s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={49} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 134;0 -34"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.3333333333333333s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={18} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 119;0 -19"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.175438596491228s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={20} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 113;0 -13"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.3684210526315789s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={96} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 119;0 -19"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.2105263157894735s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={33} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 131;0 -31"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.1929824561403508s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={57} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 107;0 -7"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.0526315789473684s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={21} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 111;0 -11"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.9122807017543858s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={14} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 138;0 -38"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.9122807017543858s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={22} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 138;0 -38"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.3333333333333333s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={40} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 151;0 -51"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.7192982456140349s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={27} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 117;0 -17"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.4210526315789471s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={17} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 118;0 -18"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.7368421052631579s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={76} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 113;0 -13"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.719298245614035s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={30} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 127;0 -27"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.6842105263157894s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={7} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 134;0 -34"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.3684210526315788s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={7} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 111;0 -11"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.7368421052631577s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={6} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 106;0 -6"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.15789473684210525s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={50} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 119;0 -19"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.017543859649122806s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={61} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 151;0 -51"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.350877192982456s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={0} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 149;0 -49"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.2280701754385963s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={63} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 141;0 -41"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.07017543859649122s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={99} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 109;0 -9"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.03508771929824561s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={88} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 111;0 -11"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.07017543859649122s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={86} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 148;0 -48"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.017543859649122806s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={71} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 114;0 -14"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.3684210526315789s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={48} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 125;0 -25"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.4385964912280701s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={76} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 149;0 -49"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.3333333333333333s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={46} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 104;0 -4"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.1403508771929822s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={61} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 106;0 -6"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.08771929824561403s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={92} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 112;0 -12"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={19} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 124;0 -24"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.07017543859649122s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={65} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 152;0 -52"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.10526315789473682s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={8} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 146;0 -46"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.631578947368421s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={63} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 105;0 -5"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.3333333333333333s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={9} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 120;0 -20"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.1228070175438596s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={36} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 114;0 -14"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.0350877192982455s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={2} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 110;0 -10"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.0350877192982455s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={55} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 150;0 -50"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.526315789473684s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={53} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 109;0 -9"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.1403508771929822s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={24} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 138;0 -38"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.08771929824561403s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={58} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 121;0 -21"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.9122807017543858s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={73} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 131;0 -31"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.1929824561403508s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={24} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 125;0 -25"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.3684210526315788s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={84} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 151;0 -51"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.350877192982456s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={37} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 119;0 -19"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.5263157894736842s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={67} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 134;0 -34"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.1052631578947367s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={58} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 108;0 -8"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.2280701754385963s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={28} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 110;0 -10"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.5789473684210525s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={5} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 129;0 -29"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.5614035087719296s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={7} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 147;0 -47"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.8421052631578946s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={14} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 116;0 -16"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.807017543859649s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={40} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 140;0 -40"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.263157894736842s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={44} cy={0} r={2} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 135;0 -35"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.982456140350877s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={80} cy={0} r={3} fill="#2dcc89">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 135;0 -35"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.526315789473684s"
                  repeatCount="indefinite"
                />
              </circle>
            </pattern>
          </defs>
          <path
            fill="url(#ldio-h7719c84zss-pattern)"
            clipPath="url(#ldio-h7719c84zss-cp)"
            d="M59,37.3V18.9c3-0.8,5.1-3.6,5.1-6.8C64.1,8.2,61,5,57.1,5H42.9c-3.9,0-7.1,3.2-7.1,7.1c0,3.2,2.2,6,5.1,6.8v18.4c-11.9,3.8-20.6,15-20.6,28.2C20.4,81.8,33.7,95,50,95s29.6-13.2,29.6-29.6C79.6,52.2,70.9,41.1,59,37.3z"
          />
          <path
            fill="none"
            stroke="#0fa265"
            strokeWidth={5}
            d="M59,37.3V18.9c3-0.8,5.1-3.6,5.1-6.8C64.1,8.2,61,5,57.1,5H42.9c-3.9,0-7.1,3.2-7.1,7.1c0,3.2,2.2,6,5.1,6.8v18.4c-11.9,3.8-20.6,15-20.6,28.2C20.4,81.8,33.7,95,50,95s29.6-13.2,29.6-29.6C79.6,52.2,70.9,41.1,59,37.3z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          style={{ margin: "auto", display: "block" }}
          width="191px"
          height="191px"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <defs>
            <clipPath id="ldio-h7719c84zss-cp" clipPathUnits="userSpaceOnUse">
              <rect x={0} y={53} width={100} height={47} />
            </clipPath>
            <pattern id="ldio-h7719c84zss-pattern" patternUnits="userSpaceOnUse" x={0} y={0} width={100} height={100}>
              <rect x={0} y={0} width={100} height={100} fill="#c7f4ff" />
              <circle cx={72} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 109;0 -9"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.3684210526315788s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={49} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 135;0 -35"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.7368421052631579s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={76} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 140;0 -40"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.07017543859649122s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={30} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 105;0 -5"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.1052631578947367s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={80} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 124;0 -24"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.3508771929824561s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={7} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 114;0 -14"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.38596491228070173s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={25} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 106;0 -6"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.719298245614035s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={92} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 126;0 -26"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.6666666666666665s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={53} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 123;0 -23"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.9649122807017543s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={21} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 106;0 -6"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.526315789473684s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={86} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 139;0 -39"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.08771929824561403s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={82} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 147;0 -47"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.2807017543859649s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={49} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 136;0 -36"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.3157894736842105s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={47} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 126;0 -26"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.157894736842105s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={91} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 111;0 -11"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.5964912280701754s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={36} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 138;0 -38"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.3859649122807016s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={90} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 142;0 -42"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.03508771929824561s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={94} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 102;0 -2"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.807017543859649s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={82} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 133;0 -33"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.38596491228070173s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={30} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 106;0 -6"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.07017543859649122s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={13} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 103;0 -3"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.3684210526315789s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={38} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 126;0 -26"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.8596491228070174s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={49} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 134;0 -34"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.3333333333333333s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={18} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 119;0 -19"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.175438596491228s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={20} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 113;0 -13"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.3684210526315789s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={96} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 119;0 -19"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.2105263157894735s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={33} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 131;0 -31"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.1929824561403508s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={57} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 107;0 -7"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.0526315789473684s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={21} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 111;0 -11"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.9122807017543858s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={14} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 138;0 -38"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.9122807017543858s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={22} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 138;0 -38"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.3333333333333333s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={40} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 151;0 -51"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.7192982456140349s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={27} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 117;0 -17"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.4210526315789471s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={17} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 118;0 -18"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.7368421052631579s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={76} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 113;0 -13"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.719298245614035s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={30} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 127;0 -27"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.6842105263157894s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={7} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 134;0 -34"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.3684210526315788s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={7} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 111;0 -11"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.7368421052631577s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={6} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 106;0 -6"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.15789473684210525s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={50} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 119;0 -19"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.017543859649122806s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={61} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 151;0 -51"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.350877192982456s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={0} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 149;0 -49"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.2280701754385963s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={63} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 141;0 -41"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.07017543859649122s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={99} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 109;0 -9"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.03508771929824561s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={88} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 111;0 -11"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.07017543859649122s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={86} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 148;0 -48"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.017543859649122806s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={71} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 114;0 -14"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.3684210526315789s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={48} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 125;0 -25"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.4385964912280701s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={76} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 149;0 -49"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.3333333333333333s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={46} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 104;0 -4"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.1403508771929822s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={61} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 106;0 -6"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.08771929824561403s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={92} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 112;0 -12"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={19} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 124;0 -24"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.07017543859649122s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={65} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 152;0 -52"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.10526315789473682s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={8} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 146;0 -46"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.631578947368421s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={63} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 105;0 -5"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.3333333333333333s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={9} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 120;0 -20"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.1228070175438596s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={36} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 114;0 -14"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.0350877192982455s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={2} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 110;0 -10"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.0350877192982455s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={55} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 150;0 -50"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.526315789473684s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={53} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 109;0 -9"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.1403508771929822s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={24} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 138;0 -38"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.08771929824561403s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={58} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 121;0 -21"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.9122807017543858s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={73} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 131;0 -31"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.1929824561403508s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={24} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 125;0 -25"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.3684210526315788s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={84} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 151;0 -51"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.350877192982456s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={37} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 119;0 -19"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.5263157894736842s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={67} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 134;0 -34"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.1052631578947367s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={58} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 108;0 -8"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.2280701754385963s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={28} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 110;0 -10"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.5789473684210525s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={5} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 129;0 -29"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.5614035087719296s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={7} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 147;0 -47"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.8421052631578946s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={14} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 116;0 -16"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.807017543859649s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={40} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 140;0 -40"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.263157894736842s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={44} cy={0} r={2} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 135;0 -35"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-0.982456140350877s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={80} cy={0} r={3} fill="#2b95f9">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 135;0 -35"
                  keyTimes="0;1"
                  dur="1.7543859649122806s"
                  begin="-1.526315789473684s"
                  repeatCount="indefinite"
                />
              </circle>
            </pattern>
          </defs>
          <path
            fill="url(#ldio-h7719c84zss-pattern)"
            clipPath="url(#ldio-h7719c84zss-cp)"
            d="M59,37.3V18.9c3-0.8,5.1-3.6,5.1-6.8C64.1,8.2,61,5,57.1,5H42.9c-3.9,0-7.1,3.2-7.1,7.1c0,3.2,2.2,6,5.1,6.8v18.4c-11.9,3.8-20.6,15-20.6,28.2C20.4,81.8,33.7,95,50,95s29.6-13.2,29.6-29.6C79.6,52.2,70.9,41.1,59,37.3z"
          />
          <path
            fill="none"
            stroke="#33649e"
            strokeWidth={5}
            d="M59,37.3V18.9c3-0.8,5.1-3.6,5.1-6.8C64.1,8.2,61,5,57.1,5H42.9c-3.9,0-7.1,3.2-7.1,7.1c0,3.2,2.2,6,5.1,6.8v18.4c-11.9,3.8-20.6,15-20.6,28.2C20.4,81.8,33.7,95,50,95s29.6-13.2,29.6-29.6C79.6,52.2,70.9,41.1,59,37.3z"
          />
        </svg>
      )}
    </>
  );
};

export default Loader;

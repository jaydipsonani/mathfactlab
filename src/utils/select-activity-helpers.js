import addition from "../assets/images/students/addition.svg";
import subtraction from "../assets/images/students/subtraction.svg";
import multiplication from "../assets/images/students/multiplication.svg";
import division from "../assets/images/students/division.svg";
export const mathOperationImage = mathOperation => {
  let imageSrc = null;
  switch (+mathOperation) {
    case 1:
      return (imageSrc = addition);
    case 2:
      return (imageSrc = subtraction);
    case 3:
      return (imageSrc = multiplication);
    case 4:
      return (imageSrc = division);

    default:
  }
  return imageSrc;
};

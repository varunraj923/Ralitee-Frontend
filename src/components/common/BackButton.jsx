import { IoIosArrowRoundBack } from "react-icons/io";

const BackButton = ({
  className = "",
  textSize = "text-lg",   
  iconSize = "text-2xl"     
}) => {

  const handleBackButton = () => {
    window.history.back();
  };

  return (
    <div className={`w-24 flex justify-center mb-3 ${className}`}>
      <button
        className="cursor-pointer p-1 rounded text-slate-700 hover:text-black transition"
        onClick={handleBackButton}
      >
        <span className={`flex items-center gap-1 ${textSize}`}>
          <IoIosArrowRoundBack className={iconSize} />
          Back
        </span>
      </button>
    </div>
  );
};

export default BackButton;
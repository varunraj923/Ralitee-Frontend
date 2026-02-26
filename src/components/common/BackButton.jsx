
import { IoIosArrowRoundBack } from "react-icons/io";
const BackButton = () => {

    const handleBackButton =()=>{
window.history.back()
    }
  return (
    <div className="w-24 flex justify-center mb-4">
      <button
        className=" cursor-pointer p-3 rounded text-slate-700 hover:text-black transition"
        onClick={handleBackButton}
      >
        <span className="flex text-xl flex-row items-center"> <IoIosArrowRoundBack className="text-2xl"/>Back</span> 
      </button>
    </div>
  );
};

export default BackButton;

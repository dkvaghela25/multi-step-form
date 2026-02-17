import { useFormContext } from "react-hook-form";

const Review = () => {
  
    const context = useFormContext();
    console.log(context);
  
  return (
    <>
       Review
    </>
  );
};

export default Review;
import { useFormContext } from "react-hook-form";

const Skills = () => {
  
    const context = useFormContext();
    console.log(context);
  
  return (
    <>
       Skills
    </>
  );
};

export default Skills;
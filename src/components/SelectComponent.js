import classnames from "classnames";
import { useRef, useEffect, useState } from "react";

export default function SelectComponent(props) {
  const [selected, setSelected] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const optionRef = useRef(null);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const handleSelectOption = (option) => setSelected(option.target.innerHTML);

  useEffect(() => {
    function listener(event){
      console.log("clicked", optionRef)
      console.log("target", event.target)
      if(optionRef.current && !optionRef.current.contains(event.target)){
        setIsDrawerOpen(false);
      }
    }
    document.querySelector('html').addEventListener("click", listener, true);

    return function () { 
      console.log("Removing listener")
      document.querySelector('html').removeEventListener("click", listener);
    }
  },[]);
  
  if(!props.options){
    return;
  }

  const options = props.options.map((option, index) =>
    <div key={index} onClick={handleSelectOption}>{option}</div>
  )

  const classNames = classnames(props.className,
    "flex flex-col relative");
  const chosenClassNames = classnames("border-solid border-2 border-slate-500 rounded",
    "drop-shadow-md",
    "flex flex-row");
  const optionsClassNames = classnames("border-solid border-2 border-slate-500 rounded",
    "drop-shadow-md",
    "absolute",
    "max-h-20",
    "top-8",
    "w-full",
    "overflow-y-scroll");

  return <div className={classNames} ref={optionRef}>
      <div className={chosenClassNames}>
        <span className="flex-auto">{ selected === null ? "--Select option--" : selected }</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
          strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 flex-none" onClick={toggleDrawer}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
      {isDrawerOpen && (<div className={optionsClassNames}>
        {options}
      </div>)}
    </div>
}
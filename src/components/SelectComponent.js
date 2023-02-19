import classnames from "classnames";
import { useRef, useEffect, useState } from "react";
import {GoChevronDown} from 'react-icons/go';
import Panel from './Panel';

export default function SelectComponent(props) {
  const [selected, setSelected] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const optionRef = useRef(null);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const handleSelectOption = (option) => {
    setSelected(option.target.innerHTML);
    setIsDrawerOpen(false)
  }

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
    "relative");
  const optionsClassNames = classnames(
    "absolute",
    "max-h-20",
    "top-full",
    "w-full",
    "overflow-y-scroll");

  return <div className={classNames} ref={optionRef}>
      <Panel className="flex justify-between items-center cursor-pointer">
        { selected === null ? "--Select option--" : selected }
        <GoChevronDown onClick={toggleDrawer} className="text-lg"></GoChevronDown>
      </Panel>
      {isDrawerOpen && (<Panel className={optionsClassNames}>
        {options}
      </Panel>)}
    </div>
}
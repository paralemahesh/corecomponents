import SelectComponent from "../components/SelectComponent";

export default function SelectPage() {
  const options = ["cat", "dog", "parrot","rat"];
  return <SelectComponent className="w-80" options={options}></SelectComponent>
}
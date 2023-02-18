import SelectPage from "./SelectPage"
import SidePlanePage from "./SidePlanePage"

export default function Homepage() {
  return <div className="container mx-auto grid grid-cols-6 gap-4 mt-4 ">
    <SidePlanePage></SidePlanePage>
    <div className="col-span-5">
      <SelectPage></SelectPage>
    </div>
  </div>
}
import classNames from "classnames"

export default function Panel({className, children, ...others}) {
  const classnames = classNames("border-solid border-2 border-slate-500 rounded", className);

  return <div className={classnames} {...others} >
    {children}
  </div>
}
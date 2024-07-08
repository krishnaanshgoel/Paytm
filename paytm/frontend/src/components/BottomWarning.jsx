import {Link } from "react-router-dom"
export function BottomWarning({label,buttontext,to}){
   return(
    <div className="py-2 flex justify-center text-sm">
       <div>
        {label}
       </div>
       <Link className="pointer underline pl-1 cursor-pointer" to={to}>
        {buttontext}
       </Link>
    </div>
   )
}
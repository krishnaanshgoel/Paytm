import {Appbar} from "../components/Appbar"
import {Balance} from "../components/Balance"
import {Users} from "../components/Users"
import { useEffect , useState} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
export  function Dashboard(){
    const navigate=useNavigate();
    const [val,setVal]=useState("");
    useEffect(()=>{
        const token=localStorage.getItem("token")
        if(!localStorage.getItem("token")){
            navigate("/signin")
            alert("you are not signed in")
        }
        else{
            const fetchbalance=async()=>{
            try{
                const response=await axios.get("http://localhost:3000/api/v1/account/balance",{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                setVal(Math.floor(response.data.balance))
            }catch(err){
                console.error("error fetching balance",err)
            }
            }
            fetchbalance();
        }
    },[localStorage.getItem("token")])

    return <div>
        <Appbar />

        <div className="m-8">
        <Balance value={val}/>
        <Users />
        </div>
        

   
    </div>
}
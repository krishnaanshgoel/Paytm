import {Heading} from "../components/Heading"
import {Button} from "../components/Button"
import {SubHeading} from "../components/SubHeading"
import {Inputbox} from "../components/Inputbox"
import {BottomWarning} from "../components/BottomWarning"
import { useState, useEffect } from "react"
import { useNavigate , } from "react-router-dom"
import axios from "axios"


 export function Signin(){
  const [username,setUser]=useState("")
  const [password,setPassword]=useState("")
  const navigate=useNavigate()
  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/dashboard");
      alert("you are already signed in")
    }
  },[])
    return <div className="bg-slate-800 h-screen flex justify-center">
        <div className=" flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Sign In"} />
            <SubHeading label={"Enter your credentials to access your account"} />
            <Inputbox onChange={e=>{
              setUser(e.target.value)
            }}label={"Email"} placeholder={"Email"} />
            <Inputbox onChange={e=>{
              setPassword(e.target.value)
            }}label={"Password"} placeholder={"Password"} />
            <div className="pt-4">
            <Button onClick={async ()=>{
              const response=await axios.post("http://localhost:3000/api/v1/user/signin",{
                username,
                password
              })
              const token=response.data.token
                localStorage.setItem("token",token)
                 navigate("/dashboard");

            }} label={"Sign In"} />
            </div>
            <BottomWarning label={"Don't have an account?"} buttontext={"Sign Up"} to={"/signup"} />
          </div>
        </div>
    </div>
 }
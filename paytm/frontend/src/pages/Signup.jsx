import {Heading} from "../components/Heading"
import {Button} from "../components/Button"
import {SubHeading} from "../components/SubHeading"
import {Inputbox} from "../components/Inputbox"
import {BottomWarning} from "../components/BottomWarning"
import { useState,useEffect } from "react"
import axios from "axios"
import { useNavigate,  } from "react-router-dom"


export const Signup=()=>{
    const [firstname,setFirstname]=useState("")
    const [lastname,setLastname]=useState("")
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate()
    useEffect(()=>{
        if(localStorage.getItem("token")){
          navigate("/dashboard")
          alert("you are already signed in")
        }
      },[localStorage.getItem("token")])
    return <div className="bg-slate-800 h-screen flex justify-center">
        <div className=" flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Sign up"} />
            <SubHeading label={"Enter your information to create an account"} />
            <Inputbox onChange={(e)=>{
                setFirstname(e.target.value)
            }} label={"First Name"} placeholder={"Name"} />
            <Inputbox  onChange={(e)=>{
                setLastname(e.target.value)
            }} label={"Last Name"} placeholder={"SurName"} />
            <Inputbox  onChange={(e)=>{
                setUsername(e.target.value)
            }}label={"Email"} placeholder={"Email"} />
             <Inputbox  onChange={(e)=>{
                setPassword(e.target.value)
            }}label={"Password"} placeholder={"Password"} />
             <div className="pt-4">
                <Button onClick={async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                username,
                firstname,
                lastname,
                password
            });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            console.error("Signup failed", error);
            // Handle error (e.g., display error message)
        }
    } }label={"Sign Up"}></Button>
             </div>
             <BottomWarning label={"Already have an account?"} buttontext={"Sign In"} to={"/signin"}></BottomWarning>            
            </div>
        </div>
    </div>
}
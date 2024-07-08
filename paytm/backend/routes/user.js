const express=require("express");
const router=express.Router();
const zod=require("zod");
const {User,Account}=require("../db");
const {JWT_SECRET}=require("../config");
const jwt=require("jsonwebtoken");
const authMiddleware = require("../middleware");

const signupbody=zod.object({
    username:zod.string().email(),
    firstname:zod.string(),
    lastname:zod.string(),
    password:zod.string()
})

router.post("/signup", async (req,res)=>{
    const {success}=signupbody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const existinguser=await User.findOne({
        username:req.body.username,
        password:req.body.password,
    })
    if(existinguser){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const user=await User.create({
        username:req.body.username,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        password:req.body.password
    })
    const userId=user._id;

    await Account.create({
        userId,
        balance:1+Math.random()*10000
    })
    const token=jwt.sign({
        userId
    },JWT_SECRET);

    res.json({
        message:"user created successfully",
        token:token
    })

})

const signinbody=zod.object({
    username:zod.string().email(),
    password:zod.string()
})

router.post("/signin",async (req,res)=>{
    const {success}=signinbody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Error while logging in"
        })
    }
    const user=await User.findOne({
        username:req.body.username,
        password:req.body.password
    })
    if(user){
        const token=jwt.sign({
            userId:user._id
        },JWT_SECRET)

        return res.status(200).json({
            token:token
        })
    }
    res.status(411).json({
        message: "Error while logging in"
    })

})

const updatebody=zod.object({
    password:zod.string().optional(),
    firstname:zod.string().optional(),
    lastname:zod.string().optional()
})

router.put("/",authMiddleware, async (req,res)=>{
    const {success}=updatebody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
    await User.updateOne({_id:req.userId},req.body);
    res.status(200).json({
        message: "Updated successfully"
    })
})

router.get("/bulk",async (req,res)=>{
    const filter=req.query.filter || "";
  
    const users= await User.find({
        $or:[{
            firstname:{
                "$regex":filter
            }
        },{
            lastname:{
                "$regex":filter
            }
        }]
    })

    return res.json({
        user:users.map(user=>({
            username:user.username,
            firstname:user.firstname,
            lastname:user.lastname,
            _id:user._id
        }))
    })
})

module.exports=router;
const userModel=require("../models/user").model
const metaModel=require("../models/meta").model
const achModel=require("../models/achievement")
const workModel=require("../models/work")
const qualModel=require("../models/qualification")
const meta = require("../models/meta")
const mongoose=require("mongoose")

const fetchUser=async (user)=>{
    try{
        var user_db
        if(!user){
            throw new Error("user undefined")
        }
        if(user.email)
            user_db=await userModel.findOne({email:user.email})
        else if(user.uname)
            user_db=await userModel.findOne({uname:user.uname})
        else throw new Error("No username or email found")

        if(user_db && user_db.meta){
            var m=await metaModel.findById(mongoose.Types.ObjectId(user_db.meta))
            if(m){
                user_db.meta=m
                
                var achievements=[]
                if(m.achievements && m.achievements.length){    
                    for(var i=0;i<m.achievements.length;i++){
                        achievements.push(await achModel.findById(mongoose.Types.ObjectId(m.achievements[i])))
                    }
                }
                user_db.meta.achievements=achievements

                var works=[]
                if(m.works && m.works.length){                    
                    for(var i=0;i<m.works.length;i++){
                        works.push(await workModel.findById(mongoose.Types.ObjectId(m.works[i])))
                    }                    
                }
                user_db.meta.works=works

                var qualifications=[]
                if(m.qualifications && m.qualifications.length){                    
                    for(var i=0;i<m.qualifications.length;i++){
                        qualifications.push(await qualModel.findById(mongoose.Types.ObjectId(m.qualifications[i])))
                    }
                }
                user_db.meta.qualifications=qualifications
            }            
        }
        return user_db
    } catch(error){
        console.log(error)
        throw error
    }
    
}

module.exports={
    fetchUser
}
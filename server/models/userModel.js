const mongoose=require("mongoose");

const userSchema= mongoose.Schema(
    {
        email:{
          type:String,
          require:[true,"please add your email"],
        },
        first_name:{
            type:String,
            require:[true,"please add your first name"],
          },
         last_name:{
            type:String,
            require:[true,"please add your last name"],
          },
          age:{
            type:Number,
            require:[true,"please add your age"],
          },
          blood_group:{
            type:String,
            require:[true,"please add your bg"],
          },
          gender:{
            type:String,
            require:[true,"please add your gender"],
          },
          phone_number:{
            type:String,
            require:[true,"please add your phone no."],
          },
          password:{
            type:String,
            require:[true,"please add your pass"],
          },
          

    }, 
    {timestamps:true, // automatically adds created at and updatedat fields
    }
);
const User= mongoose.model("User",userSchema);
module.exports=User;
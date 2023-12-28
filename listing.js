const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listSchema=new Schema({

    title:
    {
type:String,
required:true,
    },

    description:{
        type:String,
            },

    image:
    {
        type:String,
        default:"https://unsplash.com/photos/a-man-climbing-up-the-side-of-a-mountain-85ey1vFIwkc",
set : (v)=> v ===""?"https://unsplash.com/photos/a-man-climbing-up-the-side-of-a-mountain-85ey1vFIwkc": v,
    },
   
    price:{
type:Number
    },
   location:{
type:String
   },
   country:{
type:String
   },

});

let Listing = mongoose.model("Listing", listSchema);
module.exports=Listing;  
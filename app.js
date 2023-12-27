const express= require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

main().then((res)=>{
  console.log("Connected to DB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/WanderLust');
}

app.get("/", (req,res)=>{
console.log("I am Root ");
res.send("I am Root");
});

app.get("/listings" , async (req,res) =>
{
let allListings= await Listing.find({});
  res.render("listings/index.ejs", {allListings});

});

app.get("/listings/new", (req, res)=>{
  res.render("listings/new.ejs");
  });

  //show listing
app.get("/listings/:id", async (req, res)=> {

  let {id}=req.params;
  const listing=await Listing.findById(id);
  res.render("listings/show.ejs", {listing});
});

//Add listing 

app.post("/listing", async (req,res)=>{
  try{
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  }
  catch(err){
    next(err);
  }

});

//edit
app.get("/listings/:id/edit", async (req,res)=>{
let {id}=req.params;
 const listing= await Listing.findById(id);
res.render("listings/edit.ejs", {listing});
});

//update
app.put("/listings/:id", async (req,res)=>{
  let {id}=req.params;
  await Listing.findByIdAndUpdate(id,{...req.body.listing});
  res.redirect(`/listings/${id}`);
});

//delete
app.delete("/listings/:id", async (req,res)=>{
let {id}=req.params;
await Listing.findByIdAndDelete(id);
res.redirect("/listings");
});

// app.get("/testListing",  async (req, res)=>{
//   let sampleListing = new Listing({
//     title:"My Home",
//     description:"By the sunrise",
//     Price:1200,
//     location:"Tokyo, Kyoto",
//     Country:"Japan",
//   });
//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("Successfull Testing");
//})

app.use((err,req,res,next)=>{
  res.send("something went wrong")
});
app.listen(6060, ()=>{
    console.log("Listening at port 6060");
});
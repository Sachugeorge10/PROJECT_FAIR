const mongoose=require('mongoose')

const connectionString=process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    console.log("connection established");
})
.catch(err=>{
    console.log("connection error" +err.message);
})
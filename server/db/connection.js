import { MongoClient } from "mongodb";
import mongoose from "mongoose";

// atlas DNS resolution is very slow so we conncet cloudflare's dns instead 
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);

const connectionString=process.env.MONGODB_URI ||"";

// const client = new MongoClient(connectionString);

// let conn;

try{
//    conn=await client.connect();
await mongoose.connect(connectionString,{
     dbName:"Server",
});
    
    console.log("Connected MongoDB,Mongoose");
}catch(e){
      console.log(`MongoDb is Not Connected ${e}`);
}


// let db = conn.db("Server");

// export default db;

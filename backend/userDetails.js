const moongose = require("mongoose");

const userDetailsSchema = new moongose.Schema(
  {
    uname:String,
    fname:String,
    date:String,
    desig:String,
    email:{type:String,unique:true},
    password:String,
    phone:String
  },
  {
    collection: "userInfo",
  }
);

moongose.model("userInfo", userDetailsSchema);

import React, {  useEffect, useState } from "react";



export default function UserDetails() {
  const [userData, setUserData] = useState("");

  const logOut = () => {
   window.localStorage.clear();
   window.location.href = "./sign-in";
 };


  useEffect(() => {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
  

        setUserData(data.data);

       
      });
  }, []);

  return(
      <div>
        <label className="user-label">User Name</label>
         <h4>{userData.uname}</h4>
         <label  className="user-label">Email Address</label>
         <h4>{userData.email}</h4>
         <button onClick={logOut} className="btn btn-primary" >
            Log Out
         </button>
      </div>
   )

}
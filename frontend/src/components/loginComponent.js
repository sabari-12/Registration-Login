import React,{useState} from 'react'
import UserDetails from './userDetails';

export default function Login()  {
  
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");


const handleSubmit = (e)=> {
    e.preventDefault();
    console.log( email, password);



    fetch("http://localhost:5000/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body: JSON.stringify({
        email,
        password

      }),
    }).then((res) => res.json())
    .then((data) =>{
      console.log(data,"userloggedin");

      if (data.status === "ok") {
        alert("LoggedIn Successfully");
        window.localStorage.setItem("token",data.data);
        window.location.href = "./userDetails";
      }

    });
 
  }



    return (
      <form onSubmit={handleSubmit}>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setemail( e.target.value )}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setpassword( e.target.value )}
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="check"
            />
            <label className="custom-control-label" htmlFor="check">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        
        <p className="forgot-password text-right">
           <a href="#">Forgot password</a><br></br>
           <a href="/sign-up">Register</a>
        </p>

      </form>
    )

  }
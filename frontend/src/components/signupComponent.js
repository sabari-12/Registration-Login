import React, { useState } from "react";

export default function SignUp() {
  const [uname, setuname] = useState("");
  const [fname, setfname] = useState("");
  const [date, setdate] = useState("");
  const [desig, setdesig] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [isSubmit,setIsSubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    console.log(uname, fname, date, desig, email, password, phone);

    fetch("http://localhost:5000/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        uname,
        fname,
        date,
        desig,
        email,
        password,
        phone,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
          console.log(data, "userRegister");
        if (data.status === "ok") {
          alert("Registration Successful");
          window.location.href = "./sign-in";
        } else {
          alert("Something went wrong");
        }
      });

  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <div className="mb-3">
        <label>User name</label>
        <input
          name="uname"
          type="text"
          className="form-control"
          placeholder="Enter your name"
          onChange={(e) => setuname(e.target.value)}
          required
        />
        
      </div>
      <div className="mb-3">
        <label>Father name</label>
        <input
          name="fname"
          type="text"
          className="form-control"
          placeholder="Enter your Father's name"
          onChange={(e) => setfname(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Date of birth</label>
        <input
          name="date"
          type="date"
          className="form-control"
          onChange={(e) => setdate(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Designation</label>
        <select
          class="form-control form-select"
          name="desi"
          onChange={(e) => setdesig(e.target.value)}
        >
          <option >Select</option>
          <option value="Student">Student</option>
          <option value="UG(Under Graduation)">UG(Under Graduation)</option>
          <option value="PG(Post Graduation)">PG(Post Graduation)</option>
          <option value="Office(Work)">Office(Work)</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Email address</label>
        <input
          name="email"
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => setemail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          name="password"
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setpassword(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Mobile number</label>
        <input
          name="phone"
          type="tel"
          className="form-control"
          placeholder="Enter mobile number"
          onChange={(e) => setphone(e.target.value)}
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered <a href="/sign-in">sign in?</a>
      </p>
    </form>
  );
}

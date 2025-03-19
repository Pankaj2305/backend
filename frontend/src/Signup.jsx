// import React, { useState } from "react";
// import { Container, Form, Button, Row, Col } from "react-bootstrap";
// import axios from "axios";

// const Signup = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false); 
//   const [error, setError] = useState(""); 
//   const [successMessage, setSuccessMessage] = useState(""); 

//   const handleSubmit = (e) => {
//     e.preventDefault();

   
//     if (!name || !email || !password) {
//       alert("All fields are required");
//       return;
//     }

   
//     setLoading(true);
//     setError(""); 
//     setSuccessMessage(""); 

//     axios
//       .post("http://localhost:9000/user/signup", { name, email, password })
//       .then((response) => {
//         console.log(response.data); 
//         setSuccessMessage(response.data.message); 
//         alert("Signup Successful");
//       })
//       .catch((error) => {
//         console.error("Error during signup:", error);
        
//         setError(error?.response?.data?.message || "Signup failed, try again.");
//       })
//       .finally(() => {
       
//         setLoading(false);
//       });
//   };

//   return (
//     <Container className="mt-5">
//       <Row className="justify-content-center">
//         <Col md={6} sm={12}>
//           <h3 className="text-center">Sign Up</h3>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="formName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter your name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <Form.Group controlId="formEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <Form.Group controlId="formPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <Button type="submit" disabled={loading}> 
//               {loading ? "Signing Up..." : "Sign Up"}
//             </Button>
//           </Form>

          
//           {error && <p className="text-danger mt-3">{error}</p>}
          
         
//           {successMessage && <p className="text-success mt-3">{successMessage}</p>}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Signup;



import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 
  const [emailWarning, setEmailWarning] = useState(""); 
  const navigate=useNavigate();

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (!event.target.value.includes('@gmail.com')) {
      setEmailWarning("Email must contain '@gmail.com'");
    } else {
      setEmailWarning("");
    }
  };
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSignup = () => {
    setIsSubmitting(true);

    if (!username || !email || !password) {
      alert("All fields are required");
      setIsSubmitting(false);
      return;
    }

    if (!email.includes("gmail.com")) {
      setEmailWarning("Email must contain 'gmail.com'");
      setIsSubmitting(false);
      return;
    }
   
    axios
      .post("http://localhost:3000/user/Signup", { username, email, password })
      .then((response) => {
        console.log(response.data);
        setSuccessMessage(response.data.message);
        alert("Signup Successful");
        navigate('/Login')
      })
      .catch((error) => {
        console.error("Error during signup:", error);
        setError(error?.response?.data?.message || "Signup failed, try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const containerStyle = {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e9ebee',
    padding: '15px',
    boxSizing: 'border-box',
  };

  const logoContainerStyle = {
    textAlign: 'center',
    backgroundColor: 'white',
    padding: '40px 30px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px', 
  };

  const h2Style = {
    color: 'black',
    marginBottom: '20px',
    fontSize: '24px', 
    fontWeight: 'bold',
  };

  const formStyle = {
    width: '100%',
    marginTop: '20px',
  };

  const inputStyle = {
    height: '44px',
    width: '90%',
    borderRadius: '10px',
    border: '1px solid #ccc',
    padding: '0 10px',
    marginBottom: '15px',
    fontSize: '14px',
  };

  const buttonStyle = {
    width: '100%',
    height: '44px',
    borderRadius: '10px',
    backgroundColor: '#3897f0',
    border: 'none',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '15px',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#3897f0',
    fontWeight: 'bold',
    display: 'inline-block',
    marginTop: '10px',
  };

  const textCenterStyle = {
    fontSize: '12px',
    color: '#999',
    marginTop: '10px',
  };

  return (
    <div style={containerStyle}>
      <div style={logoContainerStyle}>
        <h2 style={h2Style}>Instagram</h2>
        <button type="button" style={buttonStyle}>
          Continue with Facebook
        </button>
        <h6 className="text-center mt-4">or</h6>

        <div style={formStyle}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange} 
            style={inputStyle}
          />
          {emailWarning && <p style={{ color: "red", fontSize: "14px" }}>{emailWarning}</p>} 
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            style={inputStyle}
          />
          
          <button
            type="button"
            onClick={handleSignup}

            disabled={!username || !email || !password || isSubmitting || emailWarning}
            style={{
              ...buttonStyle,
              ...(isSubmitting || !username || !email || !password || emailWarning) && { backgroundColor: "#ccc" }, 
            }}
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
         

          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>} 
          {successMessage && <p style={{ color: "green", fontSize: "14px" }}>{successMessage}</p>} 
          <Link to='/Login'>
          <p style={textCenterStyle}>Already have an account? Log in</p>
          </Link>
         
          <p style={textCenterStyle}>From</p>
          <p style={textCenterStyle}>Facebook</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

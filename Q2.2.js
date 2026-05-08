import React, { useState } from "react";


function PasswordChecker() {
  const [password, setPassword] = useState("");


  const checkStrength = () => {
    let strength = "Weak";


    if (password.length > 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[@$!%*?&]/.test(password)) {
      strength = "Strong";
    } else if (password.length > 5) {
      strength = "Medium";
    }


    return strength;
  };


  return (
    <div>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <p>Strength: {checkStrength()}</p>
    </div>
  );
}


export default PasswordChecker;
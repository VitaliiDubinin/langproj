const BASE_URL = "http://localhost:5050"; 

// export const authenticateUser = async (email, password,role) => {
//     const response = await fetch(`${BASE_URL}/api/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password,role }),
//     });
//     const data = await response.json();
//     console.log("DADA",data.success)
//     return data;
//   };

export const authenticateUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  return data; // Expected: { success, token, role }
};
  
  export const registerUser = async (email, password, role) => {
    const response = await fetch(`${BASE_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, role }),
    });
    const data = await response.json();
    return data.success;
  };


  
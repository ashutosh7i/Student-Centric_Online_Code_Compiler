export default async function getAllUsers() {
    try {
      // Define the request options
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      // Send a GET request to retrieve data from the server
      const response = await fetch(
        `${process.env.REACT_APP_CODEDB}/getAllUsers`,
        requestOptions
      );
  
      if (!response.ok) {
        throw new Error("Error retrieving data from DB");
      }
  
      // Parse the response JSON
      const responseData = await response.json();
  
      // Return the response data
      return responseData;
    } catch (error) {
      // Handle any errors and show an alert
      alert("Error: " + error.message);
    }
  }
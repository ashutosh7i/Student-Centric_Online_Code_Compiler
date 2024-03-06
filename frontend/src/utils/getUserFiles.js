export default async function getUserFiles(uid) {
  try {
    // Define the request options
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: uid }),
    };

    // Send a POST request to retrieve data from the server
    const response = await fetch(
      `${process.env.REACT_APP_CODEDB}/getUserFiles`,
      requestOptions
    );

    if (response.status === 202) {
      return [{ filename: "New User", timestamp: new Date().toISOString() }];
    }

    if (!response.ok) {
      throw new Error("Error retrieving data from DB");
    }

    // Parse the response JSON
    const responseData = await response.json();

    // Log the parsed response data
    console.log(responseData);

    // Return the response data
    return responseData;
  } catch (error) {
    // Handle any errors and show an alert
    alert("Error: " + error.message);
  }
}

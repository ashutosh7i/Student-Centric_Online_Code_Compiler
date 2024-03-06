// readFromDB.js
export default async function readFromDB(uid, filename) {
  try {
    // Define the request options
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: uid, filename: filename }),
    };

    // Send a GET request to retrieve data from the server
    const response = await fetch(
      `${process.env.REACT_APP_CODEDB}/readFromDB`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error("Error retrieving data from DB");
    }

    // Parse the response JSON
    const responseData = await response.json();

    // Extract the "data" property from the response
    const data = JSON.parse(responseData.data).data;

    // Update the textarea with the retrieved data
    return `${data}`;
  } catch (error) {
    // Handle any errors and show an alert
    throw new Error(error.message);
  }
}

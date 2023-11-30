export default async function deleteUserFile(uid, filename) {
  try {
    // Define the request options
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: uid, filename: filename }),
    };

    // Send a POST request to delete the file from the server
    const response = await fetch(
      `${process.env.REACT_APP_CODEDB}/deleteUserFile`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error("Error deleting file from DB");
    }
    console.log(response);
    // Show an alert
    // alert("File deleted successfully");
  } catch (error) {
    // // Handle any errors and show an alert
    // alert("Error: " + error.message);
  }
}

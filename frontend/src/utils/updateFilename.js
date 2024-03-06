export default function updateFilename(uid, filename, newFilename) {
  return new Promise(async (resolve, reject) => {
    try {
      // Define the request options
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: uid,
          filename: filename,
          newFilename: newFilename,
        }),
      };

      // Send a POST request to update the filename on the server
      const response = await fetch(
        `${process.env.REACT_APP_CODEDB}/updateFilename`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Error updating filename");
      }

      resolve("Filename updated successfully");
    } catch (error) {
      reject(error.message);
    }
  });
}

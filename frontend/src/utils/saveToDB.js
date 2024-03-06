export default function saveToDB(uid, data, filename) {
  // Get the text from the textarea
  const newData = JSON.stringify({ uid: uid, data: data, filename: filename });
  console.log(newData);

  // Send the text to the server to save it to the database
  return fetch(`${process.env.REACT_APP_CODEDB}/saveToDB`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: newData,
  }).then((response) => {
    if (response.ok) {
      return "Code saved to DB";
    } else {
      throw new Error("Error saving data to DB");
    }
  });
}

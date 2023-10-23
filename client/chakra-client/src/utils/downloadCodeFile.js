//function to download the code as name.extention
export default function downloadFile(code, filename) {
  const element = document.createElement("a");
  const file = new Blob([code], {
    type: "text/plain",
  });
  element.href = URL.createObjectURL(file);
  element.download = `${filename}`;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
}

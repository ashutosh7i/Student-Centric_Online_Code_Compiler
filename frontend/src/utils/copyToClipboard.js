//Utility function to copy the text to clipboard
export default function copyToClipboard(copyText) {
  // Copy the text
  navigator.clipboard.writeText(copyText);
  // Alert the copied text
  return;
}

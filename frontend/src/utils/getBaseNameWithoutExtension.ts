export function getBaseNameWithoutExtension(path: string) {
  // Extract the base file name (similar to os.path.basename in Python)
  let baseName = path.split(/[\\/]/).pop();
  baseName = baseName ? baseName : '';
  // Remove the file extension
  let extensionIndex = baseName.lastIndexOf(".");
  if (extensionIndex !== -1) {
      baseName = baseName.substring(0, extensionIndex);
  }
  return baseName;
}
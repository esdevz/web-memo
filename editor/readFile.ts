export default function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        resolve(reader.result as string);
      },
      false
    );

    reader.addEventListener(
      "error",
      (err) => {
        console.warn(err);
        reject("an error has occured while attempting to read files");
      },
      false
    );

    reader.readAsDataURL(file);
  });
}

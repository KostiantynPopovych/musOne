const convertFileToBlob = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = e =>
      resolve(
        new Blob([new Uint8Array(e.target?.result as Iterable<number>)], {
          type: file.type
        })
      );
    reader.onerror = error => reject(error);
  });

export default convertFileToBlob;

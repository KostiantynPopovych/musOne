import { v4 as uuidv4 } from 'uuid';

const TEXTS = {
  TITLE: 'musOne',
  UPLOAD: 'Upload files'
};

declare global {
  interface Window {
    mutag: {
      fetch: MetagFetch;
    };
  }
}

const normalizeFiles = async (files: File[]) => {
  const filesArray = [...files];
  const result = await Promise.all(
    filesArray.map(file => window.mutag.fetch(file))
  );
  return filesArray.reduce((acc: Sound[], file, idx) => {
    const {
      TALB: album,
      APIC: picture,
      TYER: year,
      TPE1: performer,
      TIT2: name,
      TCON: style,
      TRCK: position
    } = result[idx];
    return [
      ...acc,
      {
        id: uuidv4(),
        // TODO: CHECK IF THIS CAN BE CONVERTED TO BASE64 FOR NEXT USAGE
        file,
        album,
        picture,
        year,
        performer,
        name,
        style,
        position
      }
    ];
  }, []);
};

export { TEXTS, normalizeFiles };

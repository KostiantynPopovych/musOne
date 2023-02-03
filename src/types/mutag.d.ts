type MetagFetch = (file: File) => Promise<MutagResult>;

interface MutagResult {
  APIC: Blob;
  COMM: string;
  GEOB: string;
  PRIV: string;
  TALB: string;
  TCOM: string;
  TCON: string;
  TIT2: string;
  TPE1: string;
  TPUB: string;
  TRCK: string;
  TYER: string;
}

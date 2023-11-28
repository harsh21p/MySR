import Constants from '../constants/file-size';

export const bytesToMB = (size: number) =>
  parseFloat((size / (1024 * 1024)).toFixed(2));

export const isFileSizeValid = (fileSize: number) => {
  const sizeInMB = bytesToMB(fileSize);
  if (sizeInMB <= Constants.maxFileSize3) {
    return true;
  }
  return false;
};

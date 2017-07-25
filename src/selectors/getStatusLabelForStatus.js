import STATUS from '../utils/consts';
const getStatusLabelForStatus = (status) => ({
  [STATUS.UNDEFINED]: 'Not uploaded yet',
  [STATUS.LOADING]: 'Busy uploading...',
  [STATUS.LOADED]: 'Uploaded',
  [STATUS.ERROR]: 'Error while uploading',
})[status];

export default getStatusLabelForStatus;

import { createSelector } from 'reselect';
import Status from '../utils/consts';

const getAllDocuments = state => state.documents;

const getStats = createSelector(
  [getAllDocuments],
  documents => {
    const list = Object.keys(documents)
      .map(id => documents[id])
      .filter(doc => doc !== undefined);
    return {
      image: 'stat',
      Archived: list.filter(doc => doc.archived).length,
      Deleted: list.filter(doc => doc.deleted).length,
      Pending: list.filter(doc => !doc.deleted && doc.status === Status.UNDEFINED).length,
      Uploading: list.filter(doc => doc.status === Status.LOADING).length,
      Uploaded: list.filter(doc => doc.status === Status.LOADED).length,
      Failed: list.filter(doc => doc.status === Status.ERROR).length,
    };
  }
);

export default getStats;

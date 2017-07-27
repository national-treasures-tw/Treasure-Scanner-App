import { createSelector } from 'reselect';

const getAllDocuments = state => state.documents;

const getScannedDocuments = createSelector(
  [getAllDocuments],
  documents => {
    return Object.keys(documents)
      .map(id => documents[id])
      .filter(doc => doc !== undefined && !doc.deleted && !doc.archived)
      .sort((a, b) => b.timestamp - a.timestamp)
  }
);

export default getScannedDocuments;

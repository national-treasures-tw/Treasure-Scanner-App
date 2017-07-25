import { createSelector } from 'reselect';

const getAllSessions = state => state.scans.sessions;
const getAllDocuments = state => state.scans.documents;

const getScanSessions = createSelector(
  [getAllSessions, getAllDocuments],
  (sessions, documents) =>
    Object.keys(sessions)
      .map(id => ({
        ...sessions[id],
        documents: sessions[id].documents
          .map(id => documents[id])
          .filter(doc => doc !== undefined && !doc.deleted)
      }))
      .sort((a, b) => a.timestamp - b.timestamp)
);

export default getScanSessions;

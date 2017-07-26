import { StatusBar } from 'react-native';

import Scanbot from './Scanbot';
import config from '../config';

/*
 * Helper function for calling the scan API of Scanbot
 * By adding this file we can just call `scanDocuments`
 * instead of having to pass all the options and translations all the time
 * This file should be changed depending on the project's needs while Scanbot.js should stay unchanged.
 */
const scanDocuments = async () => {
  StatusBar.setHidden(true, true);

  // See 'Scanbot/Scanbot.js' for all options and documentation
  let documents = await Scanbot.scan(config.scanOptions);

  StatusBar.setHidden(false, true);

  if(!documents || documents.length === 0) {
    // User cancelled
    return;
  }

  // filter only valid documents
  documents = documents.filter(document => document && document.image);

  if(documents.length === 0) {
    throw new Error('Error while scanning');
  }

  return documents;
};

export default scanDocuments;

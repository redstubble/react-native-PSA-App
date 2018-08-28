import { UPDATE_DOCUMENTS_STATE } from '../actions';

const initialDocumentUploadingState = {
  uploading: false,
};

function documents(state = initialDocumentUploadingState, action) {
  const { bool } = action;
  debugger;
  switch (action.type) {
    case UPDATE_DOCUMENTS_STATE:
      debugger;
      return { ...state, uploading: bool };
    default:
      return state;
  }
}

export default documents;

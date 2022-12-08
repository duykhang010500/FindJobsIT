import {
  CLOSE_FORM,
  CREATE_FOLDER_SUCCESS,
  DELETE_FOLDER_SUCCESS,
  GET_FOLDER,
  GET_FOLDERS_SUCCESS,
  OPEN_FORM,
  UPDATE_FOLDER_SUCCESS,
} from './actionTypes';
import { Folder, FolderActions, FoldersState } from './types';

const initialState: FoldersState = {
  isLoading: false,
  isOpen: false,
  folder: null,
  folders: [],
  selectedFolder: null,
};

const foldersReducer = (state = initialState, action: FolderActions) => {
  switch (action.type) {
    case OPEN_FORM:
      return {
        ...state,
        isOpen: true,
      };
    case CLOSE_FORM:
      return {
        ...state,
        isOpen: false,
        selectedFolder: null,
      };
    case CREATE_FOLDER_SUCCESS:
      return {
        ...state,
        isOpen: false,
        folders: [action.payload, ...state.folders],
      };
    case GET_FOLDERS_SUCCESS:
      return {
        ...state,
        folders: action.payload,
      };
    case GET_FOLDER:
      return {
        ...state,
        selectedFolder: action.payload,
      };
    case UPDATE_FOLDER_SUCCESS:
      return {
        ...state,
        folders: state.folders.map((folder: Folder) =>
          folder.id === action.payload.id ? action.payload : folder
        ),
      };
    case DELETE_FOLDER_SUCCESS:
      return {
        ...state,
        folders: state.folders.filter(
          (folder: Folder) => folder.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default foldersReducer;

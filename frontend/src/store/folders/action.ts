import {
  CLOSE_FORM,
  CREATE_FOLDER,
  CREATE_FOLDER_SUCCESS,
  DELETE_FOLDER,
  DELETE_FOLDER_SUCCESS,
  GET_FOLDER,
  GET_FOLDERS,
  GET_FOLDERS_SUCCESS,
  GET_FOLDER_SUCCESS,
  OPEN_FORM,
  UPDATE_FOLDER,
  UPDATE_FOLDER_SUCCESS,
} from './actionTypes';
import { Folder } from './types';

export const openForm = () => ({
  type: OPEN_FORM,
});

export const closeForm = () => ({
  type: CLOSE_FORM,
});

export const createFolder = (folder: Folder) => ({
  type: CREATE_FOLDER,
  payload: folder,
});

export const createFolderSuccess = (folder: Folder) => ({
  type: CREATE_FOLDER_SUCCESS,
  payload: folder,
});

export const getFolders = () => ({
  type: GET_FOLDERS,
});

export const getFoldersSuccess = (folders: Folder[]) => ({
  type: GET_FOLDERS_SUCCESS,
  payload: folders,
});

export const getFolder = (folder: Folder) => ({
  type: GET_FOLDER,
  payload: folder,
});

export const getFolderSuccess = (folder: Folder) => ({
  type: GET_FOLDER_SUCCESS,
  payload: folder,
});

export const updateFolder = (id: Number, folder: Folder) => ({
  type: UPDATE_FOLDER,
  payload: {
    folder,
    id,
  },
});

export const updateFolderSuccess = (folder: Folder) => ({
  type: UPDATE_FOLDER_SUCCESS,
  payload: folder,
});

export const deleteFolder = (id: number) => ({
  type: DELETE_FOLDER,
  payload: id,
});

export const deleteFolderSuccess = (id: Partial<Folder>) => ({
  type: DELETE_FOLDER_SUCCESS,
  payload: id,
});

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

export interface Folder {
  id?: number;
  updated_at?: string;
  created_at?: string;
  comp_id?: number;
  emp_id?: number;
  name?: string;
  is_private?: number;
}

export interface FoldersState {
  isLoading: boolean;
  selectedFolder: Folder | null;
  isOpen: boolean;
  folders: Folder[];
  folder: Folder | null;
}

export type OpenForm = {
  type: typeof OPEN_FORM;
};

export type CloseForm = {
  type: typeof CLOSE_FORM;
};

export type CreateFolder = {
  type: typeof CREATE_FOLDER;
  payload: Folder;
};

export type CreateFolderSuccess = {
  type: typeof CREATE_FOLDER_SUCCESS;
  payload: Folder;
};

export type GetFolders = {
  type: typeof GET_FOLDERS;
};

export type GetFoldersSuccess = {
  type: typeof GET_FOLDERS_SUCCESS;
  payload: Folder[];
};

export type GetFolder = {
  type: typeof GET_FOLDER;
  payload: Folder;
};

export type GetFolderSuccess = {
  type: typeof GET_FOLDER_SUCCESS;
  payload: Folder;
};

export type UpdateFolder = {
  type: typeof UPDATE_FOLDER;
  payload: any;
};

export type UpdateFolderSuccess = {
  type: typeof UPDATE_FOLDER_SUCCESS;
  payload: Folder;
};

export type DeleteFolder = {
  type: typeof DELETE_FOLDER;
  payload: number;
};

export type DeleteFolderSuccess = {
  type: typeof DELETE_FOLDER_SUCCESS;
  payload: number;
};

export type FolderActions =
  | OpenForm
  | CloseForm
  | CreateFolder
  | CreateFolderSuccess
  | GetFolders
  | GetFoldersSuccess
  | GetFolder
  | GetFolderSuccess
  | UpdateFolder
  | UpdateFolderSuccess
  | DeleteFolder
  | DeleteFolderSuccess;

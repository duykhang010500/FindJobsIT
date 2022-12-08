import { createChainedFunction } from '@mui/material';
import { AnyARecord } from 'dns';
import { toast } from 'react-toastify';
import { call, takeEvery, put } from 'redux-saga/effects';
import { textSpanContainsTextSpan } from 'typescript';
import employerServices from '../../services/employer';
import {
  closeForm,
  createFolderSuccess,
  deleteFolderSuccess,
  getFoldersSuccess,
  updateFolderSuccess,
} from './action';
import {
  CREATE_FOLDER,
  DELETE_FOLDER,
  DELETE_FOLDER_SUCCESS,
  GET_FOLDER,
  GET_FOLDERS,
  UPDATE_FOLDER,
} from './actionTypes';

function* createFolder({ payload }: any): any {
  try {
    const res = yield call(employerServices.createFolder, payload);
    yield put(createFolderSuccess(res.data.folder));
    toast.success('Create folder successfully!');
  } catch (err) {}
}

function* getFolders(): any {
  try {
    const res = yield call(employerServices.getFolders);
    yield put(getFoldersSuccess(res.data.folders));
  } catch (err) {}
}

function* getFolder() {}

function* updateFolder({ payload }: any): any {
  try {
    const res = yield call(
      employerServices.updateFolder,
      payload.id,
      payload.folder
    );
    yield put(updateFolderSuccess(res.data.folder));
    yield put(closeForm());
    toast.success('Update folder successfully!');
  } catch (err) {
    throw err;
  }
}

function* deleteFolderSaga({ payload }: any): any {
  try {
    yield call(employerServices.deleteFolder, payload);
    yield put(deleteFolderSuccess(payload));
    toast.success('Delete folder successfully!');
  } catch (err) {}
}

function* foldersSaga() {
  yield takeEvery(CREATE_FOLDER, createFolder);
  yield takeEvery(GET_FOLDERS, getFolders);
  yield takeEvery(GET_FOLDER, getFolder);
  yield takeEvery(UPDATE_FOLDER, updateFolder);
  yield takeEvery(DELETE_FOLDER, deleteFolderSaga);
}

export default foldersSaga;

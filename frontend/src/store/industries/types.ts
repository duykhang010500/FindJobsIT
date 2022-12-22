import {
  ADMIN_GET_INDUSTRIES_LIST,
  ADMIN_GET_INDUSTRIES_LIST_FAILURE,
  ADMIN_GET_INDUSTRIES_LIST_SUCCESS,
  CLOSE_MODAL,
  CREATE_INDUSTRY,
  CREATE_INDUSTRY_FAILURE,
  CREATE_INDUSTRY_SUCCESS,
  DELETE_INDUSTRY,
  DELETE_INDUSTRY_FAILURE,
  DELETE_INDUSTRY_SUCCESS,
  GET_INDUSTRIES,
  GET_INDUSTRIES_SUCCESS,
  OPEN_MODAL,
  SELECT_INDUSTRY,
  UPDATE_INDUSTRY,
  UPDATE_INDUSTRY_FAILURE,
  UPDATE_INDUSTRY_SUCCESS,
} from './actionTypes';

export interface IIndustriesState {
  isLoading: boolean;
  isOpenModal: boolean;
  selectedIndustryId: number | null;
  industries: IIndustry[];
}

export interface IIndustry {
  id?: number;
  name?: string;
  status?: number;
  num_resume?: null;
  priority?: number;
  created_at?: string;
  updated_at?: string;
}

export type OpenModal = {
  type: typeof OPEN_MODAL;
};

export type CloseModal = {
  type: typeof CLOSE_MODAL;
};

export type SelectIndustry = {
  type: typeof SELECT_INDUSTRY;
  payload: number;
};

export type GetIndustries = {
  type: typeof GET_INDUSTRIES;
};

export type GetIndustriesSuccess = {
  type: typeof GET_INDUSTRIES_SUCCESS;
  payload: any;
};

export type AdminGetIndustriesList = {
  type: typeof ADMIN_GET_INDUSTRIES_LIST;
};

export type AdminGetIndustriesListSuccess = {
  type: typeof ADMIN_GET_INDUSTRIES_LIST_SUCCESS;
  payload: IIndustry[];
};

export type AdminGetIndustriesListFailure = {
  type: typeof ADMIN_GET_INDUSTRIES_LIST_FAILURE;
};

export type CreateIndustry = {
  type: typeof CREATE_INDUSTRY;
};

export type CreateIndustrySuccess = {
  type: typeof CREATE_INDUSTRY_SUCCESS;
};

export type CreateIndustryFailure = {
  type: typeof CREATE_INDUSTRY_FAILURE;
};

export type UpdateIndustry = {
  type: typeof UPDATE_INDUSTRY;
};

export type UpdateIndustrySuccess = {
  type: typeof UPDATE_INDUSTRY_SUCCESS;
};

export type UpdateIndustryFailure = {
  type: typeof UPDATE_INDUSTRY_FAILURE;
};

export type DeleteIndustry = {
  type: typeof DELETE_INDUSTRY;
  payload: number;
};

export type DeleteIndustrySuccess = {
  type: typeof DELETE_INDUSTRY_SUCCESS;
};

export type DeleteIndustryFailure = {
  type: typeof DELETE_INDUSTRY_FAILURE;
};

export type IndustriesActionTypes =
  | OpenModal
  | CloseModal
  | SelectIndustry
  | GetIndustries
  | GetIndustriesSuccess
  | AdminGetIndustriesList
  | AdminGetIndustriesListSuccess
  | AdminGetIndustriesListFailure
  | CreateIndustry
  | CreateIndustrySuccess
  | CreateIndustryFailure
  | UpdateIndustry
  | UpdateIndustrySuccess
  | UpdateIndustryFailure
  | DeleteIndustry
  | DeleteIndustrySuccess
  | DeleteIndustryFailure;

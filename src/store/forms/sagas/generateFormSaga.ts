import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { Config } from '../../../App';
import {
  generateFormData,
  generateFormError,
  GenerateFormFetch,
} from '../actions';
import { CommonError } from 'src/store/types'; // Importujte CommonError interfejs

export const apiConfig = (token?: any) => {
  if (token) {
    return {
      headers: {
        'Authorization': 'Token ' + token,
      },
    };
  }
  return {};
};

export const postRequest = (config: Config) => {
  return axios.post(
    `${config.api_url || 'https://api.kycaid.com'}/forms/${config.form_id}/urls`,
    {
      form_id: config.form_id,
      applicant_id: config.applicant_id || null,
    },
    apiConfig(config.api_token),
  );
};

export function* generateFormSaga(action: GenerateFormFetch) {
  try {
    const { data } = yield call(() => postRequest(action.payload));
    yield put(generateFormData(data));
  } catch (error) {
    const err = error as CommonError; // Kastovanje error u CommonError
    yield put(generateFormError(err));
  }
}

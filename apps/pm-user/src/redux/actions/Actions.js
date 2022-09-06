import { ActionTypes } from '../constants';
import axios from 'axios';
// import Apis from "../../apis";

export const getUserProfile = (oktaUserId) => {
  return async (dispatch) => {
    const url = `http://localhost:8000/api/v1/users/userprofile/${oktaUserId}`;

    const response = await axios.get(url);

    dispatch({
      type: ActionTypes.GET_USER_PROFILE,
      payload: response.data.currentUser[0],
    });
  };
};



//to update the user
export const updateUserProfile = (oktaUserId, value) => {
  return async (dispatch) => {
    const url = `http://localhost:8000/api/v1/users/${oktaUserId}`;
    const response = await axios.put(url, value);
    dispatch({
      type: ActionTypes.UPDATE_USER_PROFILE,
      payload: response
    });
  };
};

export const updateUserImage = (oktaUserId, fileObj) => {
  return async (dispatch) => {

    const formData = new FormData();
      // console.log(uploadImage);
      formData.append('file', fileObj);
      formData.append('upload_preset', 'lb3xedsh');

      //submiting image on cloudinary
      const responseClodinary = await axios.post('https://api.cloudinary.com/v1_1/pesto-matrimony/image/upload', formData);
      const imageUrlString = responseClodinary.data.url;

      const payload = {
        oktaUserId,
        imageUrlString,
      } 

    const url = `http://localhost:8000/api/v1/users/imageupload/${oktaUserId}`;
    const response = await axios.post(url, payload);
    console.log(response);
    dispatch({
      type: ActionTypes.UPDATE_USER_IMAGE,
      payload: response
    })
  }
}
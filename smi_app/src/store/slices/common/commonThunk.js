import { setLoading, setLatitude, setLongitude } from "./commonSlice";


export const setCommonLoading = (action) => {
    return async (dispatch) => {
        dispatch(setLoading(action));
    };
};

export const setLng = (lng) => {
    return async (dispatch) => {
        dispatch(setLongitude(lng));
    };
};
  
export const setLat = (lat) => {
    return async (dispatch) => {
        dispatch(setLatitude(lat));
    };
};
  

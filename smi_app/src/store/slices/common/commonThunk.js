import { setLoading } from "./commonSlice";


export const setCommonLoading = (action) => {
    return async (dispatch) => {
        dispatch(setLoading(action));
    };
};
  

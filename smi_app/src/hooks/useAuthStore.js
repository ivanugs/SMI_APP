import { useDispatch, useSelector } from "react-redux"
import { api } from '../api';
import { onChecking, onLogin, onLogout, clearErrorMessage } from '../store';
export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        const maxRetries = 2;
        const timeout = 2000; // 2 segundos
    
        // Loading state
        dispatch(onChecking());
    
        for (let retry = 0; retry <= maxRetries; retry++) {
            try {
                const startTime = Date.now();
                localStorage.setItem('email', email);
                const { data } = await Promise.race([
                    api.post('/users/login', { email, password }),
                    new Promise((_, reject) => {
                        setTimeout(() => {
                            reject(new Error('Request timed out'));
                        }, timeout);
                    }),
                ]);
                const endTime = Date.now();
                const elapsedTime = endTime - startTime;
                
                localStorage.setItem('access', data.access);
                localStorage.setItem('refresh', data.refresh);
                localStorage.setItem('name', data.name);
                localStorage.setItem('uuid', data.uuid);
                localStorage.setItem('access-init-date', endTime - elapsedTime);
                localStorage.setItem('permissions', data.permissions);
    
                dispatch(onLogin({ name: data.name, uuid: data.uuid }));
                localStorage.removeItem('email');
                return;
            } catch (error) {
                if (retry === maxRetries) {
                    dispatch(onLogout('No se pudo iniciar sesión'));
                    setTimeout(() => {
                        dispatch(clearErrorMessage());
                    }, 10);
                }
            }
        }
    };

    const checkAuthToken = async () => {
        const token = localStorage.getItem('refresh');
        if (!token) return dispatch(onLogout());
        try {
            // Check if the token needs to be refreshed
            const initDate = parseInt(localStorage.getItem('access-init-date'));
            const currentDate = new Date().getTime();
            const tokenDurationInMilliseconds = 14 * 24 * 60 * 60 * 1000; // 14 days in milliseconds
            const tokenAge = currentDate - initDate;
    
            if (tokenAge > tokenDurationInMilliseconds) {
                // Perform the token refresh
                const { data } = await api.post('/users/token/refresh/');
                localStorage.setItem('access', data.access);
                localStorage.setItem('refresh', data.refresh);
                localStorage.setItem('access-init-date', new Date().getTime());
                dispatch(onLogin({ name: data.name, uuid: data.uuid }));
            } else {
                const name = localStorage.getItem('name');
                const uuid = localStorage.getItem('uuid');
    
                if (name && uuid) {
                    dispatch(onLogin({ name, uuid }));
                } else {
                    dispatch(onLogout());
                }
            }
    
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }

    return {
        // Properties
        errorMessage,
        status, 
        user,

        // Methods
        checkAuthToken,
        startLogin,
        startLogout

    }
}
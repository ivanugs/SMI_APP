import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { rutaSlice } from './slices/rutas/rutaSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        rutas: rutaSlice.reducer,
        
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
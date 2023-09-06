import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { rutaSlice } from './slices/rutas/rutaSlice';
import { commonSlice } from './slices/common/commonSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        rutas: rutaSlice.reducer,
        common: commonSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { rutaSlice } from './slices/rutas/rutaSlice';
import { commonSlice } from './slices/common/commonSlice';
import { hospitalesSlice } from './slices/hospitales/hospitalesSlice';
import { pacientesSlice } from './slices/pacientes/pacientesSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        rutas: rutaSlice.reducer,
        hospitales: hospitalesSlice.reducer,
        pacientes: pacientesSlice.reducer,
        common: commonSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
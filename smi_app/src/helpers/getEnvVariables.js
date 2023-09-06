export const getEnvVariables = () => {
    return {
        VITE_PROPUESTAS_API_URL: import.meta.env.VITE_PROPUESTAS_API_URL,
        PROPUESTAS_API_URL: import.meta.env.PROPUESTAS_API_URL
    };
};
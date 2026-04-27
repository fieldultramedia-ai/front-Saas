import apiClient from '../api/apiClient';

/**
 * Servicio de Autenticación - Producción
 */
const AuthService = {
    /**
     * Inicia sesión y persiste tokens.
     */
    login: async (email, password) => {
        // MOCK PARA PRUEBAS LOCALES (Sin backend)
        if (email === 'test@leadbook.app' && password === 'password123') {
            console.log('Utilizando login de prueba...');
            const mockData = {
                access: 'mock-access-token',
                refresh: 'mock-refresh-token',
                user: {
                    email: 'test@leadbook.app',
                    nombre: 'Usuario de Prueba',
                    is_staff: true
                }
            };
            localStorage.setItem('subzero_access', mockData.access);
            localStorage.setItem('subzero_refresh', mockData.refresh);
            localStorage.setItem('subzero_user', JSON.stringify(mockData.user));
            return mockData;
        }

        try {
            const response = await apiClient.post('/auth/login/', { email, password });
            const { access, refresh, user } = response.data;

            if (access) {
                localStorage.setItem('subzero_access', access);
                localStorage.setItem('subzero_refresh', refresh);
                localStorage.setItem('subzero_user', JSON.stringify(user || {}));
            }
            return response.data;
        } catch (error) {
            // Re-lanzamos el error procesado por el interceptor
            throw error;
        }
    },

    /**
     * Registro de nuevo usuario.
     */
    register: async (userData) => {
        // TODO: ELIMINAR MOCK PARA PRODUCCIÓN
        // MOCK PARA PRUEBAS LOCALES (Onboarding Flow)
        if (userData.email === 'onboarding@leadbook.app') {
            const mockData = {
                access: 'mock-access-token',
                refresh: 'mock-refresh-token',
                user: {
                    email: 'onboarding@leadbook.app',
                    nombre: userData.nombre || 'Nuevo Usuario',
                    is_staff: false
                }
            };
            localStorage.setItem('subzero_access', mockData.access);
            localStorage.setItem('subzero_refresh', mockData.refresh);
            localStorage.setItem('subzero_user', JSON.stringify(mockData.user));
            return mockData;
        }

        try {
            const response = await apiClient.post('/auth/register/', userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Obtiene el perfil completo del usuario.
     */
    getPerfil: async () => {
        if (localStorage.getItem('subzero_access') === 'mock-access-token') {
            const user = JSON.parse(localStorage.getItem('subzero_user') || '{}');
            if (user.email === 'onboarding@leadbook.app') {
                return {
                    nombre_inmobiliaria: '', // Empty triggers onboarding
                    logo_url: null,
                    telefono: ''
                };
            }
            return {
                nombre_inmobiliaria: 'Inmobiliaria Demo',
                logo_url: 'https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg',
                telefono: '123456789'
            };
        }
        const response = await apiClient.get('/auth/perfil/');
        return response.data;
    },

    /**
     * Limpia la sesión localmente.
     */
    logout: () => {
        localStorage.removeItem('subzero_access');
        localStorage.removeItem('subzero_refresh');
        localStorage.removeItem('subzero_user');
        // Redirigir al login
        window.location.href = '/login';
    },

    /**
     * Recupera el objeto de usuario activo.
     */
    getUser: () => {
        try {
            return JSON.parse(localStorage.getItem('subzero_user') || '{}');
        } catch {
            return {};
        }
    },

    /**
     * Verifica si hay una sesión activa.
     */
    isAuthenticated: () => {
        return !!localStorage.getItem('subzero_access');
    }
};

export default AuthService;

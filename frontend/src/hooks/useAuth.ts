// useAuth.ts (exemplo com Zustand)
import { create } from 'zustand';

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
    isAuthenticated: false,
    token: null,
    login: async (email, password) => {
        try {
            // chamando /api/users/token/ (não /api/token/)
            const resp = await fetch('http://127.0.0.1:8000/api/users/token/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }), // <--- "email", não "username"
            });
            if (!resp.ok) {
                throw new Error('Login failed');
            }
            const data = await resp.json();
            // data = { access, refresh }
            set({ isAuthenticated: true, token: data.access });
        } catch (error) {
            console.error(error);
            set({ isAuthenticated: false, token: null });
        }
    },
    signup: async (name, email, password) => {
        try {
            const resp = await fetch('http://127.0.0.1:8000/api/users/signup/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password,
                    bio: "",
                    avatar: null
                }),
            });
            if (!resp.ok) {
                throw new Error('Signup failed');
            }
            // Depois de criar, faça login automaticamente
            await resp.json();
            await useAuth.getState().login(email, password);
        } catch (error) {
            console.error(error);
        }
    },
    logout: () => {
        set({ isAuthenticated: false, token: null });
    },
}));

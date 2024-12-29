import { create } from 'zustand';

interface AuthState {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
    isAuthenticated: false,
    login: async (email: string, password: string) => {
        // TODO: Implement actual login logic
        set({ isAuthenticated: true });
    },
    signup: async (name: string, email: string, password: string) => {
        // TODO: Implement actual signup logic
        set({ isAuthenticated: true });
    },
    logout: () => set({ isAuthenticated: false }),
}));
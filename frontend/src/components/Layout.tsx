import React from 'react';
import { Twitter } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function Layout({ children }: { children: React.ReactNode }) {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        window.location.href = '/login'; // Redireciona para a página de login
    };

    return (
        <div className="min-h-screen bg-black">
            <div className="container mx-auto flex min-h-screen">
                {/* Sidebar */}
                <aside className="w-64 border-r border-gray-800 p-4">
                    <div className="mb-8">
                        <Twitter className="h-8 w-8 text-white" />
                    </div>
                    <nav className="space-y-4">
                        {['Home', 'Explore', 'Notifications', 'Messages', 'Profile'].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="block text-xl text-white hover:bg-gray-900 rounded-full px-4 py-2"
                            >
                                {item}
                            </a>
                        ))}
                    </nav>
                    <button
                        onClick={handleLogout}
                        className="mt-8 w-[60%] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                        Sair
                    </button>
                </aside>

                {/* Main Content */}
                <main className="flex-1 border-r border-gray-800">{children}</main>

                {/* Right Sidebar */}
                <aside className="w-80 p-4">
                    <div className="bg-gray-900 rounded-2xl p-4">
                        <h2 className="text-xl font-bold text-white mb-4">What's happening</h2>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="text-white">
                                    <p className="text-sm text-gray-400">Trending</p>
                                    <p className="font-bold">Trending Topic {i}</p>
                                    <p className="text-sm text-gray-400">10.{i}K Tweets</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

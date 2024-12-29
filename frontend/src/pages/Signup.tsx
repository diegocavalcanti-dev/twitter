import React, { useState } from 'react';
import { Twitter } from 'lucide-react';

export function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement signup logic
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-full max-w-md space-y-8 p-6">
                <div className="flex justify-center">
                    <Twitter className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-center text-3xl font-bold text-white">Create your account</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address"
                            className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white rounded-full font-bold hover:bg-blue-600"
                    >
                        Sign up
                    </button>
                </form>

                <p className="text-center text-gray-500">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
}
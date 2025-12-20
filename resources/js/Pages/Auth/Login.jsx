import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Ocean Explorer | Login" />

            {/* Ocean Background */}
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#001f3f] via-[#003f7f] to-[#0066cc] relative overflow-hidden px-4">

                {/* Floating bubbles */}
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                    <div className="absolute top-20 left-10 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
                    <div className="absolute top-1/3 right-16 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-white/20 rounded-full blur-lg"></div>
                </div>

                {/* Login Card */}
                <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 text-white">

                    {/* Logo / Title */}
                    <div className="text-center mb-6">
                        <div className="text-5xl mb-2"></div>
                        <h1 className="text-3xl font-bold tracking-wide">
                            Ocean Explorer
                        </h1>
                        <p className="text-cyan-200 text-sm mt-1">
                            Dive into the deep blue sea
                        </p>
                    </div>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-300 text-center">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <InputLabel htmlFor="email" value="Email" className="text-white" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full bg-white/20 border-white/30 text-white placeholder-white/60 focus:border-cyan-400 focus:ring-cyan-400"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="explorer@email.com"
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        {/* Password */}
                        <div>
                            <InputLabel htmlFor="password" value="Password" className="text-white" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full bg-white/20 border-white/30 text-white placeholder-white/60 focus:border-cyan-400 focus:ring-cyan-400"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* Remember */}
                        <div className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span className="ms-2 text-sm text-cyan-100">
                                Remember me
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between">
                                <Link
                                    href={route('register')}
                                    className="text-sm text-cyan-200 hover:text-white underline"
                                >
                                    Register
                                </Link>
                            
                            <PrimaryButton
                                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-6 py-3 rounded-xl font-bold"
                                disabled={processing}
                            >
                                 Log In
                            </PrimaryButton>
                        </div>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-xs text-cyan-200 mt-6">
                        © {new Date().getFullYear()} Ocean Explorer
                    </p>
                </div>
            </div>
        </GuestLayout>
    );
}
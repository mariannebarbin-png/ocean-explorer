import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Ocean Explorer | Register" />

            {/* 🌊 Ocean Background */}
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#001f3f] via-[#003f7f] to-[#0066cc] relative overflow-hidden px-4">

                {/* Floating bubbles */}
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                    <div className="absolute top-16 left-12 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
                    <div className="absolute top-1/3 right-16 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-24 left-1/3 w-20 h-20 bg-white/20 rounded-full blur-lg"></div>
                </div>

                {/* Register Card */}
                <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 text-white">

                    {/* Title */}
                    <div className="text-center mb-6">
                        <div className="text-5xl mb-2">🐠</div>
                        <h1 className="text-3xl font-bold tracking-wide">
                            Join Ocean Explorer
                        </h1>
                        <p className="text-cyan-200 text-sm mt-1">
                            Start your journey beneath the waves
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <InputLabel htmlFor="name" value="Name" className="text-white" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full bg-white/20 border-white/30 text-white placeholder-white/60"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Ocean Explorer"
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        {/* Email */}
                        <div>
                            <InputLabel htmlFor="email" value="Email" className="text-white" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full bg-white/20 border-white/30 text-white placeholder-white/60"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="explorer@email.com"
                                required
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
                                className="mt-1 block w-full bg-white/20 border-white/30 text-white"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                                className="text-white"
                            />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full bg-white/20 border-white/30 text-white"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData('password_confirmation', e.target.value)
                                }
                                placeholder="••••••••"
                                required
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between mt-6">
                            <Link
                                href={route('login')}
                                className="text-sm text-cyan-200 hover:text-white underline"
                            >
                                Already have an account?
                            </Link>

                            <PrimaryButton
                                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-6 py-3 rounded-xl font-bold"
                                disabled={processing}
                            >
                                🌊 Register
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

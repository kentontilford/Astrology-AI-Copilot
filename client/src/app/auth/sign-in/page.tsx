import { SignIn } from '@clerk/nextjs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In - Astrology AI Copilot',
  description: 'Sign in to your Astrology AI Copilot account',
};

export default function SignInPage() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back to Astrology AI Copilot
          </p>
        </div>
        
        <div className="mt-8">
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700',
                footerActionLink: 'text-indigo-600 hover:text-indigo-500',
              },
            }}
            routing="path"
            path="/auth/sign-in"
            signUpUrl="/auth/sign-up"
            redirectUrl="/dashboard/personal"
          />
        </div>
      </div>
    </div>
  );
}
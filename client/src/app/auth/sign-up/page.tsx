import { SignUp } from '@clerk/nextjs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - Astrology AI Copilot',
  description: 'Create a new Astrology AI Copilot account',
};

export default function SignUpPage() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Start your astrological journey with Astrology AI Copilot
          </p>
        </div>
        
        <div className="mt-8">
          <SignUp 
            appearance={{
              elements: {
                formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700',
                footerActionLink: 'text-indigo-600 hover:text-indigo-500',
              },
            }}
            routing="path"
            path="/auth/sign-up"
            signInUrl="/auth/sign-in"
            redirectUrl="/dashboard/personal"
          />
        </div>
      </div>
    </div>
  );
}
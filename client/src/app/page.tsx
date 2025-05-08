import Link from 'next/link';
import { SignedIn, SignedOut } from '@clerk/nextjs';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center flex flex-col">
        <h1 className="text-5xl font-bold mb-8 text-center">
          Astrology AI Copilot
        </h1>
        <p className="text-xl mb-12 text-center max-w-2xl">
          Personalized astrological insights and guidance powered by artificial intelligence.
        </p>
        
        <div className="flex gap-4 mb-12">
          <SignedIn>
            <Link
              href="/dashboard/personal"
              className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Go to Dashboard
            </Link>
          </SignedIn>
          
          <SignedOut>
            <Link
              href="/auth/sign-in"
              className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Sign In
            </Link>
            <Link
              href="/auth/sign-up"
              className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition"
            >
              Sign Up
            </Link>
          </SignedOut>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Personal Growth</h2>
            <p>Understand your natal chart and current transits to navigate life's journey with confidence.</p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Relationships</h2>
            <p>Explore relationship dynamics through composite charts and AI-driven compatibility insights.</p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">AI Guidance</h2>
            <p>Chat with our astrological AI copilot for personalized guidance based on your unique chart.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
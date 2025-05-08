import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from '../hooks/useAuth';
import { ProfilesProvider } from '../hooks/useProfiles';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Astrology AI Copilot',
  description: 'Personalized astrological insights powered by AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <AuthProvider>
        <ProfilesProvider>
          <html lang="en">
            <body className={inter.className}>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </div>
            </body>
          </html>
        </ProfilesProvider>
      </AuthProvider>
    </ClerkProvider>
  );
}
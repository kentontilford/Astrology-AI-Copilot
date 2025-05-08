import { Metadata } from 'next';
import ProfilesPage from './ProfilesPage';

export const metadata: Metadata = {
  title: 'Birth Profiles - Astrology AI Copilot',
  description: 'Manage your birth profiles and charts',
};

export default function Page() {
  return <ProfilesPage />;
}
import { Metadata } from 'next';
import PersonalDashboardPage from './PersonalDashboardPage';

export const metadata: Metadata = {
  title: 'Personal Dashboard - Astrology AI Copilot',
  description: 'View your personal astrological insights and natal chart',
};

export default function Page() {
  return <PersonalDashboardPage />;
}
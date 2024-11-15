import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

import Navigation from './components/Navigation';
import EventsList from './components/EventsList';
import CreateEvent from './components/CreateEvent';
import UserProfile from './components/UserProfile';
import Certificates from './components/Certificates';
import AnalyticsDashboard from './components/analytics/AnalyticsDashboard';

function App() {
  return (
    <TonConnectUIProvider manifestUrl="https://ton-connect.manifest.json">
      <I18nextProvider i18n={i18n}>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Navigation />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<EventsList />} />
                <Route path="/create-event" element={<CreateEvent />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/certificates" element={<Certificates />} />
                <Route path="/analytics" element={<AnalyticsDashboard />} />
              </Routes>
            </main>
          </div>
        </Router>
      </I18nextProvider>
    </TonConnectUIProvider>
  );
}
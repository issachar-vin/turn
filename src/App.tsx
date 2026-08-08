import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { PageShell } from './components/layout/PageShell';

const HomePage = lazy(() => import('./pages/HomePage'));
const GamePage = lazy(() => import('./pages/GamePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export default function App() {
  return (
    <BrowserRouter>
      <PageShell>
        <Suspense fallback={<div className="min-h-[60svh]" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:slug" element={<GamePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </PageShell>
    </BrowserRouter>
  );
}

import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import usePageTracking from './utils/usePageTracking';
import ScrollToTop from './utils/ScrollToTop';

function AppContent() {
  usePageTracking();
  return (
    <>
      <ScrollToTop />
      <AppRoutes />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

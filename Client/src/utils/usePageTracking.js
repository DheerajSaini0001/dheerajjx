import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = 'G-5BGTFXVK8P';

/**
 * Custom hook to track page views in GA4 on every route change.
 * Since React Router handles navigation client-side, GA4 won't
 * automatically detect page changes — this hook sends a
 * page_view event on every location change.
 */
const usePageTracking = () => {
    const location = useLocation();

    useEffect(() => {
        if (typeof window.gtag === 'function') {
            window.gtag('config', GA_MEASUREMENT_ID, {
                page_path: location.pathname + location.search,
            });
        }
    }, [location]);
};

export default usePageTracking;

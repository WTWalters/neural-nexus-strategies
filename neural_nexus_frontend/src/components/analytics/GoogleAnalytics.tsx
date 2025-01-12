// Path: neural_nexus_frontend/src/components/analytics/GoogleAnalytics.tsx

import Script from "next/script";

const GoogleAnalytics = () => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-6MV9BW7RG6"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6MV9BW7RG6');
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;

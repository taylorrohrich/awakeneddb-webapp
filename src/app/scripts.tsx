import Script from "next/script";

export function GAScript() {
  return (
    <>
      <Script
        id="ga"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_ID}`}
      />
      <Script id="ga-loader">
        {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date());   gtag('config', '${process.env.GA_ID}');`}
      </Script>
    </>
  );
}

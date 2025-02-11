import { Fragment } from "react";

export default function Analytics({ id }: { id?: string }) {
  if (!id) {
    console.warn(
      "No id for Analytics feature",
      (import.meta.env.VITE_GA as string) ?? process.env.VITE_GA,
    );
    return null;
  }

  return (
    <Fragment>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />
      <script
        async
        id="gtag-init"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${id}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </Fragment>
  );
}

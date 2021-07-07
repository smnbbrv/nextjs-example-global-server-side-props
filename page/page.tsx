import Head from 'next/head';
import React, { FunctionComponent } from 'react';

// page props that can be extended by every page
export interface PageProps {
  // this object contains the data from server-side-props.ts
  page: {
    // any data can be passed in
    serverSideData: string;
  };
}

// page wrapper, that receives the global page data and renders the page inside
const PageWrapper: FunctionComponent<PageProps> = ({ page, children }) => {
  return (
    <>
      {/* good place to insert here global providers, scripts etc */}
      {/* or common content as well */}

      <Head>
        {/* e.g. set the header from serverSideProps data */}
        <title>{page.serverSideData}</title>
      </Head>

      {children}
    </>
  );
};

// a page factory that wraps a provided page component into a page wrapper
export function Page<T extends PageProps>(C: FunctionComponent<T>): FunctionComponent<T> {
  const Wrapped: FunctionComponent<T> = props => (
    <PageWrapper {...props}>
      <C {...props} />
    </PageWrapper>
  );

  Wrapped.displayName = 'NextPage';

  return Wrapped;
}

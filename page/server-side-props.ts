import { GetServerSideProps } from 'next';
import { PageProps } from './page';

// this is the data that is passed into the serverSideProps of each particular page
// useful in case when the amount is huge or contains sensitive data and cannot be sent to the client in PageProps
export interface ServerSideData {
  dataForSSR: string;
}

// utility type
export interface ServerSidePropsParams<T> { props: T, data: ServerSideData, context: Parameters<GetServerSideProps>[0] }

// factory for each page's serverSideProps
export const createServerSideProps = <T extends PageProps>(fn?: (params: ServerSidePropsParams<T>) => ReturnType<GetServerSideProps>): GetServerSideProps => {
  return async (context) => {
    try {
      // good place to e.g. set cookie
      // context.res.setHeader('Set-Cookie', '');

      // or to return redirect based on some logic

      // etc.

      // fill in the global data for the page
      const props = {
        page: {
          serverSideData: 'global data you want to pass to the global page component',
        },
      } as T;

      // here, if the callback with custom serverSideProps is provided, call it and return what it did
      if (fn) {
        // also possible to do some post-logic after `fn` call before returning the result
        return fn({ props, data: { dataForSSR: 'data for custom serverSideProps' }, context });
      }

      return { props };
    } catch (ex) {
      // good place to handle global errors

      console.error(ex);

      throw ex;
    }
  };
};

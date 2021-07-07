import { FunctionComponent } from 'react';
import { Page, PageProps } from '../page/page';
import { createServerSideProps } from '../page/server-side-props';
import styles from '../styles/Home.module.css';

export interface HomePageProps extends PageProps {
  someCustomParameter: string;
}

export const getServerSideProps = createServerSideProps<HomePageProps>(async ({ props, data: { dataForSSR } }) => {
  props.someCustomParameter = `data for SSR recieved and proxied to component: "${dataForSSR}"`;

  return {
    props,
  };
});


const HomePage: FunctionComponent<HomePageProps> = Page(props => {
  return (
    <div className={styles.container}>
      <b>someCustomParameter</b>{props.someCustomParameter}

      <br />
      <br />

      <b>original page parameter</b> {props.page.serverSideData}
    </div>
  )
});

export default HomePage;

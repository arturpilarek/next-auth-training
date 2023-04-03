import { Provider } from 'next-auth/client';

import Layout from '../components/layout/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    // Provider is a wrapper component that allows us to access the session object in all components, and preventing the need to pass it down manually
    // Besides that it preventes sending redundant requests to the server
    <Provider session={pageProps.session}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </Provider>
  );
}

export default MyApp;

import asLazyPage from 'hocs/asLazyPage';

const Home = asLazyPage(() => import('pages/home'));

export { Home };

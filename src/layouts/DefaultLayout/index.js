import Header from './Header';

import PrivateRoute from '@/components/PrivateRoute';

function DefaultLayout({ children }) {
    return (
        <PrivateRoute>
            <Header />
            <div>{children}</div>
        </PrivateRoute>
    );
}

export default DefaultLayout;

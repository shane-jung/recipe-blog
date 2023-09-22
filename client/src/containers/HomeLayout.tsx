import { Outlet } from 'react-router-dom';

import AppNavbar from '../components/AppNavbar';

export default function HomeLayout() {
    return (
        <div>
            <AppNavbar />
            <div className="px-8">
                <Outlet />
            </div>
        </div>
    );
}

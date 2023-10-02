import { Outlet } from 'react-router-dom';

export default function AuthScreen() {
    return (
        <div className="h-screen w-full bg-white">
            <Outlet />
        </div>
    );
}

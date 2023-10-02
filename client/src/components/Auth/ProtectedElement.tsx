import { useEffect, useState } from 'react';

export default function ProtectedElement({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState({} as any);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user') || '{}'));
    }, []);

    return user?.isAdmin ? children : <></>;
}

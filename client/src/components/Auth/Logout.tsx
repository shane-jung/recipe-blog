import axios from '@/axios';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await axios.post('/users/logout');
            console.log(res);
            if (res.status === 200) {
                localStorage.removeItem('user');
                navigate('/auth/login');
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <button
            role="button"
            onClick={handleLogout}
            className="btn btn-secondary"
        >
            Logout
        </button>
    );
}

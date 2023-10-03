import axios from '@/axios';
import FormElement from '@/components/Forms/FormElement';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const schema = yup.object({
    email: yup
        .string()
        .required('Required')
        .email('Must be a valid email address'),
    password: yup
        .string()
        .required('Required')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,32}$/,
            'Must contain at least one uppercase letter, one lowercase letter, one number and one special character, and be between 8 and 32 characters',
        ),
});

export default function Login() {
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            navigate('/');
        }
    }, []);

    const navigate = useNavigate();
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: any) => {
        try {
            const res = await axios.post('/users/login', data);
            if (res.status === 200) {
                localStorage.setItem('user', JSON.stringify(res.data));
                navigate('/');
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="card card-normal mx-auto mt-8 max-w-xl shadow-md">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-center text-2xl">Login</h2>

                    <FormElement
                        control={control}
                        name="email"
                        label="Email"
                        type={'email'}
                        placeholder={'Email Address'}
                    />

                    <FormElement
                        control={control}
                        name="password"
                        label="Password"
                        type={'password'}
                        placeholder={'Password'}
                    />
                    <div className="card-actions">
                        <button
                            role="submit"
                            className="btn btn-primary mx-auto"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

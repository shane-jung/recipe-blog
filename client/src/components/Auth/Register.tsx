import axios from '@/axios';
import FormElement from '@/components/Forms/FormElement';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const schema = yup.object({
    name: yup.string().required('Required'),
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
    const navigate = useNavigate();
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: any) => {
        try {
            const res = await axios.post('/users/register', data);
            if (res.status === 200) navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="card mx-auto max-w-2xl shadow-md">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card-header">
                    <h2 className="card-title">Register</h2>
                </div>
                <div className="card-body">
                    <FormElement
                        control={control}
                        name="name"
                        label="Name"
                        type={'name'}
                        placeholder={'Full Name'}
                    />

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
                </div>
                <div className="card-footer">
                    <button className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    );
}

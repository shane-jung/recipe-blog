import axiosClient from '../axios';
import { useRequestProcessor } from '../query';

export default function ViewRecipePage() {
    const { query } = useRequestProcessor();

    const {
        data: users,
        isLoading,
        isError,
    } = query(
        'recipes',
        () => axiosClient.get('/recipes').then((res) => res.data),
        { enabled: true },
    );

    console.log(users, isLoading, isError);
    return <p>Recipe</p>;
}

async function recipes() {
    const { query } = useRequestProcessor();

    const {
        data: users,
        isLoading,
        isError,
    } = query(
        'users',
        () => axiosClient.get('/users').then((res) => res.data),
        { enabled: true },
    );

    return <div>"hello"</div>;
}

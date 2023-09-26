import { SubmitHandler } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import axios from '../axios';
import RecipeForm from '../components/RecipeForm';
import { useRequestProcessor } from '../query';
import { Recipe } from '../types';

export default function EditRecipePage() {
    const navigate = useNavigate();
    const { query, mutate } = useRequestProcessor();
    const slug = useLocation().pathname.split('/')[2];
    const {
        data: recipe,
        isLoading,
        isError,
    }: {
        data: any;
        isLoading: boolean;
        isError: boolean;
    } = query(
        ['recipes', slug],
        () => axios.get(`/recipes/${slug}`).then((res) => res.data),
        {
            enabled: true,
        },
    );

    const onSubmit: SubmitHandler<Recipe> = async (data) => {
        try {
            mutate(['recipes', slug], () =>
                axios.put(`/recipes/${slug}`, data),
            );
        } catch (err) {
            console.error(err);
        }
    };

    return <RecipeForm initialValues={recipe} onSubmit={onSubmit} />;
}

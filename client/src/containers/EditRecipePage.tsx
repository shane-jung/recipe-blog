import { SubmitHandler } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import axios from '../axios';
import RecipeForm from '../components/RecipeForm';
import { useRequestProcessor } from '../query';
import { Recipe } from '../types';

export default function EditRecipePage() {
    const navigate = useNavigate();
    const slug = useLocation().pathname.split('/')[2];

    const { query, mutate } = useRequestProcessor();

    const { data: recipe }: { data: any } = query(
        ['recipes', slug],
        () => axios.get(`/recipes/${slug}`).then((res) => res.data),
        {
            enabled: true,
        },
    );

    const mutationObject = mutate(
        ['recipes', slug],
        (data: Recipe) => {
            return axios.put(`recipes/${recipe.slug}`, data);
        },
        {
            onSuccess: ({ data }: any) => navigate(`/recipes/${data.slug}`),
        },
    );

    const onSubmit: SubmitHandler<Recipe> = (data: Recipe) =>
        mutationObject.mutate(data);

    return (
        <div>
            <h2 className="mb-2 text-center text-3xl">Edit Recipe</h2>
            <RecipeForm initialValues={recipe} onSubmit={onSubmit} />
        </div>
    );
}

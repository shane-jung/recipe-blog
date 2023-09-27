import { useLocation, useNavigate } from 'react-router-dom';

import axios from '../axios';
import ConfirmDelete from '../components/Misc/ConfirmDelete';
import { useRequestProcessor } from '../query';
import { Recipe } from '../types';

export default function ViewRecipePage() {
    const { query } = useRequestProcessor();
    const slug = useLocation().pathname.split('/').pop();
    const {
        data: recipe,
    }: {
        data: any;
    } = query(
        ['recipes', slug],
        () => axios.get(`/recipes/${slug}`).then((res) => res.data),
        {
            enabled: true,
        },
    );

    return (
        <div className="prose mx-auto max-w-5xl">
            <h2 className="mb-4 text-5xl font-normal">{recipe.title}</h2>
            <h3 className="text-2xl font-thin">{recipe.preview}</h3>
            <div className="flex gap-4">
                <a href={`${slug}/edit`}>Edit this Recipe</a>
                <DeleteRecipe recipe={recipe} />
            </div>

            <img className="w-full" src={recipe.image} alt={recipe.title}></img>
            <div>
                {recipe.body.map((section: any, index: number) => (
                    <div key={index}>
                        <h3 className="text-2xl">{section.name}</h3>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: section.content,
                            }}
                        ></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function DeleteRecipe({ recipe }: { recipe: Recipe }) {
    const navigate = useNavigate();
    const { mutate } = useRequestProcessor();
    const mutationObject = mutate(
        ['recipes'],
        () => {
            return axios.delete(`recipes/${recipe._id}`);
        },
        {
            onSuccess: () => {
                navigate(`/recipes`);
            },
        },
    );
    return (
        <ConfirmDelete
            action={async () => mutationObject.mutate(null)}
            message={'Are you sure you want to delete this recipe?'}
            actionString={"Yes, I'm sure."}
        >
            Delete this Recipe
        </ConfirmDelete>
    );
}

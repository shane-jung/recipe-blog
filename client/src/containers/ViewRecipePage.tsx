import { FiEdit } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

import axios from '../axios';
import DeleteRecipe from '../components/Recipes/DeleteRecipe';
import { useRequestProcessor } from '../query';

export default function ViewRecipePage() {
    const { query } = useRequestProcessor();
    const slug = useLocation().pathname.split('/').pop();
    const {
        data: recipe,
    }: {
        data: any;
    } = query(['recipes', slug], () =>
        axios.get(`/recipes/${slug}`).then((res) => res.data),
    );

    return (
        <div className="prose mx-auto max-w-5xl">
            <div className="relative">
                <h2 className="mb-4 mt-0 text-5xl font-normal">
                    {recipe.title}
                </h2>
                <h3 className="text-2xl font-thin">{recipe.preview}</h3>
                <RecipeToolbar recipe={recipe} />
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

function RecipeToolbar({ recipe }: { recipe: any }) {
    return (
        <div className="absolute right-8 top-0 flex gap-2 ">
            <Link to={`edit`} className="btn btn-info btn-sm">
                <FiEdit className="text-lg text-white" />
            </Link>
            <DeleteRecipe recipe={recipe} />
        </div>
    );
}

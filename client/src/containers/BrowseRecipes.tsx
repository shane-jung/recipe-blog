import { Link } from 'react-router-dom';

import axios from '../axios';
import { useRequestProcessor } from '../query';

export default function BrowseRecipes() {
    const { query } = useRequestProcessor();
    const { data: recipes }: { data: any } = query(
        ['recipes'],
        () => axios.get(`/recipes`).then((res) => res.data),
        { enabled: true },
    );
    console.log(recipes);
    return (
        <div>
            <Link
                className="btn-primary btn z-100 fixed right-10 top-20"
                to="create"
            >
                Create Recipe
            </Link>
            <h2 className="mb-12 text-center text-3xl">All Recipes</h2>
            <div className="mx-auto grid grid-cols-2 justify-center gap-x-4 gap-y-16 lg:grid-cols-4">
                {recipes.map((recipe: any, index: number) => (
                    <div
                        key={index}
                        className="card bg-base-100 mx-auto w-80 shadow-xl"
                    >
                        <figure>
                            <img src={recipe.image} alt={recipe.title} />
                        </figure>
                        <div className="card-body">
                            <h3 className="card-title">{recipe.title}</h3>
                            <p>{recipe.preview}</p>
                            <div className="card-actions flex items-center justify-end">
                                {recipe.tags?.meal?.length > 0 && (
                                    <div className="badge badge-info px-3 py-3">
                                        <span className=" font-medium">
                                            {recipe.tags.meal[0].label}
                                        </span>
                                    </div>
                                )}
                                {recipe.tags?.ingredient?.length > 0 && (
                                    <div className="badge badge-warning px-3 py-3">
                                        <span className=" font-medium">
                                            {recipe.tags?.ingredient[0].label}
                                        </span>
                                    </div>
                                )}
                                <Link
                                    to={`${recipe.slug}`}
                                    className="btn btn-link"
                                >
                                    View Recipe
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

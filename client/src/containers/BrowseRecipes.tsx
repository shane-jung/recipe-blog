import ProtectedElement from '@/components/Auth/ProtectedElement';
import Breadcrumbs from '@/components/Misc/Breadcrumbs';
import { useEffect } from 'react';
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

    useEffect(() => {
        document.title = `Browse Recipes | shanyefood`;
    }, []);
    return (
        <div className="mx-auto p-8 2xl:px-32">
            <Breadcrumbs path={[{ label: 'Browse Recipes' }]} />
            <ProtectedElement>
                <Link
                    className="btn-primary btn z-100 fixed right-10 top-20"
                    to="create"
                >
                    Create Recipe
                </Link>
            </ProtectedElement>
            <h2 className="mb-12 text-center text-3xl">All Recipes</h2>
            <div className="mx-auto grid grid-cols-1 justify-center gap-x-6 gap-y-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {recipes.map((recipe: any, index: number) => (
                    <div
                        key={index}
                        className="card bg-base-100 xl:w-84 mx-auto w-full shadow-xl md:w-full"
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
                                        <Link
                                            to={`/recipes/categories/meals/${recipe.tags.meal[0].label}`}
                                            className=" font-medium text-gray-100"
                                        >
                                            {recipe.tags.meal[0].label}
                                        </Link>
                                    </div>
                                )}
                                {recipe.tags?.ingredient?.length > 0 && (
                                    <div className="badge badge-warning px-3 py-3">
                                        <Link
                                            to={`/recipes/categories/ingredients/${recipe.tags.ingredient[0].label}`}
                                            className=" font-medium text-gray-100"
                                        >
                                            {recipe.tags?.ingredient[0].label}
                                        </Link>
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

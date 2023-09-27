import { Link } from 'react-router-dom';

import axios from '../axios';
import { useRequestProcessor } from '../query';

export default function BrowseRecipes() {
    const { query } = useRequestProcessor();
    const { data: recipes }: { data: any } = query(['recipes'], () =>
        axios.get(`/recipes`).then((res) => res.data),
    );
    return (
        <div>
            <Link className="btn-primary btn fixed right-10 top-20" to="create">
                Create Recipe
            </Link>
            <h2 className="mb-12 text-center text-3xl">All Recipes</h2>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
                {recipes.map((recipe: any, index: number) => (
                    <div
                        key={index}
                        className="card bg-base-100 image-full w-96 shadow-xl"
                    >
                        <figure>
                            <img src={recipe.image} alt={recipe.title} />
                        </figure>
                        <div className="card-body ">
                            <h3 className="card-title">{recipe.title}</h3>
                            <p>{recipe.preview}</p>
                            <div className="card-actions justify-end">
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

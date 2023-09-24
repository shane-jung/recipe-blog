import axios from '../axios';
import { useRequestProcessor } from '../query';

export default function BrowseRecipes() {
    const { query } = useRequestProcessor();
    const {
        data: recipes,
        isLoading,
        isError,
    }: {
        data: any;
        isLoading: boolean;
        isError: boolean;
    } = query(
        ['recipes'],
        () => axios.get(`/recipes`).then((res) => res.data),
        {
            enabled: true,
        },
    );
    return (
        <div>
            <a
                className="btn-primary btn fixed right-10 top-20"
                href="recipes/create"
            >
                Create Recipe
            </a>
            <p>Browse Recipes</p>
            <div className="grid grid-cols-3 gap-2">
                {recipes.map((recipe: any, index: number) => (
                    <div
                        key={index}
                        className="card bg-base-100 w-96 shadow-xl"
                    >
                        <div className="card-body">
                            <h3 className="card-title">{recipe.title}</h3>
                            <p>{recipe.preview}</p>
                            <div className="card-actions justify-end">
                                <a
                                    href={`recipes/${recipe.slug}`}
                                    className="btn btn-link"
                                >
                                    View Recipe
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

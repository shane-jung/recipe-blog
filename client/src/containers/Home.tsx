import axios from '@/axios';
import { useRequestProcessor } from '@/query';
import { Link } from 'react-router-dom';

export default function HomePage() {
    const { query } = useRequestProcessor();

    const {
        data: recipes,
        error,
        isLoading,
        isSuccess,
    }: {
        data: any;
        error: any;
        isLoading: boolean;
        isSuccess: boolean;
    } = query(
        ['recipes'],
        () => axios.get('/recipes').then((res) => res.data),
        { enabled: true },
    );

    if (error) return <p>Error</p>;
    if (isLoading) return <p>Loading...</p>;
    return (
        <div className="grid lg:grid-cols-12">
            <div className="lg:col-span-8">
                <figure>
                    <img
                        src={recipes[0].image}
                        alt={recipes[0].title}
                        className="w-full"
                    />
                </figure>
            </div>
            <div className="prose prose-stone col-span-4 flex flex-col justify-center p-4">
                <h2>
                    <Link
                        to={`/recipes/${recipes[0].slug}`}
                        className="text-4xl font-normal no-underline"
                    >
                        {recipes[0].title}
                    </Link>
                </h2>
                <h3 className="font-thin">
                    {recipes[0].preview.substring(0, 100)}
                </h3>
                <div className="btn-group mx-auto text-center">
                    <Link
                        role="button"
                        to={`recipes/${recipes[0].slug}`}
                        className="btn btn-primary"
                    >
                        View Recipe
                    </Link>
                    <Link
                        role="button"
                        to={`recipes`}
                        className="btn btn-outline btn-primary"
                    >
                        Explore all recipes
                    </Link>
                </div>
            </div>

            <div className="col-span-12 py-24">
                <h2 className="text-3xl font-normal">Latest Recipes</h2>
                <div className="carousel rounded-box  space-x-4 p-4">
                    {recipes.map((recipe: any) => (
                        <div className="carousel-item" key={recipe._id}>
                            <img
                                src={recipe.image}
                                className="rounded-box h-72"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

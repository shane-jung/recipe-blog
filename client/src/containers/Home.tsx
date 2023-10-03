import axios from '@/axios';
import { useRequestProcessor } from '@/query';
import { useEffect } from 'react';
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

    useEffect(() => {
        document.title = `Home | shanyefood`;
    }, []);

    if (error) return <p>Error</p>;
    if (isLoading) return <p>Loading...</p>;
    return (
        <div className="grid lg:grid-cols-12">
            <div className="lg:col-span-7">
                <figure>
                    <img
                        src={recipes[6].image}
                        alt={recipes[6].title}
                        className="w-full"
                    />
                </figure>
            </div>
            <div className="prose prose-stone col-span-5 flex flex-col justify-center p-12">
                <div className="mb-16">
                    <h2>
                        <Link
                            to={`/recipes/${recipes[6].slug}`}
                            className="text-4xl font-normal no-underline"
                        >
                            {recipes[6].title}
                        </Link>
                    </h2>
                    <h3 className="font-thin">{recipes[6].preview}</h3>
                </div>
                <div className="btn-group mx-auto text-center">
                    <Link
                        role="button"
                        to={`recipes/${recipes[6].slug}`}
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

            <div className="col-span-12 py-16">
                <h2 className="mb-8 text-center text-3xl font-medium">
                    Latest Recipes
                </h2>
                <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                    {recipes.slice(0, 6).map((recipe: any) => (
                        <div
                            className=" card bg-base-100 image-full shadow-xl"
                            key={recipe._id}
                        >
                            <figure>
                                <img src={recipe.image} alt={recipe.title} />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{recipe.title}</h2>
                                <p>{recipe.preview}</p>
                                <div className="card-actions">
                                    <Link
                                        role="button"
                                        to={`recipes/${recipe.slug}`}
                                        className="btn btn-primary"
                                    >
                                        View Recipe
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

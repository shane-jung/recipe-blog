import axios from '@/axios';
import Breadcrumbs from '@/components/Misc/Breadcrumbs';
import DeleteRecipe from '@/components/Recipes/DeleteRecipe';
import { useRequestProcessor } from '@/query';
import { FiEdit } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

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
        { enabled: true },
    );
    console.log(recipe.body);
    return (
        <div className="prose mx-auto max-w-5xl ">
            <div className="relative flex items-center justify-between">
                <Breadcrumbs
                    path={[
                        {
                            label: 'Browse Recipes',
                            link: '/recipes',
                        },
                        {
                            label: recipe.title,
                        },
                    ]}
                />
                <RecipeToolbar recipe={recipe} />
            </div>
            <div>
                <h2 className="mb-4 mt-0 text-5xl font-normal">
                    {recipe.title}
                </h2>
                <h3 className="text-2xl font-thin">{recipe.preview}</h3>
            </div>
            <img className="w-full" src={recipe.image} alt={recipe.title}></img>

            <div>
                {recipe.tags.meal?.map((tag: any) => (
                    <span
                        className="tag badge badge-primary mr-2"
                        key={tag._id}
                    >
                        {tag.label}
                    </span>
                ))}

                {recipe.tags.ingredient?.map((tag: any) => (
                    <span
                        className="tag badge badge-secondary mr-2"
                        key={tag._id}
                    >
                        {tag.label}
                    </span>
                ))}
            </div>

            <div>
                {recipe.body.map((section: any) => {
                    return section['type'] === 'richText' ? (
                        <div key={section._id}>
                            <h3 className="text-2xl">{section.name}</h3>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: section.content,
                                }}
                            ></div>
                        </div>
                    ) : (
                        <img
                            src={section.content}
                            alt={'image'}
                            key={section._id}
                        />
                    );
                })}
            </div>
        </div>
    );
}

function RecipeToolbar({ recipe }: { recipe: any }) {
    return (
        <div>
            <Link to={`edit`} className="btn btn-info btn-sm mr-2">
                <FiEdit className="text-lg text-white" />
            </Link>
            <DeleteRecipe recipe={recipe} />
        </div>
    );
}

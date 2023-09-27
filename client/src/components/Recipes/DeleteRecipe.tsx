import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import axios from '../../axios';
import { useRequestProcessor } from '../../query';
import { Recipe } from '../../types';
import ConfirmDelete from '../Misc/ConfirmDelete';

export default function DeleteRecipe({ recipe }: { recipe: Recipe }) {
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
            <MdDelete className="text-xl text-white" />
        </ConfirmDelete>
    );
}

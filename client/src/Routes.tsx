import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';

import BrowseRecipes from './containers/BrowseRecipes';
import CreateRecipePage from './containers/CreateRecipePage';
import EditRecipePage from './containers/EditRecipePage';
import Home from './containers/Home';
import HomeLayout from './containers/HomeLayout';
import ViewRecipePage from './containers/ViewRecipePage';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<HomeLayout />}>
            <Route path="/">
                <Route>
                    <Route index element={<Home />} />
                    <Route path="recipes">
                        <Route index element={<BrowseRecipes />} />
                        <Route path="create" element={<CreateRecipePage />} />
                        <Route path=":slug">
                            <Route index element={<ViewRecipePage />} />
                            <Route path="edit" element={<EditRecipePage />} />
                        </Route>
                    </Route>
                </Route>
            </Route>
        </Route>,
    ),
);
export default router;

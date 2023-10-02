import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';

import Login from './components/Auth/Login';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Register from './components/Auth/Register';
import ErrorBoundary from './components/Misc/ErrorBoundary';
import AuthScreen from './containers/AuthScreen';
import BrowseRecipes from './containers/BrowseRecipes';
import CreateRecipePage from './containers/CreateRecipePage';
import EditRecipePage from './containers/EditRecipePage';
import Home from './containers/Home';
import HomeLayout from './containers/HomeLayout';
import ViewRecipePage from './containers/ViewRecipePage';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" errorElement={<ErrorBoundary />}>
            <Route path="auth" element={<AuthScreen />}>
                <Route path="login" element={<Login />} />
                <Route
                    path="register"
                    element={<ProtectedRoute children={<Register />} />}
                />
            </Route>
            <Route element={<HomeLayout />}>
                <Route index element={<Home />} />
                <Route path="recipes">
                    <Route index element={<BrowseRecipes />} />
                    <Route
                        path="create"
                        element={
                            <ProtectedRoute children={<CreateRecipePage />} />
                        }
                    />
                    <Route path=":slug">
                        <Route index element={<ViewRecipePage />} />
                        <Route
                            path="edit"
                            element={
                                <ProtectedRoute children={<EditRecipePage />} />
                            }
                        />
                    </Route>
                </Route>
            </Route>
        </Route>,
    ),
);
export default router;

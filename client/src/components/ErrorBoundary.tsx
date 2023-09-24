import { useRouteError } from 'react-router-dom';

export default function ErrorBoundary() {
    let error = useRouteError();
    return (
        <div className="flex flex-col items-center justify-center">
            <p className="text-error text-xl">Something went wrong...</p>
        </div>
    );
}

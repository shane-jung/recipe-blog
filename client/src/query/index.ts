import {
    MutationFunction,
    MutationKey,
    QueryClient,
    QueryFunction,
    useMutation,
    useQuery,
    useQueryClient,
} from 'react-query';

export function useRequestProcessor() {
    const queryClient = useQueryClient();

    function query(
        key: MutationKey,
        queryFunction:
            | QueryFunction<unknown, string | readonly unknown[]>
            | undefined,
        options = {},
    ) {
        return useQuery({
            queryKey: key,
            queryFn: queryFunction,
            ...options,
        });
    }

    function mutate(
        key: MutationKey,
        mutationFunction: MutationFunction<unknown, void> | undefined,
        options = {},
    ) {
        return useMutation({
            mutationKey: key,
            mutationFn: mutationFunction,
            onSettled: () => queryClient.invalidateQueries(key),
            ...options,
        });
    }

    return { query, mutate };
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: true,
            suspense: true,
            refetchOnReconnect: false,
            refetchOnMount: false,
            retry: 1,
        },
    },
});

export default queryClient;

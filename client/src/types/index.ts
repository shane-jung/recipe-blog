export type Recipe = {
    title: string;
    slug: string;
    preview: string;
    body?: {
        name: string;
        type: string;
        content: string;
    }[];
};

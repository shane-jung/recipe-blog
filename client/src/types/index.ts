export type Recipe = {
    _id?: string;
    title: string;
    slug: string;
    preview: string;
    image?: string;
    body?: {
        name: string;
        type: string;
        content: string;
    }[];
};

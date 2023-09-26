import { useState } from 'react';
import { Controller } from 'react-hook-form';

import axios from '../../axios';

export default function ImageUpload({
    name,
    index,
    control,
}: {
    name: string;
    index: number;
    control: any;
}) {
    const [image, setImage] = useState<File | null>(null);

    const uploadImage = async (event: any) => {
        event.preventDefault();
        console.log(event.target.files[0]);
        let image = event.target.files[0];
        if (!image) return;
        const {
            data: { signedUrl, publicUrl },
        } = await axios.post('recipes/image', {
            fileName: image?.name,
            fileType: image?.type,
        });
        if (!signedUrl) return;

        const result = await fetch(signedUrl, {
            method: 'PUT',
            body: image,
            headers: {
                Origin: 'http://localhost:3000',
                'Content-Type': image?.type,
            },
        });

        console.log(result);
    };

    //     const { signedRequest, url } = signedUrlResponse.data;
    //     try {
    //       const result = await axios.put(signedRequest, imagePreview, {
    //         headers: { "Content-Type": imagePreview?.type },
    //       });
    //     } catch (err) {
    //       console.log(err);
    //     }

    //   };

    return (
        <>
            <Controller
                control={control}
                render={({ field }) => (
                    <input
                        className="hidden"
                        type="text"
                        id={name}
                        value={image?.name}
                        // {...field}
                    />
                )}
                name={name}
            />
            <input
                type="file"
                className="file-input file-input-primary w-full max-w-sm"
                id={`image${index}`}
                onChange={uploadImage}
            />
        </>
    );
}

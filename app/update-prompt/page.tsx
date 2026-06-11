'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@/components/Form';

const UpdatePromptInner = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({ prompt: '', tag: '' });

    useEffect(() => {
        const fetchPrompt = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            setPost({ prompt: data.prompt, tag: data.tag });
        };

        if (promptId) fetchPrompt();
    }, [promptId]);

    const updatePrompt = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({ prompt: post.prompt, tag: post.tag }),
            });

            if (response.ok) router.push('/profile');
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form
            type="Update"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    );
};

const UpdatePrompt = () => (
    <Suspense>
        <UpdatePromptInner />
    </Suspense>
);

export default UpdatePrompt;

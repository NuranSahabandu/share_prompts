'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '../../components/Profile'

const MyProfile = () => {

    const Router = useRouter();

    const { data: session } = useSession();

    const [posts, setPosts] = useState<{ _id?: string; prompt: string; tag?: string; creator?: { _id?: string; username?: string; email?: string; image?: string } }[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setPosts(data);
        }

        if (session?.user.id) {
            fetchPosts();
        }
    }, [session?.user.id])

    const handleEdit = (post: { _id?: string }) => {
        Router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = async (post: { _id?: string }) => {
        const hasConfirmed = confirm('Are you sure you want to delete this prompt?');
        if (!hasConfirmed) return;

        try {
            await fetch(`/api/prompt/${post._id}`, { method: 'DELETE' });
            setPosts((prev) => prev.filter((p) => p._id !== post._id));
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <Profile 
        name="My"
        desc="Welcome to your personalized profile page. Here you can view and manage all your posts, edit your profile information, and customize your settings. Take control of your content and make your profile truly yours!"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile
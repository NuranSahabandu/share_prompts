'use client';

import { useState, useEffect } from 'react'

import PromptCard from './PromptCard';

interface User {
  _id: string;
  email: string;
  username: string;
  image?: string;
}

interface Prompt {
  _id: string;
  creator: User;
  prompt: string;
  tag: string;
}

interface PromptCardListProps {
  data: Prompt[];
  handleTagClick: () => void;
}

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
  return (
    <div className='mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {data.map((post) => (
        <PromptCard 
          key={post._id} 
          post={post} 
          handleTagClick={handleTagClick} 
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState<Prompt[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    }

    fetchPosts();
  },[])

  return (
    <section className='w-full flex flex-col items-center mt-16'>
      <form className='relative w-full max-w-2xl flex items-center justify-center'>
        <input
          type="text"
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          className='w-full p-3 rounded-lg bg-white/50 dark:bg-white/5 border border-gray-300/40 dark:border-white/20 backdrop-blur-sm outline-none focus:ring-2 focus:ring-cyan-400'
        />
      </form>
      <PromptCardList 
        data={posts}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed
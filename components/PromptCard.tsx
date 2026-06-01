'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { set } from 'mongoose'

// Minimal Prompt type to satisfy usages in this component
interface Prompt {
  _id?: string
  prompt: string
  tag?: string
  creator?: {
    _id?: string
    username?: string
    email?: string
    image?: string
  }
}

interface PromptCardProps {
  post: Prompt;
  handleTagClick: (tag: string | undefined) => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
}



const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }: PromptCardProps) => {
  const [copied, setCopied] = useState('');

  const handleCopy = (prompt: string) => {
    setCopied(prompt);
    navigator.clipboard.writeText(prompt);
    setTimeout(() => setCopied(''), 3000);
  }

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <Image
            src={post.creator?.image ?? '/assets/images/logo.svg'}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />
          <div className='flex flex-col'>
            <h3 className='font-semibold text-gray-900'>{post.creator?.username ?? 'Unknown User'}</h3>
            <p className='text-sm text-gray-500'>{post.creator?.email ?? 'No email available'}</p>
          </div>
        </div>
        <div className='copy_btn' onClick={() => handleCopy && handleCopy(post.prompt)}>
          <Image
            src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            alt='copy_icon'
            width={20}
            height={20}
          />
        </div>
      </div>
      <p className='my-4 text-sm text-gray-500'>{post.prompt}</p>
      <p 
        className='text-xs text-gray-500 cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag ?? 'No tag available'}
      </p>
    </div>
  )
}

export default PromptCard
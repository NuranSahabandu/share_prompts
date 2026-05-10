import React from 'react'
import Link from 'next/link'

interface FormProps {
  type: string
  post: {
    prompts: string
    tag: string
  }
  setPost: React.Dispatch<
    React.SetStateAction<{
      prompts: string
      tag: string
    }>
  >
  submitting: boolean
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
}

const Form = ({ type, post, setPost, submitting, handleSubmit }: FormProps) => {
  return (
    <section className='w-full max-w-full flex flex-col items-center justify-start text-center mt-10'>
      <h1 className='text-3xl font-extrabold text-left'>
        <span className='bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent'>
          {type} Post
        </span>
        </h1>
        <p className='max-w-md mt-3 text-center'>
          {type} and share amazing prompts with the world, and let your imagination run wild with any Ai-powered platform
        </p>

        <form
          onSubmit={handleSubmit}
          className='mt-10 w-full max-w-2xl flex flex-col gap-7 bg-gray-100/40 dark:bg-white/10 backdrop-blur-md border border-gray-200/40 dark:border-white/20 rounded-xl p-6 shadow-sm'
        >
          <label>
            <span className='font-satoshi font-semibold text-base text-grey-700'>
              Your AI Prompt
            </span>
            <textarea 
              value={post.prompts}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setPost({ ...post, prompts: e.target.value })
              }
              placeholder='write your prompt here...'
              required
              className="w-full mt-2 p-3 rounded-lg bg-white/50 dark:bg-white/5 border border-gray-300/40 dark:border-white/20 backdrop-blur-sm outline-none resize-none"
            />
          </label>
          <label>
            <span className='font-satoshi font-semibold text-base text-grey-700'>
              Tag{' '}
              <span className='font-normal'>
                (#product, #webdevelopment, #idea)
              </span>
            </span>
            <input 
              value={post.tag}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPost({ ...post, tag: e.target.value })
              }
              placeholder="#tag"
              required
              className="w-full mt-2 p-3 rounded-lg bg-white/50 dark:bg-white/5 border border-gray-300/40 dark:border-white/20 backdrop-blur-sm outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </label>

          <div className="flex items-center justify-end gap-4 w-full">
              <Link href="/" className='text-gray-500 text-sm'>
                Cancel
              </Link>

              <button 
                type='submit'
                disabled={submitting}
                className='px-5 py-1.5 text-sm bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-full text-white transition'
              >
                {submitting ? `${type}...` : type}
              </button>
          </div>
        </form>
    </section>
  )
}

export default Form
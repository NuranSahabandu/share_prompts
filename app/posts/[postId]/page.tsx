import React from 'react'

interface PageProps {
  params: { postId: string }
}

const page = ({ params }: PageProps) => {
  return (
    <div>{params.postId}</div>
  )
}

export default page
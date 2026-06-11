import PromptCard from "./PromptCard"

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

const Profile = ({ name, desc, data, handleEdit, handleDelete }: { name: string; desc: string; data: Prompt[]; handleEdit: (post: Prompt) => void; handleDelete: (post: Prompt) => void }) => {
  return (
    <section className="w-full flex flex-col items-center justify-center pt-10">
      <h1 className="text-4xl font-extrabold text-center mb-3">
        <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">{name} Profile</span>
      </h1>
      <p className="max-w-2xl text-center mb-6">
        {desc}
      </p>

      <div className="mt-10 w-full grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={() => {}}
            handleEdit={() => handleEdit(post)}
            handleDelete={() => handleDelete(post)}
          />
        ))}
      </div>
    </section>
  )
}

export default Profile

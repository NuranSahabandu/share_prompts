import Feed from "@/components/Feed"

const Home = () => {
  return (
    <section className="w-full flex items-center justify-center flex-col items-center pt-10">
        <h1 className="text-4xl font-extrabold text-center mb-6">
            Discover & Share
        <br className="max-md:hidden"/>
        <span className="bg-gradient-to-r from-orange-300 via-orange-500 to-orange-700 bg-clip-text text-transparent">AI-Powered Prompts</span>
        </h1>
        <p className="desc text-center">
            Share Prompts is an open-source AI promting tool for modern world to discover, create and share
            creative prompts
        </p>
        <Feed />
    </section>
  )
}

export default Home
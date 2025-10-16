import StartupCard, { StartupCardType } from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };
  const { data } = await sanityFetch({ query: STARTUPS_QUERY, params });
  const posts = data as StartupCardType[];

  const session = await auth();

  console.log(session.id)

  // const posts = [
  //   {
  //     _createdAt: new Date(),
  //     author: { _id: 3, name: "Timmy" },
  //     _id: 1,
  //     views: 55,
  //     description: "This is a description",
  //     category: "Robots",
  //     title: "WeRobots",
  //     image:
  //       "https://images.unsplash.com/photo-1535378620166-273708d44e4c?q=80&w=1557&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  // ];

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch your startup, connect with enterpreneurs.
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit your ideas, vote for pitches and get noticed in virtual
          competitions.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p>{query ? `Search results for query: ${query}` : "All startups"}</p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}

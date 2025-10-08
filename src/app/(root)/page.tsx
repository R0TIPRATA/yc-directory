import SearchForm from "@/app/components/SearchForm";

export default function Home() {
  return (
    <>
    <section className="pink_container">
      <h1 className="heading">Pitch your startup, connect with enterpreneurs.</h1>
      <p className="sub-heading !max-w-3xl">
         Submit your ideas, vote for pitches and get noticed in virtual competitions.
      </p>
      <SearchForm />
    </section>
    </>
  );
}

import Image from "next/image";

const EventsCatPage = ({ data }) => {
  return (
    <div>
      <h1>Events in London</h1>
      <div>
        {data.map((e) => (
          <a key={e.id} href={`/events/${e.city}/${e.id}`}>
            <Image width={300} height={300} src={e.image} alt={e.title} />
            <h2>{e.title}</h2>
            <p>{e.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};
export default EventsCatPage;

export async function getStaticPaths() {
  const { events_categories } = await import("/data/data.json");
  const allPaths = events_categories.map((e) => {
    return {
      params: {
        cat: e.id.toString(),
      },
    };
  });
  console.log(allPaths);
  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context?.params.cat;
  const { allEvents } = await import("/data/data.json");
  const data = allEvents.filter((e) => e.city === id);
  console.log(data);
  return {
    props: { data },
  };
}

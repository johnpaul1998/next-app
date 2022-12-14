import Image from "next/image";

const EventPage = ({ data }) => {
  return (
    <div>
      <h1>Event Page</h1>
      <div>
        {data.map((e) => (
          <a key={e.id} href={`/events/${e.id}`}>
            <Image width={300} height={300} src={e.image} alt={e.title} />
            <h2>{e.title}</h2>
          </a>
        ))}
      </div>
    </div>
  );
};
export default EventPage;

export async function getStaticProps() {
  const { events_categories } = await import("/data/data.json");
  console.log(events_categories);
  return {
    props: {
      data: events_categories,
    },
  };
}

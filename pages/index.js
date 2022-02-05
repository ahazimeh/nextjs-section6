import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';

function HomePage(props) {
  // const featuredEvents = getFeaturedEvents();

  // console.log("aaaaaaaaaaaaaaaaa", props.events)
  return (
    <div>
      <EventList items={props.events} />
    </div>
  );
}
export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  // https://nextjs-course-3ca66-default-rtdb.firebaseio.com/sales.json
  return {
    props: {
      events: featuredEvents
    },
    revalidate: 300
  }
}

export default HomePage;

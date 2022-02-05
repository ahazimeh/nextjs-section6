import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getAllEvents, getFeaturedEvents, getEventById } from "../../helpers/api-util";
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

function EventDetailPage(props) {
  const router = useRouter();

  // const eventId = router.query.eventId;
  const event = props.selectedEvent;

  // const event = getEventById(eventId);

  if (!event) {
    return (
      // <ErrorAlert>
      //   <p>No event found!</p>
      // </ErrorAlert>
      <div className='center'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  // console.log(context.params.eventId)
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaz", context)
  const eventId = context.params.eventId;
  console.log(eventId)
  const event = await getEventById(eventId);
  if (!event)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  return {
    props: {
      selectedEvent: event
    },
    revalidate: 30
  }
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map(event => ({ params: { eventId: event.id } }))
  return {
    // paths: [
    //   { params: { eventId: 'e1' } }
    // ],
    paths: paths,
    fallback: true
  }
}

export default EventDetailPage;

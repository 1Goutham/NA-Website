import Carousel from "@/components/ui/Carousel";
import EventCard from "./EventCard";
import { events } from "@/lib/events";

export default function HomeEvents() {
  return (
    <Carousel label="Events">
      {events.slice(0, 6).map((e) => <EventCard key={e.id} e={e} />)}
    </Carousel>
  );
}

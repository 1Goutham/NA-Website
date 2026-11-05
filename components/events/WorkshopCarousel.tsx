import Carousel from "@/components/ui/Carousel";
import EventCard, { type WorkshopCard } from "./EventCard";

export default function WorkshopCarousel({ items }: { items: WorkshopCard[] }) {
  return <Carousel label="Workshops">{items.map((w) => <EventCard key={w.slug} w={w} />)}</Carousel>;
}

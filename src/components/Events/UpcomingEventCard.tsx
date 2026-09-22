import EventCard from "./EventCard";
import { useLayout } from "../../contexts/LayoutContext";

const UpcomingEventCard = () => {
    const { upcomingEvents, loading } = useLayout();

    // Don't render if still loading or no upcoming events
    if (loading || !upcomingEvents || upcomingEvents.length === 0) {
        return null;
    }

    return (
        <section id="upcoming-event" className="w-full py-16 md:py-24 px-6 md:px-16">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Upcoming <span className="text-brand-blue font-normal italic">Events</span>
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto font-poppins">
                        Join us for exclusive sessions and networking opportunities with industry leaders
                    </p>
                </div>

                <div className="flex flex-col gap-10">
                    {upcomingEvents.map((event) => (
                        <EventCard
                            key={event._id}
                            image={event.coverImageUrl}
                            title={event.title}
                            description={event.description}
                            targetDate={event.eventStartDateTime}
                            buttonText={event.registrationButtonText || "Register Now"}
                            buttonLink={event.registrationLink || "/events"}
                            imageAlt={event.eventName}
                            venue={event.venue}
                            date={event.date}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UpcomingEventCard;

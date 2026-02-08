import EventCard from "./EventCard";
import { useLayout } from "../../contexts/LayoutContext";

const UpcomingEventCard = () => {
    const { upcomingEvent, loading } = useLayout();

    // Don't render if no upcoming event or still loading
    if (loading || !upcomingEvent) {
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

                <EventCard
                    image={upcomingEvent.coverImage}
                    title={upcomingEvent.title}
                    description={upcomingEvent.description}
                    targetDate={upcomingEvent.eventStartDateTime}
                    buttonText={upcomingEvent.registrationButtonText || "Register Now"}
                    buttonLink={upcomingEvent.registrationLink || "/events"}
                    imageAlt={upcomingEvent.eventName}
                    venue={upcomingEvent.venue}
                    date={upcomingEvent.date}
                />
            </div>
        </section>
    );
};

export default UpcomingEventCard;

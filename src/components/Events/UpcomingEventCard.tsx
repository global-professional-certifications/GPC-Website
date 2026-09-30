import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import type { ComponentProps } from '../../types/cms';

const UpcomingEventCard = ({ events: serverEvents = [] }: ComponentProps) => {
    // Events arrive from app/(site)/events/page.tsx with past ones already
    // removed. The page is cached for up to a minute, so re-check once in the
    // browser: an event that started after the cached copy was made is hidden,
    // exactly as before. Done after mount so the first render matches the
    // server HTML.
    const [upcomingEvents, setUpcomingEvents] = useState(serverEvents);
    useEffect(() => {
        const now = new Date();
        setUpcomingEvents(serverEvents.filter(event => new Date(event.eventStartDateTime) > now));
    }, [serverEvents]);

    // Don't render if there are no upcoming events
    if (!upcomingEvents || upcomingEvents.length === 0) {
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

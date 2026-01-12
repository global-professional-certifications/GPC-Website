import upcomingEventsImage from "../../assets/events/iia-bombay-poster.webp";
import EventCard from "./EventCard";

const UpcomingEventCard = () => {
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

            {/* Example Event Card - Replace with your actual event data */}
            <EventCard
                image={upcomingEventsImage}
                title="IIA Bombay Chapter International Conference 2026"
                description="Global Professional Certifications is proud to be a Learning Partner for the IIA Bombay Chapter’s flagship international event. Join us at Taj the Trees, Vikhroli, to explore the evolving landscape of internal auditing."
                targetDate="2026-01-08T09:00:00"
                buttonText="Register Now"
                buttonLink="https://zfrmz.in/au1XcoFBbjvBs5iuy4TI"
                imageAlt="IIA Annual Conference"
                venue="Taj the Trees – Vikhroli, Mumbai"
                date="8th – 9th January 2026"
            />
        </div>
    </section>

}

export default UpcomingEventCard
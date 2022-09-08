import ShowGroupEvents from "../ShowGroupEvents/ShowGroupEvents";
import '../Modal.css';
import { useState } from "react";

const GroupEvents = ({
    show,
    events,
    maxSize = 4,
}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <ShowGroupEvents
                show={show}
                events={events}
                visible={showModal}
                toggle={() => setShowModal(!showModal)}
            />
            {events.length != 0 &&
                (events.length < maxSize ? (
                    events.map((event) => (
                        <div>
                            <button
                                key={event.id}
                                onClick={() => show(event.id)}
                                className='group-btn'
                            >
                                {event.name}
                            </button>
                        </div>
                    ))
                ) : (
                    <div>
                        <button
                            onClick={() => setShowModal(!showModal)}
                        >
                            {events.length} events
                        </button>
                    </div>
                ))}
        </>
    );
};

export default GroupEvents
import '../Modal.css';

const ShowGroupEvents = ({ show, events, toggle, visible }) => {
    return (
        <>
            <div className={visible ? 'modal active' : 'modal'}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{events.length} Events</h5>
                        <button
                            type="button"
                            onClick={toggle}
                            className="btn-close"
                        ></button>
                    </div>
                    <div
                        style={{ maxHeight: 400, overflowY: "auto" }}
                    >
                        {events.map((event) => (
                            <button
                                key={event.id}
                                onClick={() => {
                                    toggle();
                                    show(event.id);
                                }}
                            >
                                {event.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShowGroupEvents
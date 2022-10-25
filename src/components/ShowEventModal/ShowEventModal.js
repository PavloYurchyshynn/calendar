import '../Modal.css';

const ShowEventModal = ({ visible, event, update, toggle, erase }) => {
  let a = new Date(event?.endDate);
  let b = new Date(event?.startDate);

  return (
    <>
      <div className={visible ? 'modal active' : 'modal'}>
        <div className="modal-content">
          <div className="modal-header">
            <h4>{event?.name}</h4>
            <button type="button" onClick={toggle} className="btn-close">
              &#10005;
            </button>
          </div>
          <div>
            <p>{event?.description}</p>
            <h4>
              <div>
                Start:{' '}
                {b.toLocaleString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit'
                })}
              </div>{' '}
              <div>
                Stop:{' '}
                {a.toLocaleString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit'
                })}
              </div>
            </h4>
          </div>
          <div>
            <button className="btn-save" onClick={update}>
              Edit
            </button>
            <button className="btn-save" onClick={erase}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowEventModal;

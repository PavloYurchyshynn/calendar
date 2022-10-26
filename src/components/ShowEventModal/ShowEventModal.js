import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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
            <CloseIcon onClick={toggle} className="btn-close" />
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
          <div className="btn-save">
            <Button onClick={update}>Edit</Button>
            <Button onClick={erase}>Delete</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowEventModal;

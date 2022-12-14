import { Button, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import '../Modal.css';

const EditEventModal = ({ event, toggle, visible, updateEvent }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(event?.name || '');
    setColor(event?.color || '');
    setDescription(event?.description || '');
    setEndDate(event?.endDate?.split('T')[0] || '');
    setStartDate(event?.startDate?.split('T')[0] || '');
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let a = new Date(endDate);
    let b = new Date(startDate);
    updateEvent({
      color,
      name: name?.trim(),
      end: a.toISOString(),
      start: b.toISOString(),
      id: Number.parseInt(event?.id),
      description: description?.trim()
    });
    setName('');
    setColor('');
    setEndDate('');
    setStartDate('');
    setDescription('');
    toggle();
  };

  return (
    <>
      <div className={visible ? 'modal active' : 'modal'}>
        <div className="modal-content">
          <div className="modal-header">
            <h4>Edit Event</h4>
            <CloseIcon onClick={toggle} className="btn-close" />
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <div>
                  <TextField
                    id="standard-basic"
                    label="Name"
                    variant="standard"
                    value={name}
                    required={true}
                    className="modal-input"
                    onChange={(el) => setName(el.target.value)}
                  />
                </div>
                <div>
                  {/* <div className="modal-title">Description</div>
                  <textarea
                    rows={3}
                    value={description}
                    placeholder="Description"
                    className="modal-input"
                    onChange={(el) => setDescription(el.target.value)}></textarea> */}
                  <TextField
                    id="standard-basic"
                    label="Description"
                    variant="standard"
                    value={description}
                    className="modal-input"
                    onChange={(el) => setDescription(el.target.value)}
                  />
                </div>
                <div>
                  <div className="modal-title">Start Date</div>
                  <input
                    type="date"
                    required={true}
                    value={startDate}
                    placeholder="Start"
                    className="modal-input"
                    onChange={(el) => setStartDate(el.target.value)}
                  />
                </div>
                <div>
                  <div className="modal-title">Stop Date</div>
                  <input
                    type="date"
                    value={endDate}
                    required={true}
                    min={startDate}
                    placeholder="End"
                    className="modal-input"
                    onChange={(el) => setEndDate(el.target.value)}
                  />
                </div>
              </div>
              <div className="btn-save">
                <Button type="submit" variant="contained">
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditEventModal;

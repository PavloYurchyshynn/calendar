import { Button, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import '../Modal.css';

const AddEventModal = ({ toggle, visible, saveEvent }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let a = new Date(endDate);
    let b = new Date(startDate);
    saveEvent({
      color,
      name: name.trim(),
      end: a.toISOString(),
      start: b.toISOString(),
      description: description.trim()
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
            <h4>Add new idea item</h4>
            <CloseIcon onClick={toggle} className="btn-close" />
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <div>
                  <TextField
                    id="standard-basic"
                    label="Title"
                    variant="standard"
                    value={name}
                    required={true}
                    className="modal-input"
                    onChange={(el) => setName(el.target.value)}
                  />
                </div>
                <div>
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
                    placeholder="Day"
                    value={startDate}
                    className="modal-input"
                    onChange={(el) => setStartDate(el.target.value)}
                  />
                </div>
                <div>
                  <div className="modal-title">Stop Date</div>
                  <input
                    type="date"
                    min={startDate}
                    required={true}
                    value={endDate}
                    placeholder="Day"
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

export default AddEventModal;

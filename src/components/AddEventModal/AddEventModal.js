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
            <button type="button" onClick={toggle} className="btn-close">
              &#10005;
            </button>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <div>
                  <div className="modal-title">Title*</div>
                  <input
                    type="text"
                    value={name}
                    required={true}
                    placeholder="Title goes here"
                    className="modal-input"
                    onChange={(el) => setName(el.target.value)}
                  />
                </div>
                <div>
                  <div className="modal-title">Description</div>
                  <textarea
                    rows={3}
                    value={description}
                    className="modal-input"
                    onChange={(el) => setDescription(el.target.value)}></textarea>
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
              <div>
                <button className="btn-save" type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEventModal;

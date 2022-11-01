import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import AddEventModal from './components/AddEventModal/AddEventModal';
import EditEventModal from './components/EditEventModal/EditEventModal';
import GroupEvents from './components/GroupEvents/GroupEvents';
import ShowEventModal from './components/ShowEventModal/ShowEventModal';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const App = () => {
  let today = new Date();
  let grid = { id: 0, day: 0 };
  const monthWeeks = [0, 1, 2, 3, 4, 5];
  const weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  const [events, setEvents] = useState([]);
  // const [events, setEvents] = useState(() => {
  //   const events = JSON.parse(localStorage.getItem('events'));
  //   return events || [];
  // });
  const [monthDifference, setMonthDifference] = useState(0);
  const [currentEvent, setCurrentEvent] = useState({});
  const [month, setMonth] = useState({
    today,
    firstDay: new Date(today.getFullYear(), today.getMonth(), 1),
    lastDay: new Date(today.getFullYear(), today.getMonth() + 1, 0)
  });
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // useEffect(() => {
  //   localStorage.setItem('events', JSON.stringify(events));
  // }, [events]);

  useEffect(() => {
    today = new Date();
    grid = { id: 0, day: 0 };
    today.setMonth(today.getMonth() + monthDifference);
    setMonth({
      today,
      firstDay: new Date(today.getFullYear(), today.getMonth(), 1),
      lastDay: new Date(today.getFullYear(), today.getMonth() + 1, 0)
    });
  }, [monthDifference]);

  const getDayEvents = (day = 0) => {
    let a = new Date();
    let b = new Date();

    a.setMonth(a.getMonth() + monthDifference);
    b.setMonth(b.getMonth() + monthDifference);

    a.setDate(day);
    b.setDate(day - 1);

    a.setHours(23);
    b.setHours(0);

    return events.filter((event) => {
      let c = new Date(event?.startDate);
      let d = new Date(event?.endDate);

      c.setHours(23);
      d.setHours(0);

      return c < a && b < d;
    });
  };

  const saveEvent = ({ name, description, start, end }) => {
    setEvents([
      ...events,
      {
        id: events.length + 1,
        name,
        description,
        endDate: end,
        startDate: start
      }
    ]);
  };

  const updateEvent = ({ id, name, description, start, end, color }) => {
    setEvents([
      ...events.filter((event) => event.id != id),
      {
        id,
        name,
        color,
        description,
        endDate: end,
        startDate: start
      }
    ]);
  };

  const deleteEvent = () => {
    setEvents([...events.filter((event) => event.id != currentEvent.id)]);
    setShowModal(false);
  };

  return (
    <div className="app">
      <AddEventModal
        visible={showAddModal}
        saveEvent={saveEvent}
        toggle={() => setShowAddModal(!showAddModal)}
      />
      <ShowEventModal
        visible={showModal}
        erase={deleteEvent}
        event={currentEvent}
        toggle={() => setShowModal(!showModal)}
        update={() => {
          setShowModal(!showModal);
          setShowEditModal(!showEditModal);
        }}
      />
      <EditEventModal
        visible={showEditModal}
        event={currentEvent}
        updateEvent={updateEvent}
        toggle={() => setShowEditModal(!showEditModal)}
      />
      <div className="header">
        <div className="event-btn">
          <Button variant="contained" onClick={() => setShowAddModal(!showAddModal)}>
            Add event
          </Button>
        </div>
        <div className="month-nav">
          <ArrowBackIosNewIcon
            className="change-month-btn"
            onClick={() => setMonthDifference(monthDifference - 1)}
          />
          <span className="current-month-year">
            {month.today.toLocaleString('default', {
              month: 'long',
              year: 'numeric'
            })}
          </span>
          <ArrowForwardIosIcon
            className="change-month-btn"
            onClick={() => setMonthDifference(monthDifference + 1)}
          />
        </div>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              {weekDays.map((day, id) => (
                <th className="table-head-text" key={id}>
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {monthWeeks.map((week, index) => (
              <tr key={index}>
                {weekDays.map((day, id) => {
                  if (grid.day || month.firstDay.getDay() == grid.id) grid.day++;
                  grid.id++;
                  if (grid.day > month.lastDay.getDate()) grid.day = 0;

                  return (
                    <td key={id} className={'table-day ' + (!grid.day && 'empty-day')}>
                      <div
                        className={
                          monthDifference == 0 && grid.day == new Date().getDate()
                            ? 'current-day'
                            : 'day'
                        }>
                        {grid.day != 0 && (
                          <>
                            <div className="table-day-title">{grid.day}</div>
                            <GroupEvents
                              events={getDayEvents(grid.day)}
                              show={(id) => {
                                setCurrentEvent(events.find((a) => id == a.id));
                                setShowModal(!showModal);
                              }}
                            />
                          </>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;

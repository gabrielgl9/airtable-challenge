import { useRef } from 'react';
import styles from './details.module.css';

export function TimelineDetails({ name, start, end, setLaneItem }) {
  const nameRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    const newName = nameRef.current.value;
    const newStartDate = new Date(startDateRef.current.value);
    const newEndDate = new Date(endDateRef.current.value);

    if (newStartDate > newEndDate) {
      alert("Start date can't be after end date");
      return;
    }

    setLaneItem({
      name: newName,
      start: newStartDate.toISOString(),
      end: newEndDate.toISOString(),
    });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <label>
          Name: <br />
          <input
            type="text"
            defaultValue={name}
            ref={nameRef}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Start Date: <br />
          <input
            type="date"
            defaultValue={new Date(start).toISOString().slice(0, 10)}
            ref={startDateRef}
            required
          />
        </label>
      </div>
      <div>
        <label>
          End Date: <br />
          <input
            type="date"
            defaultValue={new Date(end).toISOString().slice(0, 10)}
            ref={endDateRef}
            required
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

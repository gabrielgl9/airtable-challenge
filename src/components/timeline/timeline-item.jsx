import { useRef, useState } from 'react';
import { Popover } from '../popover';
import styles from './item.module.css';
import { TimelineDetails } from './details.jsx';

const COLORS = [
  "#FF3B30",
  "#34C759",
  "#DAA520",
  "#0A84FF",
  "#BF5AF2"
];

const INITIAL_DATE = new Date(2021, 0, 1);
const TOTAL_AUX = 330;
const CONTAINER_WIDTH_PX = 1200;

export function TimeLineItem({ item, zoomLevel, setLaneItem }) {
  const [showPopover, setShowPopover] = useState(false);
  const ref = useRef();

  const color = COLORS[item.id % COLORS.length];
  
  const startDate = new Date(item.start);
  const endDate = new Date(item.end);

  const diffDiasStart = Math.floor((startDate - INITIAL_DATE) / (1000 * 60 * 60 * 24));
  const durationDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

  const TOTAL_DAYS = TOTAL_AUX / (12 / zoomLevel);
  const PIXELS_PER_DAY = CONTAINER_WIDTH_PX / TOTAL_DAYS;

  const left = diffDiasStart * PIXELS_PER_DAY;
  const width = durationDays * PIXELS_PER_DAY;

  return (
    <>
      <div 
        ref={ref}
        title={item.name}
        className={styles.item} 
        style={{ 
          background: color, 
          left: `${left}px`,
          width: `${width}px`,
        }}
        onClick={() => setShowPopover(!showPopover)}
      >
        {item.name}
      </div>
      {showPopover && (
        <Popover positionX={left + width} anchorRef={ref} onClose={() => setShowPopover(false)}>
          <TimelineDetails 
            name={item.name} 
            start={item.start} 
            end={item.end} 
            setLaneItem={(newUpdatedLaneItem) => {
              setLaneItem(newUpdatedLaneItem);
              setShowPopover(false);
            }} 
          />
        </Popover>
      )}
    </>
  );
}

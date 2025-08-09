import { useState } from 'react';
import { assignLanes } from '../../assignLanes';
import timelineItems from '../../timelineItems.js';
import styles from './table.module.css';
import { TimeLineItem } from './timeline-item';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const LANE_HEIGHT_PX = 50;

export function Timeline() {
  const [visibleMonths, setVisibleMonths] = useState(4);
  const [itemsByLane, setItemsByLane] = useState(assignLanes(timelineItems));

  const displayedMonths = MONTHS.slice(0, visibleMonths);

  const handleUpdateLaneItem = (laneIndex, itemIndex, newItem) => {
    const updatedItemsByLane = [...itemsByLane];
    updatedItemsByLane[laneIndex][itemIndex] = {...updatedItemsByLane[laneIndex][itemIndex], ...newItem};
    setItemsByLane(updatedItemsByLane);
  }

  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <button
          onClick={() => setVisibleMonths((v) => Math.max(1, v - 1))}
          disabled={visibleMonths === 1}
          style={{ marginRight: 8 }}
        >
          Zoom In
        </button>
        <button
          onClick={() => setVisibleMonths((v) => Math.min(12, v + 1))}
          disabled={visibleMonths === 12}
        >
          Zoom Out
        </button>
      </div>
      <div className={styles.timelineContainer}>
        <div className={styles.timelineHeader}>
          {displayedMonths.map((m) => (
            <div key={m} className={styles.timelineHeaderMonth}>
              {m}
            </div>
          ))}
        </div>

        <div
          className={styles.timelineLanes}
          style={{ height: itemsByLane.length * LANE_HEIGHT_PX * 1.3}}
        >
          {itemsByLane.map((laneGroup, laneGroupIndex) => (
            <div
              key={laneGroupIndex}
              className={styles.timelineLane}
              style={{ height: LANE_HEIGHT_PX, position: 'relative' }}
            >
              {laneGroup
                .filter((item) => {
                  const startMonth = new Date(item.start).getMonth();
                  return startMonth < visibleMonths;
                })
                .map((item, lineIndex) => (
                <TimeLineItem 
                  key={item.id} 
                  item={item} 
                  zoomLevel={visibleMonths}
                  setLaneItem={(newUpdatedLaneItem) => handleUpdateLaneItem(laneGroupIndex, lineIndex, newUpdatedLaneItem)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
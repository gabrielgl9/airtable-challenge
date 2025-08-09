import { useEffect, useRef } from 'react';
import styles from './popover.module.css';

export function Popover({ positionX, anchorRef, onClose, children }) {
  const popoverRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target) &&
          !anchorRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose, anchorRef]);

  const rect = anchorRef.current.getBoundingClientRect();

  return (
    <div className={styles.popover} ref={popoverRef} style={{
      top: rect.top + window.scrollY,
      left: positionX,
    }}>
      {children}
    </div>
  );
}
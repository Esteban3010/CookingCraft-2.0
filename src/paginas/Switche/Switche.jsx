import React, { useState } from 'react';
import styles from './Switche.module.css';

const Switche = () => {
  const [isOn, setIsOn] = useState(false);

  const Action = () => {
    setIsOn(!isOn);
  };

  return (
    <div
      className={`${styles.toggleSwitch} ${isOn ? styles.on : styles.off}`}
      onClick={Action}
    >
      <div className={styles.toggleHandle}></div>
    </div>
  );
};

export default Switche;
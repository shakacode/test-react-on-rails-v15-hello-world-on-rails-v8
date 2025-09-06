import React, { useState } from 'react';
import styles from './SecondComponent.module.css';

const SecondComponent = (props) => {
  const [name, setName] = useState(props.name);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Second Component Demo</h3>
      <p className={styles.description}>
        This demonstrates React on Rails auto-registration with bundles.
        This component was automatically registered without manual registration code!
      </p>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="name">Change the name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
      </div>
      <p className={styles.greeting}>
        Hello, <strong>{name}</strong>! This is the second component.
      </p>
      <div className={styles.navigation}>
        <a href="/hello_world" className={styles.link}>← Back to Hello World</a>
      </div>
    </div>
  );
};

export default SecondComponent;
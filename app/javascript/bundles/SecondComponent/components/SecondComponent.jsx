import React, { useState } from 'react';
import * as style from './SecondComponent.module.css';

const SecondComponent = (props) => {
  const [name, setName] = useState(props.name);

  return (
    <div className={style.container}>
      <h3 className={style.title}>Second Component Demo</h3>
      <p className={style.description}>
        This demonstrates React on Rails auto-registration with bundles.
        This component was automatically registered without manual registration code!
      </p>
      <div className={style.formGroup}>
        <label className={style.label} htmlFor="name">Change the name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={style.input}
        />
      </div>
      <p className={style.greeting}>
        Hello, <strong>{name}</strong>! This is the second component.
      </p>
      <div className={style.navigation}>
        <a href="/hello_world" className={style.link}>← Back to Hello World</a>
      </div>
    </div>
  );
};

export default SecondComponent;
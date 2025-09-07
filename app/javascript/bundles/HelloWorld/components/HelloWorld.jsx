import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as style from './HelloWorld.module.css';

const HelloWorld = (props) => {
  const [name, setName] = useState(props.name);

  return (
    <div className={style.container}>
      <h1 className={style.title}>Hello, {name}!</h1>
      <p className={style.subtitle}>Welcome to React on Rails 15.0</p>
      
      <hr className={style.divider} />
      
      <div className={style.formSection}>
        <form>
          <label className={style.label} htmlFor="name">
            <span className={style.bright}>Say hello to:</span>
          </label>
          <input 
            id="name" 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className={style.input}
            placeholder="Enter your name..."
          />
        </form>
        
        <div className={style.greeting}>
          Hello, <strong>{name}</strong>! 🎉
        </div>
      </div>

      <div className={style.navigation}>
        <a href="/second_component" className={style.navButton}>
          → Explore Second Component
        </a>
        <p className={style.navDescription}>
          This demonstrates React on Rails component navigation and auto-registration with modern styling and smooth transitions.
        </p>
      </div>
    </div>
  );
};

HelloWorld.propTypes = {
  name: PropTypes.string.isRequired, // this is passed from the Rails view
};

export default HelloWorld;

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as style from './HelloWorld.module.css';

const HelloWorld = (props) => {
  const [name, setName] = useState(props.name);

  return (
    <div>
      <h3>Hello, {name}!</h3>
      <hr />
      <form>
        <label className={style.bright} htmlFor="name">
          Say hello to:
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </form>
      <hr />
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <a 
          href="/second_component" 
          style={{
            display: 'inline-block',
            backgroundColor: '#007bff',
            color: 'white',
            padding: '0.75rem 1.5rem',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          → Go to Second Component
        </a>
        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '1rem' }}>
          This demonstrates React on Rails component navigation and auto-registration.
        </p>
      </div>
    </div>
  );
};

HelloWorld.propTypes = {
  name: PropTypes.string.isRequired, // this is passed from the Rails view
};

export default HelloWorld;

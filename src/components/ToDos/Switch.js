import React  from 'react';
import './Switch.css';


const Switch = ({isToggled, onToggle }) => {
    return (
    <label className='switch'>
      <input type="checkbox" checked={isToggled} onChange={() => onToggle(!isToggled)}/>
      <span className='slider'/>
      </label>
    );
};

export default Switch;


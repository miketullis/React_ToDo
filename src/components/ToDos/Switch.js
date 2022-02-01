import React  from 'react';
import './Switch.css';


const Switch = ({isToggled, onToggle }) => {
    return (
    <label className='switch'>
      <input type="checkbox" checked={isToggled} onChange={onToggle}/>
      <span className='slider'/>
      </label>
    );
};

export default Switch;
















// const Switch = ({ isChecked, handleToggle }) => {
//     return (
//       <>
//         <input
//           checked={isChecked}
//           onChange={handleToggle}
//           className="react-switch-checkbox"
//           id={`react-switch-new`}
//           type="checkbox"
//         />
//         <label
//           style={{ background: isChecked && '#06D6A0' }}
//           className="react-switch-label"
//           htmlFor={`react-switch-new`}
//         >
//           <span className={`react-switch-button`} />
//           <h5>&nbsp;&nbsp;Yes&nbsp;&nbsp;&nbsp;&nbsp;No</h5>  {/* find better styling option */}
//         </label>
//       </>
//     );
//   };
  
//   export default Switch;
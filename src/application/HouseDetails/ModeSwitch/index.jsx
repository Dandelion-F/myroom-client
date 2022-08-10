import React from 'react';
import './index.css';

export default function ModeSwitch() {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 200) {
      document.querySelector('.mode-switch').style.visibility = 'hidden';
    } else {
      document.querySelector('.mode-switch').style.visibility = 'visible';
    }
  });

  function handleClickLight() {
    document.getElementById('light-mode').className = 'mode-switch-circle';
    document.getElementById('dark-mode').className =
      'mode-switch-circle mode-off';
  }

  function handleClickDark() {
    document.getElementById('light-mode').className =
      'mode-switch-circle mode-off';
    document.getElementById('dark-mode').className = 'mode-switch-circle';
  }

  return (
    <div className="mode-switch">
      <span>🌞</span>
      <div className="mode-switch-toggle">
        <div
          id="light-mode"
          className="mode-switch-circle"
          onClick={handleClickLight}
        ></div>
        <div
          id="dark-mode"
          className="mode-switch-circle mode-off"
          onClick={handleClickDark}
        ></div>
      </div>
      <span>🌑</span>
    </div>
  );
}

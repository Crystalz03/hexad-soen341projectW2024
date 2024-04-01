import React, { useRef, useState, useEffect } from 'react';
import { createPopper } from '@popperjs/core';
import SignInForm from './SignInForm';
import SignupForm from './SignUpForm';

function SignInPopover() {
  const buttonRef = useRef();
  const popoverRef = useRef();
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    const button = buttonRef.current;
    const popover = popoverRef.current;

    createPopper(button, popover, {
      placement: 'bottom',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 10], // Adjust the offset as needed
          },
        },
      ],
    });

    const handleClickOutside = (event) => {
      if (!popover.contains(event.target) && !button.contains(event.target)) {
        popover.style.display = 'none';
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const togglePopover = () => {
    popoverRef.current.style.display === 'none'
      ? (popoverRef.current.style.display = 'block')
      : (popoverRef.current.style.display = 'none');
  };

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <div>
      <button
        ref={buttonRef}
        type="button"
        className="btn btn-primary"
        onClick={togglePopover}
      >
        Sign In/Sign Up
      </button>
      <div ref={popoverRef} className="popover" style={{ display: 'none' }}>
        {/* Content of the popover */}
        <div className="popover-body">
          {showSignUp ? (
            <div>
              <h3>Sign Up</h3>
              <SignupForm />
            </div>
          ) : (
            <div>
              <h3>Sign In</h3>
              {/* Include your Sign In component here */}
              <SignInForm />
              <p>
                Don't have an account?{' '}
                <span className="link" onClick={toggleSignUp}>
                  Sign Up
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignInPopover;

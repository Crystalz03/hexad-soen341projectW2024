import React, { useRef, useState, useEffect } from 'react';
import { createPopper } from '@popperjs/core';
import SignInForm from './SignInForm';
import SignupForm from './SignUpForm';

function SignInPopover() {
  const buttonRef = useRef(null);
  const popoverRef = useRef(null);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    const button = buttonRef.current;
    const popover = popoverRef.current;

    const popperInstance = createPopper(button, popover, {
      placement: 'bottom-end',
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
        popoverRef.current.style.display = 'none';
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

  const openSignUp = () => {
    setShowSignUp(true);
    togglePopover();
  };

  const openSignIn = () => {
    setShowSignUp(false); // Set showSignUp to false to switch content back to sign-in form
    togglePopover();
  };

  return (
    <div>
      <button
        ref={buttonRef}
        type="button"
        className="btn btn-primary"
        style={{ backgroundColor: '#ea4c89', borderColor: '#ea4c89', color: 'white' }}
        onClick={togglePopover}
      >
        Sign In/Sign Up
      </button>
      <div ref={popoverRef} className="popover" style={{ display: 'none' }}>
        <div className="popover-body">
          {showSignUp ? (
            <div>
              <h3>Sign Up</h3>
              <SignupForm />
              <p>
                Already have an account?{' '}
                <button type="button" className="btn btn-link" onClick={openSignIn}>
                  Sign In
                </button>
              </p>
            </div>
          ) : (
            <div>
              <h3>Sign In</h3>
              <SignInForm />
              <p>
                Don't have an account?{' '}
                <button type="button" className="btn btn-link" onClick={openSignUp}>
                  Sign Up
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignInPopover;

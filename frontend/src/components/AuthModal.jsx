// import React, { useEffect, useRef } from 'react';

// const AuthModal = ({
//   isAuthModalOpen, 
//   // setIsAuthModalOpen,
//   closeModal
// }) => {
//   // Declare a ref variable 'modalRef' using the useRef hook, initialized to null.
//   // This ref will be attached to the modal element, allowing us to check if a click event occurred outside the modal by comparing event targets with modalRef.current.
//   // The .current property holds the reference to the DOM node, and unlike state, updating it does not cause a re-render (the purpose of using useRef - for values to persist between renders)
//   const modalRef = useRef(null);
//   // Declare a useEffect function to handle closing the modal when clicking outside of it:
//   useEffect(() => {
//     // Declare a new event handler function, handleClickOutside. An event, in this case a user's mousedown, is passed as an argument:
//     function handleClickOutside(event) {
//       // If the click occurred outside the modal (i.e., event.target is not inside modalRef), call closeModal():
//       if (modalRef.current && !modalRef.current.contains(event.target)) {
//         closeModal();
//       }
//     }
//     // Only if isAuthModalOpen is true, i.e. the AuthModal.jsx component is open and on screen, add an event listener. The trigger event will be a user's 'mousedown', and it will call the handleClickOutside() declared earlier.
//     if (isAuthModalOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }
//     // The return statement for this useEffect() function. This return statement handles the 'clean up' of side effects, namely the removal of the event listener when the component unmounts or dependencies change: 
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   // This useEffect function's dependency array has two values passed to it: 1) isAuthModalOpen - a state value passed down from App.jsx and ii) closeModal - a function passed down from App.jsx. This setup ensures that this useEffect will run initially on mount and then whenever either of these values change. closeModal is included here because it could change (for example, if redefined in a parent component):
//   }, [isAuthModalOpen, closeModal]);

//   // Declare a useEffect function to handle closing the modal when pressing the Escape button:
//   useEffect(() => {
//     // Declare an event handler function, handleEsc. Pass an event object as its argument. In this context, the event object will be keydown of the Escape button.
//     function handleEsc(event) {
//       // If the key object of the event strictly equals 'Escape'
//       if (event.key === 'Escape') {
//         // Call closeModal()
//         closeModal();
//       }
//     }
//     // Only if isAuthModalOpen is true, i.e. the AuthModal.jsx component is open and on screen, add an event listener. The trigger event will be a user's 'keydown', and it will call handleEsc(). To reach this part of the code, the event.key has to === 'Escape', and so we do not need to redeclare the key's value here:
//     if (isAuthModalOpen) {
//       document.addEventListener('keydown', handleEsc);
//     }
//     // The return statement for this useEffect() function. This return statement handles the 'clean up' of side effects, namely the removal of the event listener when the component unmounts or dependencies change: 
//     return () => {
//       document.removeEventListener('keydown', handleEsc);
//     };
//   // This useEffect function's dependency array has two values passed to it: 1) isAuthModalOpen and ii) closeModal. This setup ensures that this useEffect will run initially on mount and then whenever either of these values change. closeModal is included here because it could change (for example, if redefined in a parent component):
//   }, [isAuthModalOpen, closeModal]);

//   console.log('AuthModal rendered, isAuthModalOpen:', isAuthModalOpen);

//   return (
//     <>
//       <form 
//         className={`user-login-modal-form-overlay${isAuthModalOpen ? ' active' : ''}`}>
//         <div 
//           className='modal-content'
//           ref={modalRef}>
//           <div className='user-login-form-close-button-container'>
//             <div
//               className='user-login-form-close-button' 
//               onClick={closeModal} 
//               style={{cursor: 'pointer'}}>
//               {/* SVG 'x' icon */}
//                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-label="Close">
//                   <line x1="4" y1="4" x2="16" y2="16" stroke="black" strokeWidth="2" strokeLinecap="round"/>
//                   <line x1="16" y1="4" x2="4" y2="16" stroke="black" strokeWidth="2" strokeLinecap="round"/>
//                 </svg>
//             </div> {/* End of user-login-form-close-button */}
//           </div> {/* End of user-login-form-close-button-container */}
//           <div className='username-login-field-title'>Username:
//             <input 
//               className='username-login-field'
//               placeholder='Enter your username here'/>
//           </div>
//           <div className='password-login-field-title'>Password:
//             <input 
//               className='password-login-field'
//               placeholder='Enter your password here'/>
//           </div>
//           <button className='authmodal-login-button'>
//             Log in
//           </button>
//         </div> {/* End of modal-content */}
//       </form> {/* End of user-login-modal-form-overlay */}
//     </>
//   )
// }

// export default AuthModal
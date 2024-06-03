import React from 'react';
// import { Close_Square } from '../assets/svg';
// import toast, { Toaster } from 'react-hot-toast';
const Modal = {};
const Container = ({ children }) => {
  return (
    <div className="w-screen h-screen bg-[rgba(0,0,0,0.7)] flex justify-center items-center z-50 fixed inset-0">
      {/* <Toaster /> */}
      {children}
    </div>
  );
}
const CardForm = ({ children, onSubmit, title, onClose, gap, maxWidth }) => {
  return (
    <div
      className={`card w-full ${
        maxWidth ? `max-w-[${maxWidth}px]` : 'max-w-[400px]'
      } rounded-[19px] p-4  overflow-y-auto bg-gradient-to-b from-[#090909be] via-[#4c4c4c] to-[#050504ae]`}
      // bg-gradient-to-b from-[#a6a6a62] to-[#0000006c]
      onSubmit={onSubmit}
      style={{
        maxWidth: maxWidth ? maxWidth : 400 + 'px'
        // background:
        //   'linear-gradient(180deg, rgba(166, 166, 166, 0) 0%, #000000 100%)'

        // background: 'linear-gradient(to bottom, #a6a6a620, #00000069)'
        // backdropFilter: '10px'
      }}
    >
      <div className="flex justify-between pb-6">
        <h1 className="font-semibold text-xl">{title}</h1>
        <span>
          {/* <img
            // src={Close_Square}
            alt="close"
            onClick={onClose}
            className="cursor-pointer"
          /> */}
        </span>
      </div>{' '}
      <div className={`flex flex-col gap-${gap}`}>{children}</div>
    </div>
  );
};
Modal.Container = Container;
Modal.CardForm = CardForm;

export default Modal;
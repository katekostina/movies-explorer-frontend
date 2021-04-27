import './InfoTooltip.css';
import React from 'react';

function InfoTooltip({ isOpen, isSuccessful, onClose, positiveMessage }) {
  function handleClose() {
    onClose();
  }

  return (
    <article className={`popup ${isOpen ? 'popup_shown' : ''}`}>
      <div className='popup__overlay' />
      <figure className='popup__form'>
        <button
          className='popup__close-button'
          type='button'
          onClick={handleClose}
        />
        <div
          className={`popup__big-icon ${
            isSuccessful
              ? 'popup__big-icon_type_success'
              : 'popup__big-icon_type_fail'
          }`}
        />
        <h2 className='popup__bold-text'>
          {isSuccessful
            ? positiveMessage
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </figure>
    </article>
  );
}

export default InfoTooltip;

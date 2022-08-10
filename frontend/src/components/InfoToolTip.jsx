import React from 'react';
/* import iconOk from '../img/icons/icon-ok.svg';
import iconFailed from '../img/icons/icon-failed.svg';
 */
function InfoToolTip({ onClose, isOpen, message }) {
  if (!message) {
    return null;
  }

  const { type, text } = message;
  return (
    <div
      id="InfoToolTip"
      className={`overlay ${isOpen ? 'overlay_visible' : ''}`}
    >
      <button
        onClick={onClose}
        className="btn-close overlay__btn-close popup-info__exit-button"
        aria-label="Close"
        type="button"
      ></button>
      <div className="popup popup-info">
        {/* <img src={type} alt={`${type} icon`} /> */}
        <div className={`popup-info__icon popup-info__icon_type_${type}`}></div>
        <h2 className="popup__lbl-title popup-info__title">{text}</h2>
      </div>
    </div>
  );
}
//        <img src={`../img/icons/icon-${type}.svg`} alt={`${type} icon`} />
//      <img src={failedIcon} alt={`${type} icon`} />
export default InfoToolTip;

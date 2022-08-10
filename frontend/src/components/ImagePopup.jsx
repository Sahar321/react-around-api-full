import Image from './Image';
function ImagePopup({ selectedElement, onClose }) {
  return (
    <div
      id="overlayImage"
      className={`overlay ${selectedElement && "overlay_visible"}`}
    >
      <button
        onClick={onClose}
        className="btn-close overlay__btn-close"
        aria-label="Close"
        type="button"
      ></button>
      <Image
        src={selectedElement && selectedElement.link}
        alt="overlay img"
        className="overlay__img"
      />
      <p className="overlay__text">{selectedElement && selectedElement.name}</p>
    </div>
  );
}
export default ImagePopup
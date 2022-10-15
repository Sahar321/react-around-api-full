export default function PopupWithForm({
  name,
  title,
  submitTitle,
  children,
  onClose,
  isOpen,
  handleSubmit,
}) {
  return (
    <div id={name} className={`overlay ${isOpen ? 'overlay_visible' : ''}`}>
      <button
        onClick={onClose}
        className="btn-close overlay__btn-close"
        aria-label="Close"
        type="button"
      />
      <form name={name} className="popup form" onSubmit={handleSubmit}>
        <h2 className="popup__lbl-title">{title}</h2>
        {children}
        <button
          aria-label={submitTitle}
          className="btn-submit popup__btn-submit"
          type="submit"
        >
          {submitTitle}
        </button>
      </form>
    </div>
  );
}

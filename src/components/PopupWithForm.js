function PopupWithForm({title, name, button, children, isOpen, onClose, onSubmit, onClickOverlay, isValid}) {
  return(
    <section className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`} onClick={onClickOverlay}>
      <div className={`popup__container popup__container_${name}`}>
        <button className={`popup__close popup__close-${name}`} type="button" onClick={onClose}/>
        <form className={`popup__field popup__field-${name}`} name={`form${name}`} method="GET" onSubmit={onSubmit} noValidate>
          <h3 className="popup__title">{title}</h3>
          {children}
          <button className={`popup__submit-button popup__submit-button_${name} ${isValid ? '' : 'popup__button_inactive'}`} type="submit" name="submit">{button}</button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
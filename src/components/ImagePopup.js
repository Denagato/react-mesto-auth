function ImagePopup({card, onClose, onClickOverlay}) {
  return(
    <div className={`popup popup_image-open ${card.isOpen ? "popup_opened" : ""}`} onClick={onClickOverlay}>
      <div className="popup__image-container">
        <button className="popup__close popup__close-image" type="button" onClick={onClose}/>
        <img className="popup__image" src={card.link} alt={card.name}/>
        <h3 className="popup__image-title">{card.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
import React from 'react';

import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace, onClickOverlay}) {
  const [isLoading, setIsLoading] = React.useState(false);

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  const [errName, setErrName] = React.useState(false);
  const [errNameMes, setErrNameMes] = React.useState('');

  const [errLink, setErrLink] = React.useState(false);
  const [errLinkMes, setErrLinkMes] = React.useState('');

  React.useEffect(() => {
    if (isOpen) {
      setName('');
      setLink('');
      setIsLoading(false);
      setErrName(false);
      setErrLink(false);
      setErrNameMes('');
      setErrLinkMes('');
    }
  }, [isOpen]);

  function handleAddCardName(e) {
    setErrName(e.target.validity.valid);
    setErrNameMes(e.target.validationMessage);
    setName(e.target.value);
  }

  function handleAddCardLink(e) {
    setErrLink(e.target.validity.valid);
    setErrLinkMes(e.target.validationMessage);
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    onAddPlace({
      name,
      link
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="ElementCard"
      button={isLoading ? "Сохранение..." : "Создать"}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      isValid={errLink && errName}
      onClose={onClose}
      onClickOverlay={onClickOverlay}
    >
      <input
        type="text"
        name="title"
        placeholder="Название"
        className="popup__input popup__field-title"
        id="input-title"
        minLength="2"
        maxLength="30"
        value={name}
        onChange={handleAddCardName}
        required
      />
      <span
        className={`error ${ !errName ? "error_active" : ''}`}
        id="input-title-error"
      >
        {errNameMes}
      </span>

      <input
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        className="popup__input popup__field-link"
        id="input-link"
        value={link}
        onChange={handleAddCardLink}
        required
      />
      <span
        className={`error ${ !errLink ? "error_active" : ''}`}
        id="input-link-error"
      >
        {errLinkMes}
      </span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
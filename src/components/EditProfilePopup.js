import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser, onClickOverlay}) {
  const [isLoading, setIsLoading] = React.useState(false);

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  const [errName, setErrName] = React.useState(true);
  const [errNameMes, setErrNameMes] = React.useState('');

  const [errAbout, setErrAbout] = React.useState(true);
  const [errAboutMes, setErrAboutMes] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    if (isOpen) {
      setIsLoading(false);
      setErrName(true)
      setErrAbout(true);
      setErrNameMes('');
      setErrAboutMes('');
    }
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setErrName(e.target.validity.valid);
    setErrNameMes(e.target.validationMessage);
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setErrAbout(e.target.validity.valid);
    setErrAboutMes(e.target.validationMessage);
    setDescription(e.target.value);
 }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="ElementProfile"
      button={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      isValid={errAbout && errName}
      onClose={onClose}
      onSubmit={handleSubmit}
      onClickOverlay={onClickOverlay}
    >
      <input
        type="text"
        name="name"
        className="popup__input popup__field-name"
        id="input-name"
        minLength="2"
        maxLength="40"
        value={name || ''}
        onChange={handleChangeName}
        required
      />
      <span
        className={`error ${ !errName ? "error_active" : ''}`}
        id="input-name-error"
      >
        {errNameMes}
      </span>

      <input
        type="text"
        name="job"
        className="popup__input popup__field-about"
        id="input-job"
        minLength="2"
        maxLength="400"
        value={description || ''}
        onChange={handleChangeAbout}
        required
      />
      <span
        className={`error ${ !errAbout ? "error_active" : ''}`}
        id="input-job-error"
      >
        {errAboutMes}
      </span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, onClickOverlay}) {
  const [isLoading, setIsLoading] = React.useState(false);

  const [link, setLink] = React.useState('');

  const [errLink, setErrLink] = React.useState(false);
  const [errLinkMes, setErrLinkMes] = React.useState('');

  React.useEffect(() => {
    if (isOpen) {
      setLink('');
      setIsLoading(false);
      setErrLink(false);
      setErrLinkMes('');
    }
  }, [isOpen]);

  function handleChangeAvatar(e) {
    setErrLink(e.target.validity.valid);
    setErrLinkMes(e.target.validationMessage);
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    onUpdateAvatar({
      avatar: link
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="AvatarEdit"
      button={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      isValid={errLink}
      onClose={onClose}
      onSubmit={handleSubmit}
      onClickOverlay={onClickOverlay}
    >
      <input
        type="url"
        name="avatar"
        className="popup__input popup__field_avatar-edit"
        placeholder="Ссылка на аватар"
        value={link}
        id="input-avatar"
        onChange={handleChangeAvatar}
        required
      />
      <span
        className={`error ${ !errLink ? "error_active" : ''}`}
        id="input-avatar-error"
      >
        {errLinkMes}
      </span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
import PopupWithForm from "./PopupWithForm";
import React from "react";

function DeletePopup({isOpen,onClose, onDeleteCard, onClickOverlay}) {
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setIsLoading(false);
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    onDeleteCard();
  }
  return(
    <PopupWithForm
      title="Вы уверены?"
      name="ElementDeleteImage"
      button={isLoading ? "Удаление..." : "Да"}
      isOpen={isOpen}
      onClose={onClose}
      isValid={true}
      onSubmit={handleSubmit}
      onClickOverlay={onClickOverlay}
    />
  )
}

export default DeletePopup;
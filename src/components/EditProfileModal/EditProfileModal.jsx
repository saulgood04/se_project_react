import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose, onSubmit, currentUser }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName(currentUser?.name || "");
      setAvatar(currentUser?.avatar || "");
    }
  }, [isOpen, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, avatar });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Change profile data"
      buttonText="Save Changes"
      onSubmit={handleSubmit}
    >
      <label className="modal__label">Name *</label>
      <input
        type="text"
        className="modal__input"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label className="modal__label">Avatar *</label>
      <input
        type="url"
        className="modal__input"
        placeholder="Avatar URL"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
      />
    </ModalWithForm>
  );
}

export default EditProfileModal;

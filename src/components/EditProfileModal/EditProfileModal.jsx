import React, { useState } from "react";

function EditProfileModal({ isOpen, onClose, onSubmit, currentUser }) {
  const [name, setName] = useState(currentUser?.name || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, avatar });
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}></button>
        <form className="modal__form" onSubmit={handleSubmit}>
          <h2 className="modal__title">Edit Profile</h2>
          <input
            type="text"
            className="modal__input"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="url"
            className="modal__input"
            placeholder="Avatar URL"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
          <button type="submit" className="modal__submit">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;

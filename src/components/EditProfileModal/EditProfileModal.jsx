import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose, onSubmit, currentUser }) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (isOpen) {
      setValues({
        name: currentUser?.name || "",
        avatar: currentUser?.avatar || "",
      });
    }
  }, [isOpen, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: values.name, avatar: values.avatar });
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
        value={values.name}
        onChange={handleChange}
        name="name"
      />
      <label className="modal__label">Avatar *</label>
      <input
        type="url"
        className="modal__input"
        placeholder="Avatar URL"
        value={values.avatar}
        onChange={handleChange}
        name="avatar"
      />
    </ModalWithForm>
  );
}

export default EditProfileModal;

import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";

const defaultValues = {
  name: "",
  avatar: "",
  email: "",
  password: "",
};

const RegisterModal = ({ isOpen, onRegister, onClose }) => {
  const { values, handleChange, setValues } = useForm(defaultValues);

  useEffect(() => {
    if (isOpen) {
      setValues(defaultValues);
    }
  }, [isOpen, setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values);
  }

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="register-name" className="modal__label">
        Name{" "}
        <input
          name="name"
          type="text"
          className="modal__input"
          id="register-name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL{" "}
        <input
          name="avatar"
          type="url"
          className="modal__input"
          id="register-avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-email" className="modal__label">
        Email{" "}
        <input
          name="email"
          type="email"
          className="modal__input"
          id="register-email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password{" "}
        <input
          name="password"
          type="password"
          className="modal__input"
          id="register-password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;

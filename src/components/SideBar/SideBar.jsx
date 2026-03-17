import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

export default function SideBar({ onSignOut, onEditProfileClick }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <aside className="sidebar">
     <div className="sidebar__profile">
  <img
    src={currentUser?.avatar}
    alt={currentUser?.name}
    className="sidebar__avatar"
  />
  <p className="sidebar__user-name">{currentUser?.name}</p>
</div>
   <div className="sidebar__buttons">
  <button className="sidebar__edit-profile" onClick={onEditProfileClick}>
    Change profile data
  </button>
  <button className="sidebar__sign-out" onClick={onSignOut}>
    Log Out
  </button>
</div>
    </aside>
  );}

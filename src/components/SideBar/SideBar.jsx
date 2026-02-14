import "./SideBar.css";
import avatar from "../../assets/avatar.png";

export default function SideBar({ onSignOut }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <p className="sidebar__user-name">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="sidebar__avatar" />
      </div>
      <button className="sidebar__sign-out" onClick={onSignOut}>
        Sign Out
      </button>
    </aside>
  );
}

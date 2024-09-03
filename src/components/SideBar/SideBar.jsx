import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function Sidebar() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={currentUser.avatar}
        alt="user avatar"
      />
      <p className="sidebar__username">{currentUser.name}</p>
      <button className="sidebar__profile-edit-btn" onClick={EditProfileModal}>
        Edit Profile
      </button>
      <button className="sidebar__logout">Log out</button>
    </div>
  );
}

export default Sidebar;

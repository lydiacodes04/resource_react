import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { useContext } from "react";
// handleSignOut

function Sidebar({ handleSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  console.log(currentUser);
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
      <button className="sidebar__logout" onClick={handleSignOut}>
        Log out
      </button>
    </div>
  );
}

export default Sidebar;

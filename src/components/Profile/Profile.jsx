import Sidebar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  handleSignOut,
  onCardLike,
  handleEditModal,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar
          handleSignOut={handleSignOut}
          handleEditModal={handleEditModal}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;

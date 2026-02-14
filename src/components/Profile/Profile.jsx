import { useState } from "react";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { updateUserProfile } from "../../utils/api";

export default function Profile({
  clothingItems,
  onCardClick,
  handleAddClick,
  onEditProfileClick,
  onCardLike,
  onSignOut,
}) {
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const handleEditProfileClick = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditProfileModalOpen(false);
  };

  const handleProfileSubmit = async (userData) => {
    try {
      await updateUserProfile(userData);
      setIsEditProfileModalOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <section className="profile">
      <SideBar onEditProfileClick={handleEditProfileClick} onSignOut={onSignOut} />
      <ClothesSection
        onCardClick={onCardClick}
        clothingItems={clothingItems}
        handleAddClick={handleAddClick}
        onCardLike={onCardLike}
      />
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleProfileSubmit}
        currentUser={{
          name: "Actual User Name",
          avatar: "https://example.com/user-avatar.jpg",
        }}
      />
    </section>
  );
}

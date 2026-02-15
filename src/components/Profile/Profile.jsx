import { useState } from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
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
  onUpdateUser,
}) {
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  const handleEditProfileClick = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditProfileModalOpen(false);
  };

  const handleProfileSubmit = async (userData) => {
try {
 const updatedUser = await updateUserProfile(userData);
 onUpdateUser(updatedUser); // Update the context
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
        currentUser={currentUser}
      />
    </section>
  );
}

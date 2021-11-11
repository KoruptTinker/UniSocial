import { useContext, useState, useEffect } from "react";
import UserContext from "../../context/UserContext";
import Avatar from "../Avatar/Avatar";
import { handleProfileUpdate } from '../../services/ProfileUpdate';
import EditAvatar from "../EditAvatar/EditAvatar";

const EditProfile = ({ user, close }) => {
  // const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [avatar, setAvatar] = useState(user.profilePicture);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("bio", bio);
    formData.append("avatar", avatarFile);
    const response = await handleProfileUpdate(formData);
  };

  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files[0]);
    setAvatarUrl(URL.createObjectURL(e.target.files[0]));
  };


  return (
    <div className="edit-profile">
      <div className="edit-profile__avatar" class="relative inline-block">
        <EditAvatar src={avatar} />
      </div>
      <form className="edit-profile__form" onSubmit={handleSubmit}>
        <div className="edit-profile__form-group bg-gray-200 placeholder-gray-600  rounded-lg h-12 w-full font-noto text-sm font-medium"
          type="text">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="edit-profile__form-group bg-gray-200 placeholder-gray-600  rounded-lg h-12 w-full font-noto text-sm font-medium"
          type="text">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="edit-profile__form-group bg-gray-200 placeholder-gray-600  rounded-lg h-12 w-full font-noto text-sm font-medium"
          type="text">
          <label htmlFor="bio">Bio</label>
          <input
            type="text"
            id="bio"
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="mr-0 ml-auto ">
          <p className="text-xl" onClick={close}>
            X
          </p>
        </div>
        <div className="edit-profile__form-group">
          <button className="edit-profile" onClick={() => handleProfileUpdate(bio, name, avatar, username)}>
            Save
            {/* {isLoading ? "Loading..." : "Save"} */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
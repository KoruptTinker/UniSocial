import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import UserContext from "../../context/UserContext";
import Avatar from "../Avatar/Avatar";
import { handleProfileUpdate } from '../../services/ProfileUpdate';
import EditAvatar from "../EditAvatar/EditAvatar";

const EditProfile = ({ user, close }) => {
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [avatar, setAvatar] = useState(user.profilePicture);

  return (
    <div className="edit-profile">
      <div className="edit-profile__avatar" class="relative inline-block">
        <EditAvatar src={avatar} />
      </div>
      <form className="edit-profile__form">
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
            <Link href={`/${user.username}`}>
              X
            </Link>
          </p>
        </div>
        <div className="edit-profile__form-group">
          <button className="edit-profile" onClick={async (e) => {
            e.preventDefault();
            await handleProfileUpdate(bio, name, username);
          }}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
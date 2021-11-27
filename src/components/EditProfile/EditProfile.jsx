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
  const [redirect, setRedirect] = useState(false);

  return (
    <div className="w-full bg-white rounded-lg p-4 shadow-2xl">
      <Link href={`/${redirect ? username : user.username}`}>
        <div className="mr-0 ml-auto ">
          <p className="text-xl text-right cursor-pointer" onClick={close}>
            X
          </p>
        </div>
      </Link>
      <div className="w-full flex flex-row pb-4">
        <EditAvatar src={avatar} />
      </div>
      <form>
        <div className="flex flex-col rounded-lg h-12 w-full font-noto text-lg font-medium">
          <label htmlFor="name">Name</label>
          <input
            className="w-full h-12 rounded-lg p-2 border-2 border-gray-400"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col rounded-lg h-12 w-full font-noto text-lg font-medium mt-6">
          <label htmlFor="username">Username</label>
          <input
            className="w-full h-12 rounded-lg p-2 border-2 border-gray-400"
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col rounded-lg h-12 w-full font-noto text-lg font-medium mt-6">
          <label htmlFor="bio">Bio</label>
          <input
            className="w-full h-12 rounded-lg p-2 border-2 border-gray-400"
            type="text"
            id="bio"
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <button className="h-full w-full px-4 mt-4 py-2 text-white rounded bg-blue-500" onClick={async (e) => {
            e.preventDefault();
            const response = await handleProfileUpdate(bio, name, username);
            setRedirect(response.success);
          }}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
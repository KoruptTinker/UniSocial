import CircularProgress from "@material-ui/core/CircularProgress";
import PhotoIcon from "@material-ui/icons/Photo";
import link from "next/link";
import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../context/UserContext";
import firebase from "../../firebase/init";
import { handleProfileUpdate, updateProfilePicture } from "../../services/ProfileUpdate";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [fileLink, setFileLink] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = React.createRef();

  const uploadImage = async () => {
    setIsUploading(true);
    const storageRef = firebase.storage().ref("profile_pictures/" + file.name);
    const task = await storageRef.put(file);
    const link = await storageRef.getDownloadURL("profile_pictures/" + file.name);
    setFileLink(link);
    await updateProfilePicture(link);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    setIsUploading(false);
  }, [fileLink]);

  return (
    <div class="flex justify-center w-full">
      <div class="w-full rounded-lg shadow-xl bg-gray-50">
        <div class="m-4">
          <div class="flex justify-center">
            <label class="inline-block mb-4 text-gray-500">File Upload</label>
          </div>
          <div class="flex items-center justify-center w-full">
            <label
              class="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
              <div class="flex flex-col items-center justify-center pt-7">
                <svg xmlns="http://www.w3.org/2000/svg" className="mt-6 w-8 h-8 text-gray-400 group-hover:text-gray-600"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p class="mt-1 pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                  Attach a file</p>
              </div>
              <input type="file" class="opacity-0"
                hidden
                onChange={(e) => handleFileChange(e)}
                ref={fileInputRef}
              />
              {file && file.name}
            </label>
          </div>
        </div>
        <div class="flex justify-center p-2">
          <button disabled={isUploading} class={`w-full px-4 py-2 text-white rounded shadow-xl ${isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"}`} type="submit" onClick={async () => await uploadImage()}>{isUploading ? "Uploading" : "Upload"}</button>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
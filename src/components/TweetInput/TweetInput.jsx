import CircularProgress from "@material-ui/core/CircularProgress";
import PhotoIcon from "@material-ui/icons/Photo";
import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import firebase from "../../firebase/init";
import postTweet from "../../services/PostTweet";
import Avatar from "../Avatar/Avatar";

const TweetInput = () => {
  const { user } = useContext(UserContext);
  const [tweet, setTweet] = useState("");
  const [imgLink, setImgLink] = useState(null);
  const [file, setFile] = useState(null);
  const [tweeting, setTweeting] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  const fileInputRef = React.createRef();

  const uploadFile = async () => {
    const storageRef = firebase.storage().ref("tweets/" + file.name);
    const task = await storageRef.put(file);
    const link = await storageRef.getDownloadURL("tweets/" + file.name);
    return link;
  };

  return (
    <div className=" bg-white rounded-lg h-auto overflow-hidden ">
      <div className="p-5">
        <div className="flex flex-row my-5">
          <div className="w-20 h-20 rounded-lg overflow-hidden">
            {user && <Avatar src={user.profilePicture} />}
          </div>
          <div className="w-full mx-5">
            <div className="flex flex-col">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  async function postTweetandUploadFile() {
                    setTweeting(true);
                    let imgLink = null;
                    if (file) {
                      imgLink = await uploadFile();
                    }
                    await postTweet(user.uid, tweet.trim(), imgLink);
                    setTweeting(false);
                    setFile(null);
                    setTweet("");
                    setImgLink(null);
                  }
                  postTweetandUploadFile();
                }}>
                <textarea
                  className="w-full h-16 font-noto font-medium text-base text-gray-500"
                  name="tweet-input"
                  placeholder="What's Happening?"
                  type="text"
                  value={tweet}
                  onChange={(e) => {
                    setTweet(e.target.value);
                    setIsEnabled(tweet.length < 280);
                  }}
                  required></textarea>
                <div className="flex items-center mt-3">
                  <div className="mx-2">
                    <input
                      type="file"
                      hidden
                      onChange={(e) => setFile(e.target.files[0])}
                      ref={fileInputRef}
                    />
                    <span className="hover:bg-gray-200 p-2 cursor-pointer">
                      <PhotoIcon
                        onClick={() => fileInputRef.current.click()}
                        style={{ color: "#3182ce" }}
                      />
                    </span>
                    {file && file.name}
                  </div>
                  <div className="mr-0 ml-auto">
                    <CircularProgress
                      className="w-5 h-5"
                      variant="determinate"
                      value={isEnabled ? (tweet.length / 280) * 100 : 100}
                      color={tweet.length < 270 ? "primary" : "secondary"}
                    />
                  </div>
                  <div className="mr-0 ml-5">
                    <button
                      disabled={!isEnabled}
                      className={`bottom-0 relative text-white px-8 py-4 rounded-md ${isEnabled ? tweeting
                        ? "bg-blue-300 cursor-not-allowed"
                        : "bg-primary"
                        : "bg-gray-400 cursor-not-allowed"
                        }`}
                      type="submit">
                      {tweeting ? "Tweeting...." : "Tweet"}
                      {tweeting && (
                        <span
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: " translate(-50%, -50%)",
                          }}>
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetInput;

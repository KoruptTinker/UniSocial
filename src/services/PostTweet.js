import firebase from "../firebase/init";
import { getTopics } from "./FetchTopics";

const postTweet = async (
  authorId,
  text,
  imgLink = null,
  parentTweet = null
) => {
  const topics = await getTopics(text);
  console.log(authorId, text, imgLink, parentTweet);
  await firebase.firestore().collection("tweets").add({
    authorId,
    text,
    parentTweet,
    imgLink,
    topics,
    createdAt: firebase.firestore.Timestamp.now(),
  });
};

export default postTweet;

import firebase from "../firebase/init";

const getUnique = (value, index, self) => {
  return self.indexOf(value) === index;
}

const removeDuplicates = (topics) => {
  for(let i = 0; i< topics.length; i++){
    topics[i] = topics[i].toLowerCase();
  }
  const uniqueTopics = topics.filter(getUnique);
  return uniqueTopics;
}

const getTopics = async (tweet) => {
  const topics = tweet.match(/#[a-z]+/gi);
  const uniqueTopics = removeDuplicates(topics || []);
  for(const topic of uniqueTopics){
    const docRef = await firebase.firestore().collection('topics').doc(topic).get();
    await firebase.firestore().collection('topics').doc(topic).set({
      total_count: firebase.firestore.FieldValue.increment(1),
      monthly_count: firebase.firestore.FieldValue.increment(1),
      weekly_count: firebase.firestore.FieldValue.increment(1),
      daily_count: firebase.firestore.FieldValue.increment(1),
      hourly_count: firebase.firestore.FieldValue.increment(1),
      score: docRef.exists ? (0.05 * docRef.data().total_count) + (0.10 * docRef.data().monthly_count) + (0.15 * docRef.data().weekly_count) + (0.30 * docRef.data().daily_count) + (0.40 * docRef.data().hourly_count) + 1 : 1
    },
    {
      merge: true
    });
  }
  return uniqueTopics;
}

const getTrending = async () => {
  const trendingSnapshot = await firebase.firestore().collection('trending').get();
  const query = trendingSnapshot.docs;
  const result = [];
  for(const topic of query){
    const temp = {
      topic: topic.data().topic,
      count: topic.data().count,
    }
    result.push(temp);
  }
  return result;
}

export {
  getTopics,
  getTrending
};
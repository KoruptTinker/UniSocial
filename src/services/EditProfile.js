import firebase from "../firebase/init";

const ProfileUpdate = (updated_biography) => {
    try{
        const user = firebase.auth().currentUser;
        if (user != null) {
        const editProfile = async (
            updated_biography,
        ) => {
                await firebase.firestore.collection("users").doc(user.uid).update({
                bio: updated_biography 
                });
            };
        }
        else{
            console.log("user is null");
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}
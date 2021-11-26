import firebase from "../firebase/init";

const handleProfileUpdate = async (
    updated_biography,
    updated_name,
    updated_profilePicture,
    updated_accountHandle
) => {
    const user = await firebase.auth().currentUser;
    if (updated_biography && updated_name && updated_accountHandle && updated_profilePicture) {
        const temp = await firebase.firestore().collection("users").doc(user.uid).update({
            bio: updated_biography,
            name: updated_name,
            profilePicture: updated_profilePicture,
            accountHandle: updated_accountHandle
        });
        return { success: true, data: temp };
    }
    else {
        return { success: false, data: {} };
    }
};

const updateProfilePicture = async (
    updated_profilePicture,
) => {
    console.log(updated_profilePicture);
    const user = await firebase.auth().currentUser;
    if (updated_profilePicture) {
        const temp = await firebase.firestore().collection("users").doc(user.uid).set({
            profilePicture: updated_profilePicture,
        },
        {
          merge: true
        });
        return { success: true, data: temp };
    }
    else {
        return { success: false, data: {} };
    }
};

export { handleProfileUpdate, updateProfilePicture }
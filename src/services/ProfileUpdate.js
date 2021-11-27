import firebase from "../firebase/init";

const handleProfileUpdate = async (
    updated_biography,
    updated_name,
    updated_accountHandle
) => {
    const user = await firebase.auth().currentUser;
    if (updated_biography && updated_name && updated_accountHandle) {
        const temp = await firebase.firestore().collection("users").doc(user.uid).update({
            bio: updated_biography,
            name: updated_name,
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
    const user = await firebase.auth().currentUser;
    if (updated_profilePicture) {
        const temp = await firebase.firestore().collection("users").doc(user.uid).update({
            profilePicture: updated_profilePicture,
        });
        return { success: true, data: temp };
    }
    else {
        return { success: false, data: {} };
    }
};

export { handleProfileUpdate, updateProfilePicture }
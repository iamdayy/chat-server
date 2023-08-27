import { ServiceAccount,  initializeApp } from "firebase-admin/app";
import { credential } from "firebase-admin";
import credentialPass from "../assets/credential-firebase-adminsdk.json"

export default initializeApp({
    credential: credential.cert(credentialPass as ServiceAccount),
    databaseURL: "https://chat-on-dayy-default-rtdb.asia-southeast1.firebasedatabase.app"
})
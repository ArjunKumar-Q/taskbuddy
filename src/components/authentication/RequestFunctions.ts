import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, User } from "firebase/auth";
import { app, db } from "@/firebase";
import { Task } from "../List/ListItem";

const Auth = getAuth(app);

async function getTasks(queryFor: string) {
  const docResults = await getDoc(
    doc(db, "users", (Auth.currentUser as User).uid)
  );
  return docResults.data()?.todos[queryFor];
}

async function updatePositions(updatedArray: Task[], queryToken:string) {
  await updateDoc(doc(db, "users", (Auth.currentUser as User).uid), {
    [`todos.${queryToken}`]: updatedArray,
  });
}

export { getTasks, updatePositions, Auth };

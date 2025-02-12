import { auth, db } from "../../firebase";
import google from "../../assets/google.svg";
import preview from "../../assets/preview.svg";
import logo from "../../assets/logo.svg";
import Logo from "../icons/Logo";

import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  useEffect,
  useState,
  useActionState,
  useTransition,
  type ReactNode,
} from "react";
import { useToast } from "@/hooks/use-toast";


function FirebaseWrapper({ children }: { children: ReactNode }) {
  const [isPending, startTransition] = useTransition();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const [state, submitAction] = useActionState(
    async (prevState, formData) => {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const userID = result.user.uid;

        const docRef = doc(db, "users", userID);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setDoc(docRef, {
            name: result.user.displayName,
            todos: {
              todo: [],
              completed: [],
              "in-progress": [],
            },
          });
        }

        return { success: true };
      } catch (error) {
        console.log(error);
        toast({
          title: "Something went Wrong",
          description: error.message,
        });
        return { success: false };
      }
    },
    { success: null, message: "" }
  );

  const handleSignIn = () => {
    startTransition(() => {
      submitAction(); // Triggers the sign-in process
    });
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading while checking auth state
  }

  if (!user) {
    return (
      <div className="h-screen  bg-[#FFF9F9] flex justify-center items-center lg:justify-none lg:items-none  ">
        <div
          id="login-form"
          className=" flex flex-col gap-y-8 w-full lg:w-2/5  p-2 lg:p-10 xl:p-20"
        >
          <div className="flex flex-col gap-y-2 items-center lg:items-start">
            <div className="flex gap-x-1 ">
              {/* <img src={logo} alt="TaskBuddy"  /> */}
              <Logo className="h-8 w-8 fill-[#7b1984] " />
              <p className="text-[#7B1984] text-2xl font-[Urbanist] font-bold">
                TaskBuddy
              </p>
            </div>
            <p className="font-[Urbanist] font-medium text-black text-xs text-center lg:max-w-xs lg:text-justify">
              Streamline your workflow and track progress effortlessly with our
              all-in-one task management app.
            </p>
          </div>
          <button
            className="flex gap-2 p-4 rounded-2xl bg-[#292929] h-14 justify-center items-center w-3/4 mx-auto lg:w-full"
            onClick={handleSignIn}
            disabled={isPending}
          >
            <img
              src={google}
              alt="TaskBuddy"
              className="text-red-400"
              style={{
                color: "#7B1984",
              }}
            />
            <span className="text-white font-[Urbanist] font-bold">
              {isPending ? "Signing in..." : "Continue with Google"}
            </span>
          </button>
        </div>
        <div
          id="app-preview-image"
          className="hidden lg:flex w-4/5 h-full overflow-hidden items-center justify-end  relative "
        >
          <img
            src={preview}
            alt=""
            className=" scale-90 translate-x-20 translate-y-5 xl:scale-95 xl:translate-x-10 z-10 "
          />
          <div className="w-96 h-96 border-[#7B1984] border rounded-full scale-[275%] absolute top-56 "></div>
          <div className="w-96 h-96 border-[#7B1984] border rounded-full scale-[230%] absolute top-56 "></div>
          <div className="w-96 h-96 border-[#7B1984] border rounded-full scale-[180%] absolute top-56 "></div>
        </div>
      </div>
    );
  }
  return <div>{children}</div>;
}

export default FirebaseWrapper;

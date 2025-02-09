import { signOut } from "@firebase/auth";
import { auth } from "./firebase";
import { Header,MainContext } from "./components/default";


function App() {
  console.log(auth.currentUser);
  const onSignOutHandler = async () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  console.log("App rendered");  
  return (
    <>
      <div className="min-h-screen max-h-fit  bg-white text-black lg:p-4 lg:pt-10 lg:px-8 overflow-y-auto">
       <Header/>
       <div className="mt-4"></div>
       <MainContext/>
      </div>
      
    </>
  );
}

export default App;


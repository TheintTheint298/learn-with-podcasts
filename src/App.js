import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function App() {
  const [user, setUser] = useState({});
  const handleCallBack = (res) => {
    let user = jwtDecode(res.credential);
    setUser(user);
  };
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "574602703280-5ek37ebton0o86irqtfhcv9r2ef0qqlv.apps.googleusercontent.com",
      callback: handleCallBack,
    });
    google.accounts.id.renderButton(document.getElementById("SignIn"), {
      theme: "outline",
      size: "large",
    });
  }, []);
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-1xl mt-5 py-2 text-center">Learn With Podcasts</h1>
      <div id="SignIn"></div>
      {user && (
        <>
          <img src={user.picture} alt="User Profile" />
          <h3>{user.name}</h3>
        </>
      )}
    </div>
  );
}

export default App;

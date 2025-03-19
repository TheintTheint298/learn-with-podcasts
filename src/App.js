import { useEffect, useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "./contexts/UserContexts";
import Header from "./components/Header";

function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [data, setData] = useState([]);
  console.log(data);
  const signInButton = useRef();

  const handleCallBack = (res) => {
    let user = jwtDecode(res.credential);
    setUser(user);
    setLoggedIn(true);
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "574602703280-5ek37ebton0o86irqtfhcv9r2ef0qqlv.apps.googleusercontent.com",
      callback: handleCallBack,
    });
    google.accounts.id.renderButton(signInButton.current, {
      theme: "outline",
      size: "large",
    });
  }, [loggedIn]);

  const rssFeed = "https://cdn.atp.fm/rss/public?m2swoudx";
  useEffect(() => {
    fetch(rssFeed)
      .then((res) => res.text())
      .then((str) => {
        const parser = new window.DOMParser();
        const data = parser.parseFromString(str, "text/xml");
        const itemList = data.querySelectorAll("item");
        const items = [];
        itemList.forEach((el) => {
          items.push({
            title: el.querySelector("title").innerHTML,
            pubDate: new Date(el.querySelector("pubDate").textContent),
            mp3: el.querySelector("enclosure").getAttribute("url"),
            link: el.querySelector("link").innerHTML,
          });
        });
        setData(items);
      });
  }, [rssFeed]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Header
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        signInButton={signInButton}
      />
    </UserContext.Provider>
  );
}

export default App;

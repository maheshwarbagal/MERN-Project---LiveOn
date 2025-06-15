import { Link } from "react-router-dom";
import "./navbar.css";

function Navbars() {
  return (
    <div id="backnav">
      <div id="leftside">
        <p>
          <i className="ri-netease-cloud-music-fill"></i>TheJam
        </p>
      </div>
      <div id="rightside">
        <Link to="/">Home</Link>
        <Link to="/ArtistPage">Artists</Link>
        <Link to="/EventsPage">Events</Link>
        <Link to="/AboutPage">About Us</Link>
        <Link to="/LoginPage"><button className="button button1">Login</button></Link>
        
      </div>
    </div>
  );
}

export default Navbars;

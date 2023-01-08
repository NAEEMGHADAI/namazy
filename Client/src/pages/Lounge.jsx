import { Link } from "react-router-dom";

const Lounge = () => {
  return (
    <section>
      <h1>The Lounge</h1>
      <br />
      <p>Admins and Editors can hang out here.</p>
      <div className="flexGrow">
        <Link to="/linkpage">Link Page</Link>
      </div>
    </section>
  );
};

export default Lounge;

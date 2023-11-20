import React, { useState } from "react";
import "./Profile.css";
const Profile = () => {
  const [data, setData] = useState({});
  //   console.log(data);
  const [username, setUsername] = useState("");
  const [repositories, setRepositories] = useState([]);

  const handleChange = async (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profile = await fetch(`https://api.github.com/users/${username}`);
    const profileJson = await profile.json();
    // console.log(profileJson);

    const repositories = await fetch(profileJson.repos_url);
    const repoJson = await repositories.json();
    // console.log(repoJson);

    if (profileJson) {
      setData(profileJson);
      setRepositories(repoJson);
    }
  };
  return (
    <div>
      <input type="text" value={username} onChange={handleChange} />
      <button type="submit" onClick={handleSubmit}>
        Search
      </button>
      <div className="wrapper">

        <div className="image">
          {data.avatar_url && <img src={data.avatar_url} />}
        </div>

        <div className="items">
          <div><b>Name: </b> {data.name}</div>
          <div><b>Followers: </b>{data.followers}</div>
          <div><b>Following: </b>{data.following}</div>
          <div><b>Location: </b>{data.location}</div>
        </div>

        <div className="repositories">
        <h2>Repositories:</h2>
        <div>
          {repositories.map((repo) => (
            <div key={repo.id}>{repo.name}</div>
          ))}
        </div>
      </div>
      </div>

    </div>
  );
};

export default Profile;

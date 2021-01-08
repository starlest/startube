import React from "react";
import YouTube from "react-youtube";
import "./App.css";

function App() {
  const [query, setQuery] = React.useState("");
  const [list, setList] = React.useState(null);
  const search = (e) => {
    e.preventDefault();
    searchYouTube(query).then(setList);
  };

  return (
    <div className="app">
      <h1>StarTube</h1>

      <form onSubmit={search}>
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>Search</button>
      </form>

      {list &&
        (list.length === 0 ? (
          <p>No results</p>
        ) : (
          <ul className="items">
            {list.map((item) => (
              <li className="item" key={item.id}>
                <div>
                  <b>{item.title}</b>
                  <p>{item.description}</p>
                </div>
                <ul className="meta">
                  <li>
                    By: <a href={item.author.ref}>{item.author.name}</a>
                  </li>
                  <li>Views: {item.views}</li>
                  <li>Duration: {item.duration}</li>
                  <li>Uploaded: {item.uploaded_at}</li>
                </ul>
                <div className="player">
                  <YouTube videoId={item.id} />
                </div>
              </li>
            ))}
          </ul>
        ))}
    </div>
  );
}

async function searchYouTube(q) {
  q = encodeURIComponent(q);
  const response = await fetch(
    "https://youtube-search-results.p.rapidapi.com/youtube-search/?q=" + q,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "youtube-search-results.p.rapidapi.com",
        "x-rapidapi-key": "mjsXTeaPTVmshPdoJEP7FU4jIyo1p1tpRh3jsnTP6MFClmeLFu",
      },
    }
  );
  const body = await response.json();
  console.log(body);
  return body.items.filter((item) => item.type === "video");
}

export default App;

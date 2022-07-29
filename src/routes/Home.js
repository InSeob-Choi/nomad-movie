import { useEffect, useState } from "react";
import Movie from "../components/Movie";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year"
      )
    ).json();
    // const res = await fetch(
    //   "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year"
    // );
    // const json = await res.json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  });
  // useEffect(() => {
  //   fetch(
  //     "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year"
  //   )
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setMovies(json.data.movies);
  //       setLoading(false); // 이게 fetch 안에 있어야, fetch한 뒤에 false가 됨. fetch 바깥에 있으면 fetch보다 먼저 실행되어 항상 false인 상태로 되어버림.
  //     });
  // }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1 style={{ color: "lightGray" }}>Movies</h1>
          {movies.map((item) => (
            <Movie
              key={item.id}
              id={item.id}
              coverImg={item.medium_cover_image}
              title={item.title}
              summary={item.summary}
              genres={item.genres}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default Home;

import { Grid, Input, Typography } from "@mui/material";
import Head from "next/head";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import NewsCard from "../components/NewsCard";
import { selectNews, setNews } from "../features/newsSlice";
import { fetchLatestNews, fetchNews } from "../lib/fetchNews";
import styles from "../styles/Home.module.css";

export async function getStaticProps(context) {
  const data = await fetchLatestNews();
  return {
    props: {
      news: data,
    },
  };
}

export default function Home(props) {
  const dispatch = useDispatch();
  const news = useSelector(selectNews);
  const [searchLoading, setSearchLoading] = useState(false);

  const fetchNewsResults = async () => {
    setSearchLoading(true);
    const data = await fetchNews(query);
    setSearchLoading(false);
    dispatch(setNews(data));
  };
  const [query, setQuery] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchNewsResults();
    }
  };
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Grid container px={4} py={2} flexDirection="column">
          <Typography className={styles.heading} fontSize={45}>
            Hacker News
          </Typography>
          <Grid
            container
            style={{ position: "relative" }}
            width="fit-content"
            mt={2}
          >
            <input
              className={styles.mainInput}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <FaSearch
              style={{
                position: "absolute",
                top: "10",
                right: "10",
                fontSize: "30px",
                cursor: "pointer",
              }}
              onClick={fetchNewsResults}
            />
          </Grid>

          {news.length > 0 || searchLoading ? (
            <>
              <Typography className={styles.heading} fontSize={35} mt={4}>
                Searched News
              </Typography>
              {searchLoading ? (
                <Typography color="#fff" fontSize={30}>
                  Loading...
                </Typography>
              ) : (
                <Grid container rowSpacing={6} columnSpacing={2} mt={2}>
                  {news.map((item) => (
                    <Grid item xs={4} key={item.objectID}>
                      <NewsCard item={item} href={`/news/${item.objectID}`} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </>
          ) : (
            <>
              <Typography className={styles.heading} fontSize={35} mt={4}>
                Latest News
              </Typography>

              <Grid container rowSpacing={6} columnSpacing={2} mt={2}>
                {props.news.map((item) => (
                  <Grid item xs={4} key={item.objectID}>
                    <NewsCard item={item} href={`/news/${item.objectID}`} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Grid>
      </main>
      <footer className={styles.footer}>Developed by Siddhant Mishra</footer>
    </div>
  );
}

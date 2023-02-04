import React, { useState } from "react";
import { useRouter } from "next/router";
import { fetchNewsDetails } from "../../lib/fetchNews";
import { Button, Grid, Typography } from "@mui/material";
import Comment from "../../components/Comment";

export const getServerSideProps = async (context) => {
  const pageId = context.params.id;
  const newsDetails = await fetchNewsDetails(pageId);
  return {
    props: {
      newsDetails,
    },
  };
};

const NewsDetail = (initialProps) => {
  const router = useRouter();
  const { title, url, points, children } = initialProps.newsDetails;

  const [commentIdArr, setCommentIdArr] = useState([]);

  const handleCommentClick = (id) => {
    if (commentIdArr.some((item) => item === id)) {
      const updatedCommentArr = commentIdArr.filter((item) => item !== id);
      setCommentIdArr([...updatedCommentArr]);
    } else {
      const updatedCommentArr = [...commentIdArr, id];
      setCommentIdArr([...updatedCommentArr]);
    }
  };

  const checkCommentOpen = (id) => {
    return commentIdArr.some((item) => item === id);
  };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container px={4} flexDirection="column" rowGap={6} pt={10}>
      <Grid item xs={12}>
        <Typography fontSize={35} color="#fff" textAlign={"center"}>
          {title}
        </Typography>
      </Grid>
      <Grid container item xs={12} justifyContent="space-between">
        <Grid item>
          <Typography fontSize={15} color="#fff">
            Points: {points}
          </Typography>
        </Grid>
        <Grid item>
          <a target="_blank" href={url}>
            <Button
              variant="outlined"
              style={{ border: "1px solid #f75961", color: "#f75961" }}
            >
              Visit News
            </Button>
          </a>
        </Grid>
      </Grid>
      <Grid container item rowGap={4}>
        {children.length > 0 &&
          children.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              checkCommentOpen={checkCommentOpen}
              handleCommentClick={handleCommentClick}
            />
          ))}
      </Grid>
    </Grid>
  );
};

export default NewsDetail;

import { Grid, Typography } from "@mui/material";
import React from "react";

const Comment = ({ comment, handleCommentClick, checkCommentOpen }) => {
  return (
    <Grid
      container
      item
      px={2}
      py={2}
      style={{
        borderBottom: "1px solid white",
        cursor: "pointer",
      }}
      onClick={() => handleCommentClick(comment.id)}
    >
      <div
        style={{ color: "#fff" }}
        dangerouslySetInnerHTML={{ __html: comment.text }}
      />
      {comment.children.length > 0 &&
        checkCommentOpen(comment.id) &&
        comment.children.map((item) => (
          <Comment
            comment={item}
            checkCommentOpen={checkCommentOpen}
            handleCommentClick={handleCommentClick}
          />
        ))}
    </Grid>
  );
};

export default Comment;

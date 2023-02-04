import { Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { formatDate } from "../../utils/formatDate";
import styles from "./style.module.css";

const NewsCard = ({ item, href }) => {
  const { title, created_at, url } = item;

  return (
    <Grid
      container
      className={styles.main}
      px={2}
      py={2}
      minHeight={"250px"}
      flexDirection="column"
      justifyContent={"space-between"}
      rowSpacing={2}
    >
      <Grid item>
        <Typography color={"#fff"} fontSize={25}>
          {" "}
          {title}
        </Typography>
      </Grid>
      <Grid item>
        <Typography color={"#fff"} fontWeight={200} fontSize={14}>
          {" "}
          {formatDate(created_at)}
        </Typography>
      </Grid>
      <Grid
        item
        container
        xs={12}
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Grid item>
          <a target="_blank" href={url}>
            <Button variant="outlined" className={styles.btn_outlined}>
              Visit News
            </Button>
          </a>
        </Grid>
        <Grid item>
          <Link href={href}>
            <Button variant="contained" className={styles.btn_contained}>
              View Details
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewsCard;

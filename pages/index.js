/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import styles from '../styles/Home.module.css'
import fs from "fs"
import {displayPost} from "./hilfen"

export async function getServerSideProps() {
  const token = fs.readFileSync("token.txt", "utf8");
  const res = await fetch("https://youjo.love/api/v1/timelines/home?limit=40", {headers: {Authorization: token}}).then();
  const timeline = await res.json();
  return {
    props: {
      timeline
    }
  };
}

export default function Home({timeline}) {
  return (
    <div className={styles.container}>
      {timeline.map(post => displayPost(post))}
    </div>
  )
}

/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import styles from '../styles/Home.module.css'
import fs from "fs"

export async function getStaticProps() {
  const token = fs.readFileSync("token.txt", "utf8");
  const res = await fetch("https://youjo.love/api/v1/timelines/home", {headers: {Authorization: token}}).then();
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
      {timeline.map(post => {
        let content = "";
        if (post.reblog) {
          content = "boosted"
        } else {
          content = post.pleroma.content["text/plain"];
        }
        return (
          <div className={styles.post}>
            <div className="username"><a href={post.account.url}><b>{post.account.acct}</b></a></div>
            <div className="com">{content}</div>
            <div>{post.reblogged}</div>
          </div>
      )})}
    </div>
  )
}

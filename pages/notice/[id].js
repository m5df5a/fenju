/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import styles from '../../styles/Home.module.css'
import fs from "fs"
import {displayPost} from "../hilfen"

export async function getServerSideProps({params}) {
  const token = fs.readFileSync("token.txt", "utf8");
  const res = await fetch(`https://youjo.love/api/v1/statuses/${params.id}/context`, {headers: {Authorization: token}}).then();
  const timeline = await res.json();
  const res_post = await fetch(`https://youjo.love/api/v1/statuses/${params.id}`, {headers: {Authorization: token}}).then();
  const main_post = await res_post.json();
  
  return {
    props: {
      timeline,
      main_post
    }
  };
}

export default function notice({timeline, main_post}) {
  return (
    <div className={styles.container}>
      {timeline.ancestors.map(post => displayPost(post))}
      {displayPost(main_post, true)}
      {timeline.descendants.map(post => displayPost(post))}
      <script type="text/javascript" src="../vanilla-tilt.min.js"></script>
    </div>
  )
}

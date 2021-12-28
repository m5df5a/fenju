/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import styles from '../../styles/Home.module.css'
import fs from "fs"

export async function getServerSideProps({params}) {
  const token = fs.readFileSync("token.txt", "utf8");
  const res = await fetch(`https://youjo.love/api/v1/statuses/${params.id}/context`, {headers: {Authorization: token}}).then().catch(x => console.log(x));
  const timeline = await res.json();
  console.log(timeline)
  return {
    props: {
      timeline
    }
  };
}

export default function notice({timeline}) {
  function make(post) {
    let media = <></>;
    if (post.media_attachments[0]?.pleroma.mime_type.includes("image")) {
      media = (
        <a href={post.media_attachments[0]?.url} target="_blank">
          <img src={post.media_attachments[0]?.preview_url}/>
        </a>
      );
    } else if (post.media_attachments[0]?.pleroma.mime_type.includes("video")) {
      media = (
        <video controls>
          <source src={post.media_attachments[0]?.url}/>
        </video>
      );
    }

    return (
      <div className={styles.post} onClick={() => location.href = `http://127.0.0.1:3000/notice/${post.id}`}>
        <div className="username"><b><a href={post.account.url}>{post.account.acct}</a></b></div>
        <div className="time">{post.created_at}</div>
        <br/>
        {media}
        <div className="com" dangerouslySetInnerHTML={{ __html: post.content }}></div>
        <div>{post.reblogged}</div>
      </div>
  )}
  return (
    <div className={styles.container}>
      {timeline.ancestors.map(post => make(post))}
      {timeline.descendants.map(post => make(post))}
    </div>
  )
}

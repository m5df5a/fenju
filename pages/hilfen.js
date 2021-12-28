import styles from '../styles/Home.module.css'
const domain = "http://127.0.0.1:3000"

export function displayPost(post, mainPost=false) {
  let _style = {};
  if (mainPost) {
    _style = {"background-color": "#c1117c"};
  }
  // if (post.visibility != "public")
  //    return (<></>);
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
    <div className={styles.post} onClick={() => location.href = `${domain}/notice/${post.id}`} style={_style}>
      <div className={styles.username}><a href={post.account.url}>{post.account.acct}</a></div>
      <div className="time">{post.created_at}</div>
      <br/>
      {media}
      <div className="com" dangerouslySetInnerHTML={{ __html: post.content }}></div>
      <div>{post.reblogged}</div>
    </div>
)}
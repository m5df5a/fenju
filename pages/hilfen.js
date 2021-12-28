import styles from '../styles/Home.module.css'
const domain = "http://127.0.0.1:3000"

export function displayPost(post, mainPost=false) {
  let _style = {};
  if (mainPost) {
    _style = {"background-color": "#272a36"};
  }
  if (post.account.acct == "Chizu") {
    _style = {border: "3px solid #ffd700", ..._style};
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
      <div className={styles.userinfo}>
        <img className={styles.pfp} src={post.account.avatar}/>
        <div className={styles.username}>{post.account.display_name} <a href={post.account.url}>{"@"+post.account.acct}</a></div>
        <div className={styles.time}>{/\d{2}:\d{2}:\d{2}/.exec(post.created_at)[0]}</div>
      </div>
      <br/>
      {media}
      <div className="com" dangerouslySetInnerHTML={{ __html: post.content }}></div>
      <div>{post.reblogged}</div>
    </div>
)}

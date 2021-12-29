import styles from '../styles/Home.module.css'
export const domain = "http://127.0.0.1:3000"

export function displayPost(post, mainPost=false) {
  let boosted = <></>;
  if (post.reblog) {
    boosted = <div>Boosted by: {post.account.display_name} <a href={post.account.url}>{"@"+post.account.acct}</a></div>
    post = post.reblog;
  }
  let _style = {};
  if (mainPost)
    _style = {"background-color": "#272a36"};
  if (post.account.acct == "Chizu")
    _style = {border: "3px solid #ffd700", ..._style};
  // if (post.visibility != "public")
  //    return (<></>);

  const media = () => {
    return post.media_attachments.map(attachment => {
      let _media = <></>
      if (attachment.pleroma.mime_type.includes("image")) {
        _media = (
          <a href={attachment.url} target="_blank">
            <img className={styles.media} src={attachment.preview_url}/>
          </a>
        );
      } else if (attachment.pleroma.mime_type.includes("video")) {
        _media = (
          <video className={styles.media} controls>
            <source src={attachment.url}/>
          </video>
        );
      }
      return _media;
    })
  }

  return (
    <div className={styles.outerpost} id={post.id}>
      <div className={styles.post} style={_style} data-tilt data-tilt-max="10">
        <div className={styles.userinfo}>
          {/* style={{"background-image": `url(${post.account.header})`, "background-size": "100%"}} */}
          {boosted}
          <img className={styles.pfp} src={post.account.avatar}/>
          <div className={styles.username}>{post.account.display_name} <a href={post.account.url}>{"@"+post.account.acct}</a></div>
          <div className={styles.time}>{/\d{2}:\d{2}:\d{2}/.exec(post.created_at)[0]}</div>
          <div>Post id: <a href={`${domain}/notice/${post.id}`}>{post.id}</a></div>
          <div>In reply to: <a href={`${domain}/notice/${post.in_reply_to_id}`}>{post.in_reply_to_id}</a></div>
        </div>
        <br/>
        <div className={styles.com}>
          {media()}
          <div dangerouslySetInnerHTML={{ __html: post.content }}/>
        </div>
        <div className={styles.bottom_post}>
          <div className={styles.status_actions}>Replies: {post.replies_count}</div>
          <div className={styles.status_actions} style={post.reblogged ? {color: "lightgreen"} : {}}>Boosts: {post.reblogs_count}</div>
          <div className={styles.status_actions} style={post.favourited ? {color: "yellow"} : {}}>Stars: {post.favourites_count}</div>
        </div>
      </div>
    </div>
  )
}

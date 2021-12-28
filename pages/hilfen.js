import styles from '../styles/Home.module.css'
const domain = "http://127.0.0.1:3000"

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
    <div className={styles.outerpost}>
      <div className={styles.post} style={_style} data-tilt data-tilt-max="10">
        <div className={styles.userinfo} onClick={() => location.href = `${domain}/notice/${post.id}`}>
          {boosted}
          <img className={styles.pfp} src={post.account.avatar}/>
          <div className={styles.username}>{post.account.display_name} <a href={post.account.url}>{"@"+post.account.acct}</a></div>
          <div className={styles.time}>{/\d{2}:\d{2}:\d{2}/.exec(post.created_at)[0]}</div>
        </div>
        <br/>
        <div className={styles.com}>
          {media()}
          <div dangerouslySetInnerHTML={{ __html: post.content }}/>
        </div>
        <div className={styles.bottompost}>
          <div class={styles.statusactions}>
            <div class={styles.actions}>
              {/* <button title="Reply" class="button-unstyled interactive"> */}
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="reply" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fa-scale-110 fa-old-padding svg-inline--fa fa-reply fa-w-16">
                  <path fill="currentColor" d="M8.309 189.836L184.313 37.851C199.719 24.546 224 35.347 224 56.015v80.053c160.629 1.839 288 34.032 288 186.258 0 61.441-39.581 122.309-83.333 154.132-13.653 9.931-33.111-2.533-28.077-18.631 45.344-145.012-21.507-183.51-176.59-185.742V360c0 20.7-24.3 31.453-39.687 18.164l-176.004-152c-11.071-9.562-11.086-26.753 0-36.328z" class=""></path>
                </svg>
              {/* </button> */}
            </div>
          <div class={styles.actions}>
            {/* <button title="Repeat" class="button-unstyled interactive"> */}
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="retweet" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="fa-scale-110 fa-old-padding svg-inline--fa fa-retweet fa-w-20">
                <path fill="currentColor" d="M629.657 343.598L528.971 444.284c-9.373 9.372-24.568 9.372-33.941 0L394.343 343.598c-9.373-9.373-9.373-24.569 0-33.941l10.823-10.823c9.562-9.562 25.133-9.34 34.419.492L480 342.118V160H292.451a24.005 24.005 0 0 1-16.971-7.029l-16-16C244.361 121.851 255.069 96 276.451 96H520c13.255 0 24 10.745 24 24v222.118l40.416-42.792c9.285-9.831 24.856-10.054 34.419-.492l10.823 10.823c9.372 9.372 9.372 24.569-.001 33.941zm-265.138 15.431A23.999 23.999 0 0 0 347.548 352H160V169.881l40.416 42.792c9.286 9.831 24.856 10.054 34.419.491l10.822-10.822c9.373-9.373 9.373-24.569 0-33.941L144.971 67.716c-9.373-9.373-24.569-9.373-33.941 0L10.343 168.402c-9.373 9.373-9.373 24.569 0 33.941l10.822 10.822c9.562 9.562 25.133 9.34 34.419-.491L96 169.881V392c0 13.255 10.745 24 24 24h243.549c21.382 0 32.09-25.851 16.971-40.971l-16.001-16z" class=""></path>
              </svg>
            {/* </button> */}
          </div>
          <div class={styles.actions}>
            {/* <button title="Favorite" class="button-unstyled interactive"> */}
              <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="fa-scale-110 fa-old-padding svg-inline--fa fa-star fa-w-18">
                <path fill="currentColor" d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z" class=""></path>
              </svg>
            {/* </button> */}
            </div>
            <div class={styles.actions}>
              {/* <button type="button" class="button-unstyled -fullwidth popover-trigger-button">
                <button title="Add Reaction" class="button-unstyled popover-trigger"> */}
                  <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="smile-beam" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" class="fa-scale-110 fa-old-padding svg-inline--fa fa-smile-beam fa-w-16">
                    <path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm84-143.4c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.6-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.2-8.4-25.3-7.1-33.8 3.1zM136.5 211c7.7-13.7 19.2-21.6 31.5-21.6s23.8 7.9 31.5 21.6l9.5 17c2.1 3.7 6.2 4.7 9.3 3.7 3.6-1.1 6-4.5 5.7-8.3-3.3-42.1-32.2-71.4-56-71.4s-52.7 29.3-56 71.4c-.3 3.7 2.1 7.2 5.7 8.3 3.4 1.1 7.4-.5 9.3-3.7l9.5-17zM328 152c-23.8 0-52.7 29.3-56 71.4-.3 3.7 2.1 7.2 5.7 8.3 3.5 1.1 7.4-.5 9.3-3.7l9.5-17c7.7-13.7 19.2-21.6 31.5-21.6s23.8 7.9 31.5 21.6l9.5 17c2.1 3.7 6.2 4.7 9.3 3.7 3.6-1.1 6-4.5 5.7-8.3-3.3-42.1-32.2-71.4-56-71.4z" class=""></path>
                  </svg>
                {/* </button>
              </button> */}
            </div>
            <div class={styles.actions}>
              {/* <button type="button" class="button-unstyled -fullwidth popover-trigger-button">
                <button class="button-unstyled popover-trigger"> */}
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ellipsis-h" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fa-scale-110 fa-old-padding svg-inline--fa fa-ellipsis-h fa-w-16">
                    <path fill="currentColor" d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z" class=""></path>
                  </svg>
                {/* </button>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

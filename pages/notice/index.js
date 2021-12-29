import {domain} from "../hilfen"

export default function notice({timeline, main_post}) {
  return (
    <div>
      {(() => {if (process.browser) location.href=domain;})()}
    </div>
  )
}

import { spaceBlank } from '../utils/util'
import './player.css'

function player(props) {
  const newUrl = spaceBlank(props.fileUrl)
  return (
    <audio controls className="player">
      <source src={newUrl} />
    </audio>
  )
}

export default player;

import Player from './Player';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import './sample.css'

function sample(props) {
  const sampleData = props.data;
  if (!sampleData) return null;
  const sample = sampleData.map(item => {
    return (
      <div key={item.id} className="container">
        <Avatar src={item.user.picture_small} alt={item.user.name} sx={{ width: 66, height: 66 }} />
        <Link href={`https://voice123.com/${item.user.username}`} target="_blank" underline="hover">{item.user.name}</Link>
        <Player fileUrl={item.relevant_sample.file} />
      </div>
    )
  })

  return sample  
}

export default sample;
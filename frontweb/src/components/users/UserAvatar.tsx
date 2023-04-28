import { UserInterface } from '../../interfaces/user'
import { Avatar } from '@mui/material'
import { blue } from '@mui/material/colors'
import DefaultUserImage from '../../assets/default-user.png'

const UserAvatar = ({ user }: { user?: UserInterface | null }) => {
  if (!user) {
    return <Avatar src={DefaultUserImage} />
  } else if (user.avatar) {
    return <Avatar alt={user.firstname + user.lastname} src={user.avatar} />
  } else {
    return (
      <Avatar sx={{ bgcolor: blue[800] }}>
        {user.firstname.slice(0, 1).toUpperCase() +
          user.lastname.slice(0, 1).toUpperCase()}
      </Avatar>
    )
  }
}

export default UserAvatar

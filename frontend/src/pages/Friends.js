import * as React from 'react'
import { Box, Link, Paper } from '@mui/material'
import AvatarCustom from '../components/AvatarCustom'

function Friends({ users }) {
    return (
        <Paper style={{ width: '614px', marginTop: '20px' }} elevation='5' >
            <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                textOverflow="ellipsis"
                style={{ padding: '20px', overflow: 'hidden' }}
            >
                {users.map(user => (
                    <div key={user.id}>
                        <Link href={user.website} underline="none" style={{ color: 'white' }}>
                            <AvatarCustom name={user.username} />
                        </Link>
                    </div>
                ))}
            </Box>
        </Paper>
    );
}
export default Friends;
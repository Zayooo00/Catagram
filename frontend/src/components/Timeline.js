import * as React from 'react'
import { Box, Avatar, Typography } from '@mui/material'

function Timeline({ name }) {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection= "center">
            <Avatar>{name[0]}</Avatar>
            <Typography type= "body2" color= "text.secondary" style= {{color: 'black', textOverflow: 'ellipsis', marginLeft: '10px', marginRight: '0px'}}>{name}</Typography>
        </Box>
    );
}
export default Timeline;
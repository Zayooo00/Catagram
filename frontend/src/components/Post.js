import React, { Component } from 'react'
import { Card, CardHeader, CardMedia, CardContent, Typography } from '@mui/material'
import logger from '../logger/logger';


export default class Post extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        logger.log("Post.js");
        logger.log(this.props);
        return (
            <Card style={{ width: '650px', marginTop: '20px' }} elevation={5}>
                <CardHeader
                    avatar={this.props.avatar}
                    title={this.props.title}
                />
                <CardMedia
                    component="img"
                    height="500"
                    image={this.props.picture}
                />
                <CardContent>
                <Typography variant="subtitle2" color="text.primary">
                    {this.props.description}
                </Typography>
                <Typography variant="subtitle4" color="text.secondary">
                    {this.props.date}
                </Typography>
                </CardContent>
            </Card>
        );
    }
}
import React, { Component } from 'react'
import { Card, CardHeader, CardMedia, CardContent, Typography, Button } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import postService from '../services/post-service';
import logger from '../logger/logger'


export default class PostProfile extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            message: "",
            postDelete: false
        }
    }

    handleDelete(e) {
        e.preventDefault();
        postService.delete(this.props.postId).then(
            () => {
                this.setState({
                    postDelete: true
                });
            },
            error => {
                const resMessage = (
                    error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
                this.setState({
                    postDelete: false,
                    message: resMessage
                });
            }
        );
        window.location.reload();
    }

    render() {
        logger.log("PostProfile.js");
        logger.log(this.props);
        return (
            <Card style={{ width: '650px', marginTop: '20px' }} elevation={5}>
                <CardHeader
                    avatar={this.props.avatar}
                    title={this.props.title}
                    action={
                        <Button
                        style={{ color: 'black' }}
                        variant="text"
                        startIcon={<DeleteOutlineIcon />}
                        onClick={this.handleDelete}
                    >
                        Delete
                    </Button>
                    }
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
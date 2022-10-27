import React, { Component } from 'react'
import PostProfile from '../components/PostProfile'
import EditIcon from '@mui/icons-material/Edit';
import Header from './Header';
import AvatarCustom from '../components/AvatarCustom';
import { Grid, CardHeader, Card, Button } from '@mui/material';
import logger from '../logger/logger'



import authService from '../services/auth-service';
import userService from '../services/user-service';
import postService from '../services/post-service';

document.body.style.backgroundImage = "url(https://www.superiorwallpapers.com/cats/a-sweet-and-serious-cat-with-collar_2560x1440.jpg)";
document.body.style.backgroundSize = "cover";


export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.state = {
            currentUser: authService.getCurrentUser(),
            currentProfile: userService.getCurrentProfile(),
            currentPosts: []
        };
    }

    componentDidMount() {
        postService.getCurrentPosts().then(
            response => {
                logger.log("Profile.js")
                logger.log(response)
                this.setState({
                    currentPosts: response.data
                });
            },
            error => {
                logger.log("Profile.js")
                logger.error(error)
                const resMessage = (
                    error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
                this.setState({
                    message: resMessage
                });
            }
        );
    }

    handleLogout(e) {
        e.preventDefault();
        authService.logout();
        userService.logout();
        window.location.reload();
    }

    render() {
        return (
            <>
                <Header />
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
                >
                    <Grid item xs={3}>
                        <Card style={{ width: '650px', marginTop: '20px' }} elevation={5}>
                            <CardHeader
                                avatar={<AvatarCustom name={this.state.currentUser.username} />}
                                title={this.state.currentProfile.name}
                                subheader={this.state.currentProfile.description}
                                action={
                                    <Button 
                                    href="/profileedit"
                                    style={{ color: 'black', marginLeft: '0px' }} 
                                    variant="text" 
                                    startIcon={<EditIcon />} >
                                    </Button>
                                }
                            />
                        </Card>
                                {this.state.currentPosts.map(post => (
                                    <div key={post.id}>
                                        <PostProfile
                                            postId={post.id}
                                            title={post.title}
                                            picture={post.linkPicture.replace('E:/Studia/SEMESTR 4/catgram/', 'http://127.0.0.1:8080/')}
                                            description={post.description}
                                        />
                                    </div>
                                ))}
                    </Grid>
                </Grid>
            </>
        );
    }
}
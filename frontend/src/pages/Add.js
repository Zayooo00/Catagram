import { Button, Card, CardHeader, CardContent, TextField, Grid } from '@mui/material';
import React, { Component } from 'react'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ButtonCustom from '../components/ButtonCustom'
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import Header from './Header'
import postService from '../services/post-service';
import logger from '../logger/logger';
import lang from 'i18next'

export default class Add extends Component {
    constructor(props) {
        super(props);
        this.handleCreatePost = this.handleCreatePost.bind(this);
        this.onChangeSaveFile = this.onChangeSaveFile.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onClickSelectFile = this.onClickSelectFile.bind(this);

        this.state = {
            file: {},
            fileName: "",
            title: "",
            description: "",
            titleError: false,
            descriptionError: false,
            fileError: false,
            uploadError: true,
            fileSubmitError: true,
            message: ""
        }

        this.fileInputRef = React.createRef();

    }

    onClickSelectFile(e) {
        e.preventDefault();
        this.fileInputRef.current.click();
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeSaveFile(e) {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.files[0].name,
            fileSubmitError: false
        });
    }

    handleCreatePost(e) {
        e.preventDefault();
        this.setState({
            titleError: false,
            descriptionError: false,
            message: ""
        });

        if (this.state.title == "") {
            this.setState({
                titleError: true
            });
        }
        if (this.state.description == "") {
            this.setState({
                descriptionError: true
            });
        }
        if (this.state.fileName == "") {
            this.setState({
                fileError: true
            });
        }

        if (this.state.title && this.state.description && this.state.fileName) {
            logger.log("Add.js")
            logger.log(this.state.title)
            logger.log( this.state.description)
            logger.log(this.state.file)
            logger.log(this.state.fileName)

            postService.createPost(
                this.state.title,
                this.state.description,
                this.state.file,
                this.state.fileName
            ).then(
                () => {
                    this.setState({
                        uploadError: false
                    });
                },
                error => {
                    logger.log("Add.js")
                    logger.error(error)
                    const resMessage = (
                        error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();
                    this.setState({
                        uploadError: true,
                        message: resMessage
                    });
                }
            );

        }
    }

    render() {
        if (this.state.uploadError) {
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
                                    title={lang.t('add.createTitle')}
                                />
                                <CardContent>
                                    {this.state.message && (
                                        <p className="mb-4 text-xs text-red-primary">
                                            {this.state.message}
                                        </p>
                                    )}
                                    <form noValidate autoComplete="off" onSubmit={this.handleCreatePost}>


                                        {this.state.fileSubmitError && (
                                            <Button
                                                style={{
                                                    color: this.state.fileError ? '#d32f2f' : 'black',
                                                    borderColor: this.state.fileError ? '#d32f2f' : 'black'
                                                }}
                                                variant="text"
                                                startIcon={<AddPhotoAlternateOutlinedIcon />}
                                                onClick={this.onClickSelectFile}
                                            >
                                                {lang.t('add.uploadFile')}
                                            </Button>
                                        )}

                                        {!this.state.fileSubmitError && (
                                            <Button
                                                disabled
                                                style={{ color: 'black' }}
                                                variant="text"
                                                startIcon={<AddPhotoAlternateOutlinedIcon />}
                                                onClick={this.onClickSelectFile}
                                            >
                                                {lang.t('add.fileSelected')}
                                            </Button>
                                        )}

                                        <input
                                            hidden
                                            type="file"
                                            style={{ display: 'none' }}
                                            ref={this.fileInputRef}
                                            accept="image/*"
                                            onChange={this.onChangeSaveFile}
                                        />

                                        <TextField
                                            onChange={this.onChangeTitle}
                                            style={{ marginTop: '10px' }}
                                            label={lang.t('add.formTitle')}
                                            variant="outlined"
                                            fullWidth
                                            required
                                            color="secondary"
                                            error={this.state.titleError}
                                        />

                                        <TextField
                                            onChange={this.onChangeDescription}
                                            label={lang.t('add.formDescription')}
                                            style={{ marginTop: '10px' }}
                                            variant="outlined"
                                            fullWidth
                                            required
                                            multiline
                                            color="secondary"
                                            rows={4}
                                            error={this.state.descriptionError}
                                        />

                                        <Button
                                            style={{ marginTop: '10px', color: 'black' }}
                                            type="submit"
                                            variant="text"
                                            endIcon={<SendOutlinedIcon />}>
                                            {lang.t('add.submit')}
                                        </Button>



                                    </form>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </>
            );
        } else {
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
                            <Card style={{ width: '614px', marginTop: '20px' }} elevation={5}>
                                <CardHeader
                                    title={lang.t('add.newTitle')}
                                />
                                <CardContent>
                                    <ButtonCustom link="/Profile" name={lang.t('profile')} icon={<AccountBoxOutlinedIcon />} />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </>
            );
        }
    }
}

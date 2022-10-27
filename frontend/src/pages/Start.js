import * as React from 'react'
import { AppBar, Toolbar, Grid, Typography } from '@mui/material'
import ButtonCustom from '../components/ButtonCustom'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import lang from 'i18next'

// document.body.style.backgroundImage = "url(https://www.superiorwallpapers.com/cats/a-sweet-and-serious-cat-with-collar_2560x1440.jpg)";
// document.body.style.backgroundSize = "cover";

export default function Start() {
    return (
        <><><AppBar position="sticky" elevation={5}>
            <Toolbar>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                >
                    <a href="/">
                        <input type="image" src="https://i.imgur.com/ZTcHjwn.png" style={{ height: '38px', justifyContent: 'flex-start', marginLeft: '0px', direction: 'row', marginTop: '5px' }} />
                    </a>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                >
                    <ButtonCustom link="/login" name={lang.t('login')} icon={<LoginOutlinedIcon />} />
                    <ButtonCustom link="/sign-up" name={lang.t('signup')} icon={<LockOpenOutlinedIcon />} />
                    <ButtonCustom link="/contact-us" name={lang.t('contactus')} icon={<ContactMailOutlinedIcon />} />
                </Grid>
            </Toolbar>
        </AppBar>

        </>
            <div className="container flex mx-auto items-center h-screen">
                <div className="flex w-full">
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex justify-center items-center flex-col w-full p-4 rounded text-white">
                        <p className="text-main">
                            {lang.t('start.welcome')}
                        </p>
                        <p className="text-sub">
                            
                        {lang.t('start.text')}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

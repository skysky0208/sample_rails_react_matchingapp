import React, { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

import { makeStyles, Theme } from "@material-ui/core/styles"

import { signOut } from "lib/api/auth"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import PersonIcon from "@material-ui/icons/Person"
import SearchIcon from "@material-ui/icons/Search"
import ChatBubbleIcon from "@material-ui/icons/ChatBubble"

import { AuthContext } from "App"

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        flexGrow: 1,
        textDecoration: "none",
        color: "inherit"
    },
    linkBtn: {
        textTransform: "none",
        marginLeft: theme.spacing(1)
    }
}))

const Header: React.FC = () => {
    const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext)
    const classes = useStyles()
    const navigate = useNavigate()

    const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            const res = await signOut()
        
            if (res.data.success === true) {
                // サインアウト時には各Cookieを削除
                Cookies.remove("_access_token")
                Cookies.remove("_client")
                Cookies.remove("_uid")
        
                setIsSignedIn(false)
                navigate("/signin")
        
                console.log("Succeeded in sign out")
            } else {
                console.log("Failed in sign out")
            }
            } catch (err) {
            console.log(err)
        }
    }

    const AuthButtons = () => {
        if (!loading) {
            if (isSignedIn) {
                return (
                    <>
                        <IconButton
                            component={Link}
                            to="/users"
                            edge="start"
                            className={classes.linkBtn}
                            color="inherit"
                        >
                            <SearchIcon />
                        </IconButton>
                        <IconButton
                            component={Link}
                            to="/chat_rooms"
                            edge="start"
                            className={classes.linkBtn}
                            color="inherit"
                        >
                            <ChatBubbleIcon />
                        </IconButton>
                        <IconButton
                            component={Link}
                            to="/home"
                            edge="start"
                            className={classes.linkBtn}
                            color="inherit"
                        >
                            <PersonIcon />
                        </IconButton>
                        <IconButton
                            onClick={handleSignOut}
                            className={classes.linkBtn}
                            color="inherit"
                        >
                            <MeetingRoomIcon />
                        </IconButton>
                    </>
                )
            } else {
                return (
                    <>
                        <IconButton
                            component={Link}
                            to="/signin"
                            edge="start"
                            className={classes.linkBtn}
                            color="inherit"
                        >
                            <ExitToAppIcon />
                        </IconButton>
                    </>
                )
            }
        } else {
            return <></>
        }
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        component={Link} 
                        to="/users"
                        variant="h6"
                        className={classes.title}
                    >
                        Sample
                    </Typography>
                    <AuthButtons />
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header
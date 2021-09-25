import { AppBar, Box, IconButton, Toolbar, Typography } from "@material-ui/core"
import GitHubIcon from "@material-ui/icons/GitHub"

export type MyHeaderProps = {
    title: string
    githubLink: string
}

export const MyHeader = (props: MyHeaderProps) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="transparent">
                <Toolbar variant="dense">
                    <Typography component="div" style={{ flexGrow: 1 }}>
                        {props.title}
                    </Typography>
                    <a href={props.githubLink}>
                        <IconButton>
                            <GitHubIcon />
                        </IconButton>
                    </a>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"

import { GridSize } from "@material-ui/core"

import DeleteIcon from "@material-ui/icons/Delete"
//import CachedIcon from "@material-ui/icons/Cached"

import { StartStopButton } from "./StartStopButton"

export type MonitorProps = {
    col: GridSize
    apiLink: string
    imageData: string
    isLoading: boolean
    delay: number
    timerId: number
    lastLoadTime: string
    startLoading: () => void
    stopLoading: () => void
    handleLinkChange: (param: string) => void
    handleDelayChange: (param: string) => void
    handleDelete: () => void
}

export const Monitor = (props: MonitorProps) => {
    return (
        <Grid item xs={props.col}>
            <Card>
                <CardHeader subheader={props.lastLoadTime} />
                <CardMedia component="img" image={props.imageData} />
                <CardContent>
                    <TextField
                        fullWidth
                        margin="normal"
                        type="text"
                        variant="outlined"
                        size="small"
                        label="link"
                        value={props.apiLink}
                        onChange={(event) =>
                            props.handleLinkChange(event.target.value)
                        }
                    />
                    <TextField
                        fullWidth
                        type="tel"
                        variant="outlined"
                        size="small"
                        label="delay"
                        value={props.delay}
                        onChange={(event) =>
                            props.handleDelayChange(event.target.value)
                        }
                    />
                </CardContent>
                <CardActions>
                    <StartStopButton
                        startSomething={props.startLoading}
                        stopSomething={props.stopLoading}
                        isProcessing={props.isLoading}
                    />
                    <IconButton onClick={props.handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    )
}

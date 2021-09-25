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
import CachedIcon from "@material-ui/icons/Cached"

import { StartStopButton } from "./StartStopButton"

type MonitorContentProps = {
    apiLink: string
    delay: number
    isLoading: boolean
    startLoading: () => void
    stopLoading: () => void
    handleApiLinkChange: (param: string) => void
    handleDelayChange: (param: string) => void
    handleDelete: () => void
}

const MonitorContents = (props: MonitorContentProps) => {
    return (
        <>
            <CardContent>
                <TextField
                    fullWidth
                    margin="normal"
                    type="text"
                    variant="outlined"
                    size="small"
                    label="Link"
                    value={props.apiLink}
                    onChange={(event) =>
                        props.handleApiLinkChange(event.target.value)
                    }
                />
                <TextField
                    fullWidth
                    type="tel"
                    variant="outlined"
                    size="small"
                    label="Delay [sec]"
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
                    fontSize="small"
                />
                <IconButton onClick={props.handleDelete}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </CardActions>
        </>
    )
}

export type MonitorProps = {
    col: GridSize
    isMinimalMode: boolean
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
                <CardHeader
                    subheader={
                        <>
                            <CachedIcon fontSize="small" />
                            {props.lastLoadTime}
                        </>
                    }
                />
                {props.imageData === "" ? (
                    <CardMedia component="img" image="/virus_overshoot.png" />
                ) : (
                    <CardMedia component="img" image={props.imageData} />
                )}
                {props.isMinimalMode ? (
                    <></>
                ) : (
                    <MonitorContents
                        apiLink={props.apiLink}
                        delay={props.delay}
                        isLoading={props.isLoading}
                        startLoading={props.startLoading}
                        stopLoading={props.stopLoading}
                        handleApiLinkChange={props.handleLinkChange}
                        handleDelayChange={props.handleDelayChange}
                        handleDelete={props.handleDelete}
                    />
                )}
            </Card>
        </Grid>
    )
}

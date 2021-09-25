import IconButton from "@material-ui/core/IconButton"
import PlayArrowIcon from "@material-ui/icons/PlayArrow"
import StopIcon from "@material-ui/icons/Stop"

type startStopButtonProps = {
    startSomething: VoidFunction
    stopSomething: VoidFunction
    isProcessing: boolean
}
export const StartStopButton = (props: startStopButtonProps) => {
    return props.isProcessing ? (
        <IconButton onClick={props.stopSomething}>
            <StopIcon />
        </IconButton>
    ) : (
        <IconButton onClick={props.startSomething}>
            <PlayArrowIcon />
        </IconButton>
    )
}

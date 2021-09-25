import IconButton from "@material-ui/core/IconButton"
import PlayArrowIcon from "@material-ui/icons/PlayArrow"
import StopIcon from "@material-ui/icons/Stop"

type startStopButtonProps = {
    startSomething: VoidFunction
    stopSomething: VoidFunction
    isProcessing: boolean
    fontSize: "small" | "inherit" | "default" | "large" | "medium" | undefined
}
export const StartStopButton = (props: startStopButtonProps) => {
    return props.isProcessing ? (
        <IconButton onClick={props.stopSomething}>
            <StopIcon fontSize={props.fontSize} />
        </IconButton>
    ) : (
        <IconButton onClick={props.startSomething}>
            <PlayArrowIcon fontSize={props.fontSize} />
        </IconButton>
    )
}

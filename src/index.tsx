// React
import ReactDOM from "react-dom"
import { useState } from "react"
// mui-core
import IconButton from "@material-ui/core/IconButton"
import { Container, Grid, GridSize, Switch } from "@material-ui/core"
// mui-icon
import AddIcon from "@material-ui/icons/Add"
// my components
import { Monitor } from "./components/Monitor"
import { GridSelect } from "./components/GridSelect"

// define json structue
type jsonData = {
    img_base64: string
}

// in order to set array state
const setArrayState = (
    index: number,
    changingState: any,
    setStates: React.Dispatch<React.SetStateAction<any[]>>
) => {
    setStates((states) => {
        const duplicatedStates = [...states]
        duplicatedStates[index] = changingState
        return duplicatedStates
    })
}

const Display = () => {
    const [gridSize, setGridSize] = useState<GridSize>(6)
    const [isMinimalMode, setIsMinimalMode] = useState<boolean>(false)
    const defaultStates = {
        apiLink: "",
        imageData: "",
        isLoading: false,
        delay: 1,
        timerId: 0,
    }
    const [apiLinks, setApiLinks] = useState<string[]>([defaultStates.apiLink])
    const [imageDatas, setImageDatas] = useState<string[]>([
        defaultStates.imageData,
    ])
    const [isLoadings, setIsLoadings] = useState<boolean[]>([
        defaultStates.isLoading,
    ])
    const [delays, setDelays] = useState<number[]>([defaultStates.delay])
    const [timerIds, setTimerIds] = useState<number[]>([defaultStates.timerId])
    const [lastLoadTimes, setLastLoadTimes] = useState<string[]>([
        new Date().toLocaleString(),
    ])

    const addMonitor = () => {
        setApiLinks((apiLinks) => apiLinks.concat([defaultStates.apiLink]))
        setImageDatas((imageDatas) =>
            imageDatas.concat([defaultStates.imageData])
        )
        setIsLoadings((isLoadings) =>
            isLoadings.concat([defaultStates.isLoading])
        )
        setDelays((delays) => delays.concat([defaultStates.delay]))
        setTimerIds((timerIds) => timerIds.concat([defaultStates.timerId]))
        setLastLoadTimes((lastLoadTimes) =>
            lastLoadTimes.concat([new Date().toLocaleString()])
        )
    }

    const deleteMomitor = (index: number) => {
        setApiLinks((apiLinks) =>
            apiLinks.slice(0, index).concat(apiLinks.slice(index + 1))
        )
        setImageDatas((imageDatas) =>
            imageDatas.slice(0, index).concat(imageDatas.slice(index + 1))
        )
        setIsLoadings((isLoadings) =>
            isLoadings.slice(0, index).concat(isLoadings.slice(index + 1))
        )
        setDelays((Delays) =>
            Delays.slice(0, index).concat(Delays.slice(index + 1))
        )
        setTimerIds((timerIds) =>
            timerIds.slice(0, index).concat(timerIds.slice(index + 1))
        )
        setLastLoadTimes((lastLoadTimes) =>
            lastLoadTimes.slice(0, index).concat(lastLoadTimes.slice(index + 1))
        )
    }

    const fetchImage = (i: number) => {
        fetch(apiLinks[i])
            .then((response) => response.json())
            .then((data: jsonData) => {
                setArrayState(i, data.img_base64, setImageDatas)
                let currentTime: string = new Date().toLocaleString()
                setArrayState(i, currentTime, setLastLoadTimes)
            })
    }

    const stopLoading = (i: number) => {
        setArrayState(i, false, setIsLoadings)
        window.clearInterval(timerIds[i])
    }

    const startLoading = (i: number) => {
        stopLoading(i)
        setArrayState(i, true, setIsLoadings)
        setArrayState(
            i,
            window.setInterval(() => fetchImage(i), delays[i] * 1000),
            setTimerIds
        )
    }

    return (
        <>
            <GridSelect
                label="col"
                value={gridSize}
                options={[12, 6, 4, 3, 2, 1]}
                handleChange={setGridSize}
            />
            <IconButton onClick={addMonitor}>
                <AddIcon />
            </IconButton>
            <Switch
                checked={isMinimalMode}
                onChange={() =>
                    setIsMinimalMode((isMinimalMode) => !isMinimalMode)
                }
            />
            <Grid container>
                {[...Array(apiLinks.length)].map((_, i) => {
                    return (
                        <Monitor
                            key={i}
                            col={gridSize}
                            isMinimalMode={isMinimalMode}
                            apiLink={apiLinks[i]}
                            imageData={imageDatas[i]}
                            isLoading={isLoadings[i]}
                            delay={delays[i]}
                            timerId={timerIds[i]}
                            lastLoadTime={lastLoadTimes[i]}
                            startLoading={() => startLoading(i)}
                            stopLoading={() => stopLoading(i)}
                            handleLinkChange={(changingLink) => {
                                setArrayState(i, changingLink, setApiLinks)
                            }}
                            handleDelayChange={(changingDelay) => {
                                setArrayState(i, changingDelay, setDelays)
                            }}
                            handleDelete={() => {
                                deleteMomitor(i)
                            }}
                        />
                    )
                })}
            </Grid>
        </>
    )
}

const App = () => (
    <Container fixed>
        <Display />
    </Container>
)

ReactDOM.render(<App />, document.getElementById("root"))

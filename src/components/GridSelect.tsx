import { GridSize } from "@material-ui/core"
import { Select, MenuItem } from "@material-ui/core"

export type GridSelectProps = {
    label: string
    value: GridSize
    options: GridSize[]
    handleChange: (param: GridSize) => void
}

export const GridSelect = (props: GridSelectProps) => {
    return (
        <Select
            label={props.label}
            value={props.value}
            onChange={(event) =>
                props.handleChange(event.target.value as GridSize)
            }
        >
            {props.options.map((option) => (
                <MenuItem value={option} key={option}>
                    {12 / Number(option)}
                </MenuItem>
            ))}
        </Select>
    )
}

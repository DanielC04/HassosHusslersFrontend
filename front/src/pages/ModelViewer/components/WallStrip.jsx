import React from 'react'
import Wall from './Wall';

export default function WallStrip(props) {
    const wallSegments = [];
    const height = props?.height || 10;
    const width = props?.width || 1;
    const n = props.data.length;
    // push every segment of the wall strip into a list
    for (let i = 0; i < n - 1; i ++) {
        wallSegments.push(<Wall p1={[...props.data[i], 0]} p2={[...props.data[i + 1], height]} key={i} width={width} height={height} />)
    }
    // close wall strip if needed by connecting first point to last point
    if (props?.closeStrip)
        wallSegments.push(<Wall p1={[...props.data[n - 1], 0]} p2={[...props.data[0], height]} width={width} height={height} key={-1}/>)

    return (
        <>
            {wallSegments}
        </>
    )
}

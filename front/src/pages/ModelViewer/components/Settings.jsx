import { buttonGroup, folder, Leva, useControls } from 'leva'
import React from 'react'

export default function Settings(props) {
    console.log("props: ", props)

    return (
        <div className='absolute right-1 top-1 bg-slate-600 text-white z-10 max-w-64 min-w-32 rounded-md'>
            {/* <h2 className='text-lg m-4 underline'>Settings</h2> */}
            <div className='cursor-pointer' onClick={() => props.goBack()}>Back</div>
            {/* <svg fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                viewBox="0 0 404.258 404.258" xml:space="preserve">
                <polygon points="289.927,18 265.927,0 114.331,202.129 265.927,404.258 289.927,386.258 151.831,202.129 "/>
            </svg> */}

        </div>
    )
}

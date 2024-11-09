import { useState, useRef } from 'react';
import LineEditor from '../components/LineEditor'

function FloorKnob({ value, handleBtnPress, isSelected, hasFloorbtn, setFloorbtnHavingness }) {
    /*bg-slate-400 hover:bg-slate-500
    flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100
    m-5 border-4 border-slate-300 text-slate-400 text-xl font-bold py-1 px-2 rounded-full
    */

    return isSelected ? 
        <>
            <button onClick={() => handleBtnPress(value)} onMouseLeave={setFloorbtnHavingness} className={(value == 0 || !hasFloorbtn ? "" : "floorbtn ") + "m-4 bg-slate-700 flex items-center justify-center w-10 h-10 text-slate-100 transition-colors duration-150 rounded-full focus:shadow-outline"}><span>{ value }</span></button>
        </>
        : 
        <>
            <button onClick={() => handleBtnPress(value)} className="m-4 bg-slate-100 flex items-center justify-center w-10 h-10 text-black transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-slate-200">{ value }</button>
        </>;
}

function Area() {

}

function DeleteButton() {

}

function UploadConglomerate({ handleFileChange }) {

    return <div className="m-auto flex flex-col items-center">
            <label htmlFor="floorplanupload" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                <svg className="fill-current w-4 h-4 mr-2" fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 374.116 374.116" xmlSpace="preserve">
                    <g>
                        <path d="M344.058,207.506c-16.568,0-30,13.432-30,30v76.609h-254v-76.609c0-16.568-13.432-30-30-30c-16.568,0-30,13.432-30,30
                            v106.609c0,16.568,13.432,30,30,30h314c16.568,0,30-13.432,30-30V237.506C374.058,220.938,360.626,207.506,344.058,207.506z"/>
                        <path d="M123.57,135.915l33.488-33.488v111.775c0,16.568,13.432,30,30,30c16.568,0,30-13.432,30-30V102.426l33.488,33.488
                            c5.857,5.858,13.535,8.787,21.213,8.787c7.678,0,15.355-2.929,21.213-8.787c11.716-11.716,11.716-30.71,0-42.426L208.271,8.788
                            c-11.715-11.717-30.711-11.717-42.426,0L81.144,93.489c-11.716,11.716-11.716,30.71,0,42.426
                            C92.859,147.631,111.855,147.631,123.57,135.915z"/>
                    </g>
                </svg>
                <span>Upload</span>
            </label>
            <input id="floorplanupload" type="file" accept="image/svg+xml" onChange={handleFileChange}/>
        </div>;
}

function FloorAddButton({ value, handleBtnPress }) {
    return <>
            <button onClick={handleBtnPress} className="m-4 bg-slate-100 flex items-center justify-center w-10 h-10 text-black transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-slate-200">{ value }</button>
        </>;
}

export default function Editor({ setPage }) {
    const uploadedFiles = useRef([]);
    const uploadDict = useRef({0: null});

    const [floorArray, setFloorArray] = useState([0]);
    const [selectedFloor, setSelectedFloor] = useState(0);
    const [hasFloorbtn, setHasFloorbtn] = useState(false);
    
    function handleFileChange(e) {
        if (e.target.files) {
            let receivedFile = e.target.files[0];

            if (receivedFile.name.slice(-4).toLowerCase() != ".pdf") {
                return;
            }

            let index = null;
            for (let i = 0; i < uploadedFiles.current.length; i++) {
                if (uploadedFiles.current[i] === null) {
                    uploadedFiles.current[i] = receivedFile;
                    index = i;
                    break;
                }
            }
            if (index === null) {
                uploadedFiles.current.push(receivedFile);
                index = uploadedFiles.current.length - 1;
            }

            uploadDict.current[selectedFloor] = index;

            console.log(receivedFile);
        }
    }

    function handleFloorPress(value) {
        if (value == selectedFloor) {
            if (floorArray.length <= 1 || value == 0) return;

            uploadedFiles.current[uploadDict.current[value]] = null;

            if (value >= 0) {
                for (let i = value+1; i < floorArray[0]; i++) {
                    uploadDict.current[i-1] = uploadDict.current[i];
                }
                delete uploadDict.current[floorArray[0]];
                setSelectedFloor(selectedFloor - 1);
            } else {
                for (let i = value-1; i < floorArray[floorArray.length - 1]; i++) {
                    uploadDict.current[i+1] = uploadDict.current[i];
                }
                delete uploadDict.current[floorArray[floorArray.length - 1]];
                setSelectedFloor(selectedFloor + 1);
            }

            setFloorArray(value >= 0 ? floorArray.slice(1) : floorArray.slice(0, -1));
        } else {
            setHasFloorbtn(false);
            setSelectedFloor(value);
        }
    }

    function addFloorAbove() {
        const newFloorArray = [floorArray[0] + 1, ...floorArray.slice()];
        setFloorArray(newFloorArray);
        uploadDict.current[floorArray[0] + 1] = null;
    }

    function addFloorBelow() {
        const newFloorArray = [...floorArray.slice(), floorArray[floorArray.length - 1] - 1];
        setFloorArray(newFloorArray);
        uploadDict.current[floorArray[floorArray.length - 1] - 1] = null;
    }

    return <div className="flex">
            <div className="flex h-screen">
                <div className="my-auto">
                    <FloorAddButton value="+" handleBtnPress={addFloorAbove}/>
                    { floorArray.map(e => <FloorKnob key={e} value={e} handleBtnPress={handleFloorPress} isSelected={e == selectedFloor} hasFloorbtn={hasFloorbtn} setFloorbtnHavingness={() => setHasFloorbtn(true)}/>) }
                    <FloorAddButton value="+" handleBtnPress={addFloorBelow}/>
                </div>
            </div>
            <LineEditor />
            <button onClick={() => setPage('viewer')}>View 3D Model</button>
            {/* <UploadConglomerate handleFileChange={handleFileChange}/> */}
        </div>;
}

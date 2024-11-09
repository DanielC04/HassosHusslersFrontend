import { useState, useRef } from 'react';
import LineEditor from '../components/LineEditor'
import Floor from '../Floor'

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
            <label htmlFor="floorplanupload" className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded inline-flex items-center">
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

function FloorAddButton({ handleBtnPress, upsideDown }) {
    return <>
            <button onClick={handleBtnPress} className="flooraddbutton m-4 flex items-center justify-center w-10 h-10 text-black transition-colors duration-150 rounded-full focus:shadow-outline">
            <svg className={upsideDown ? "rotate-180" : ""} width="800px" height="40px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g transform="translate(-288.000000, -48.000000)">
                        <g transform="translate(288.000000, 48.000000)">
                            <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fill-rule="nonzero">

            </path>
                            <path d="M10.7009,3.14771 C11.2783,2.14771 12.7217,2.1477 13.299,3.1477 L21.933,18.1022 C22.5103,19.1022 21.7887,20.3522 20.634,20.3522 L3.36601,20.3522 C2.21131,20.3522 1.48962,19.1022 2.06697,18.1022 L10.7009,3.14771 Z" fill="#cbd5e1">

            </path>
                        </g>
                    </g>
                </g>
                <text
                    xml:space="preserve"
                    
                    x="-2.1176469"
                    y="12.148606"
                    transform="translate(8.9140587,5.5572756)"><tspan
                    x="-2.1176469"
                    y="12.148606">+</tspan></text>
            </svg>
            </button>
        </>;
}

function Popup({ hidden = true, text, hideSelf, continueCallback }) {
    return <div className={(hidden ? "invisible" : "visible") + " z-50 absolute flex flex-row min-h-screen justify-center items-center"}>
            <div className="absolute w-screen h-screen left-0 top-0 bg-black/50 justify-center items-center">
                <div className="flex flex-col justify-stretch absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black bg-white text-center w-80 h-40 rounded-lg">
                    <div className="flex h-screen">
                        <div className="my-auto mx-10">
                            { text }
                        </div>
                    </div>
                    <div className="grow flex flex-row justify-center items-center mx-2">
                        <button onClick={() => {hideSelf(); cancelCallback()}} className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded items-center my-4 mx-2 w-24">Cancel</button>
                        <button onClick={() => {hideSelf(); continueCallback()}} className="bg-slate-100 hover:bg-slate-200 text-black py-2 px-4 rounded items-center my-4 mx-2 w-24">Continue</button>
                    </div>
                </div>
            </div>
        </div>;
}

export default function Editor({ setPage, floors, setFloors }) {
    const uploadedFiles = useRef([]);
    const uploadDict = useRef({0: null});

    const [floorArray, setFloorArray] = useState([0]);
    const [selectedFloor, setSelectedFloor] = useState(0);
    const [hasFloorbtn, setHasFloorbtn] = useState(false);
    const [popupState, setPopupState] = useState([true, "", () => 0, () => 0]);

    const [forceUpdate, setForceUpdate] = useState(false);
    
    function handleFileChange(e) {
        if (e.target.files) {
            let receivedFile = e.target.files[0];

            if (receivedFile.name.slice(-4).toLowerCase() != ".svg") {
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
            setWallsInFloor(selectedFloor, []);

            setForceUpdate(!forceUpdate);

            console.log(receivedFile);
        }
    }

    function handleFloorPress(value, skipWarning=false) {
        if (value == selectedFloor) {
            if (!hasFloorbtn) {
                setHasFloorbtn(true);
                return;
            }
            if (floorArray.length <= 1 || value == 0) return;

            if (!skipWarning && uploadDict.current[selectedFloor] !== null) {
                setPopupState([
                    false, 
                    "You are deleting a floor plan.",
                    () => setPopupState([true, "", () => 0, () => 0]),
                    () => handleFloorPress(value, true)
                ]);
                return;
            }

            uploadedFiles.current[uploadDict.current[value]] = null;

            let newFloors = {...floors};
            if (value >= 0) {
                for (let i = value+1; i <= floorArray[0]; i++) {
                    uploadDict.current[i-1] = uploadDict.current[i];
                    newFloors[i-1] = newFloors[i];
                }
                delete uploadDict.current[floorArray[0]];
                delete newFloors[floorArray[0]];
                setSelectedFloor(selectedFloor - 1);
            } else {
                for (let i = floorArray[floorArray.length - 1]; i <= value - 1; i++) {
                    uploadDict.current[i+1] = uploadDict.current[i];
                    newFloors[i+1] = newFloors[i];
                }
                delete uploadDict.current[floorArray[floorArray.length - 1]];
                delete newFloors[floorArray[floorArray.length - 1]];
                setSelectedFloor(selectedFloor + 1);
            }
            setFloors(newFloors)

            setFloorArray(value >= 0 ? floorArray.slice(1) : floorArray.slice(0, -1));

            console.log(uploadDict.current);
        } else {
            setHasFloorbtn(false);
            setSelectedFloor(value);
        }
    }

    function addFloorAbove() {
        const newFloorArray = [floorArray[0] + 1, ...floorArray.slice()];
        setFloorArray(newFloorArray);
        setWallsInFloor(floorArray[0] + 1, null);
        uploadDict.current[floorArray[0] + 1] = null;
    }

    function addFloorBelow() {
        const newFloorArray = [...floorArray.slice(), floorArray[floorArray.length - 1] - 1];
        setFloorArray(newFloorArray);
        setWallsInFloor(floorArray[floorArray.length - 1] - 1, null);
        uploadDict.current[floorArray[floorArray.length - 1] - 1] = null;
    }

    function deleteCurrentFloorplan() {
        uploadedFiles.current[uploadDict.current[selectedFloor]] = null;
        uploadDict.current[selectedFloor] = null;
        setWallsInFloor(selectedFloor, null);
    }
        
    function setWallsInFloor(floor, walls) {
        let modifiedFloor = floors[floor]
        if (modifiedFloor) modifiedFloor.walls = walls
        else modifiedFloor = new Floor()
        let newFloors = {...floors, [floor]: modifiedFloor};
        return setFloors(newFloors);
    }

    function changeToViewer() {
        function changeWindow() {

            setPage('viewer');
        }

        let skipPopup = true;

        floorArray.forEach(floorNum => {
            if (uploadDict.current[floorNum] === null) {
                skipPopup = false;
            }
        });

        if (skipPopup) {
            changeWindow();
        } else {
            setPopupState([
                false, 
                "Render model despite some empty floors?",
                () => setPopupState([true, "", () => 0, () => 0]),
                changeWindow
            ]);
        }
    }

    return <>
        <Popup hidden={popupState[0]} text={popupState[1]} hideSelf={popupState[2]} continueCallback={popupState[3]}/>
        <div className="flex">
            <div className="flex h-screen">
                <div className="my-auto">
                    <FloorAddButton upsideDown={false} key="up" handleBtnPress={addFloorAbove}/>
                    { floorArray.map(e => <FloorKnob key={e} value={e} handleBtnPress={handleFloorPress} isSelected={e == selectedFloor} hasFloorbtn={hasFloorbtn} setFloorbtnHavingness={() => setHasFloorbtn(true)}/>) }
                    <FloorAddButton upsideDown={true} key="down" handleBtnPress={addFloorBelow}/>
                </div>
            </div>
            {!uploadedFiles.current[uploadDict.current[selectedFloor]] ?
                <UploadConglomerate handleFileChange={handleFileChange}/>
                :
                <div className="flex flex-col w-full">
                    <div className="flex flex-row justify-end items-end m-6">
                        <button onClick={deleteCurrentFloorplan} className="bg-slate-100 hover:bg-slate-200 text-black py-2 px-4 rounded inline-flex items-center mx-4">Remove Floor Plan</button>
                        <button onClick={changeToViewer} className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded inline-flex items-center">Create 3D Model</button>
                    </div>
                    <div className="flex flex-row justify-center h-full items-center">
                        <LineEditor walls={floors[selectedFloor].walls} setWalls={(w) => setWallsInFloor(selectedFloor, w)} planSvg={uploadedFiles.current[uploadDict.current[selectedFloor]]} className="my-auto" />
                    </div>
                </div>
            }
        </div>
        </>;
}

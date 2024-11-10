import { useState, useRef } from 'react';
import LineEditor from '../components/LineEditor';
import LeTriangle from '../assets/triangle.svg';
import uploadLogo from '../assets/upload.svg';
import Floor from '../Floor';
import { svgToPng } from './utils';

function FloorKnob({ value, handleBtnPress, isSelected, hasFloorbtn, setFloorbtnHavingness }) {
    /*bg-slate-400 hover:bg-slate-500
    flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100
    m-5 border-4 border-slate-300 text-slate-400 text-xl font-bold py-1 px-2 rounded-full
    */

    return isSelected ? 
        <>
            <button onClick={() => handleBtnPress(value)} onMouseLeave={setFloorbtnHavingness} className={(value == 0 || !hasFloorbtn ? "" : "floorbtn ") + "m-4 bg-[#1550f6] flex items-center justify-center w-10 h-10 text-slate-100 transition-colors duration-150 rounded-full focus:shadow-outline"}><span>{ value }</span></button>
        </>
        : 
        <>
            <button onClick={() => handleBtnPress(value)} className="m-4 bg-slate-100 flex items-center justify-center w-10 h-10 text-black transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-slate-200">{ value }</button>
        </>;
}

function UploadConglomerate({ handleFileChange, setAutomationToggle, isAutomated }) {

    /*return <div className="m-auto flex flex-col items-center">
            <label htmlFor="floorplanupload" className="bg-[#121212] hover:bg-slate-800 text-white font-bold py-2 px-4 rounded inline-flex items-center ">
                <img src={uploadLogo} className="fill-current w-4 h-4 mr-2" />
                <span className=''>Upload floor plan</span>
            </label>
            <input id="floorplanupload" type="file" accept="image/svg+xml" onChange={handleFileChange}/>
        </div>;*/

    return  <div className='m-auto flex flex-col items-center'><div className="m-auto flex flex-col items-center py-8 px-20 border-dashed border-2 border-[#121212]/[.30] rounded-lg">
        <img src={uploadLogo} className="fill-current w-5 h-5 mb-2" />
        
        <span className=' text-[#121212]'>Upload a floor plan here</span>
        <span className=' text-[#b7b9bd]'>SVG format, up to 100 MB</span>
        <label htmlFor="floorplanupload" className="text-[#121212] hover:bg-slate-100 mt-5  py-2 px-4 rounded items-center border border-[#121212]/[.40]">Browse File</label>
        <input id="floorplanupload" type="file" accept="image/svg+xml" onChange={handleFileChange}/>
    </div><label class="inline-flex items-center cursor-pointer mt-6">
            {isAutomated ? <input type="checkbox" checked onChange={(event) => {setAutomationToggle(event.currentTarget.checked)}} class="sr-only peer"/>
            : <input type="checkbox" onChange={(event) => {setAutomationToggle(event.currentTarget.checked)}} class="sr-only peer"/>
            }
            <div class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-slate-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span class="ms-3 text-sm font-medium text-[#121212]">Automated Wall Extraction</span>
        </label></div>;
}

function FloorAddButton({ handleBtnPress, upsideDown }) {
    return <>
            <button onClick={handleBtnPress} className="flooraddbutton m-4 flex items-center justify-center w-10 h-10 text-black transition-colors duration-150 rounded-full focus:shadow-outline">
                <img src={LeTriangle} className={upsideDown ? "rotate-180" : ""}/>
            </button>
        </>;
}

function Popup({ hidden = true, text, hideSelf, continueCallback, hasContinue }) {
    return <div className={(hidden ? "invisible" : "visible") + " z-50 absolute flex flex-row min-h-screen justify-center items-center"}>
            <div className="absolute w-screen h-screen left-0 top-0 bg-black/50 justify-center items-center">
                <div className="flex flex-col justify-stretch absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black bg-white text-center w-80 h-40 rounded-lg">
                    <div className="flex h-screen">
                        <div className="my-auto mx-10">
                            { text }
                        </div>
                    </div>
                    <div className="grow flex flex-row justify-center items-center mx-2">
                        <button onClick={() => {hideSelf()}} className="bg-[#121212] hover:bg-slate-800 text-white font-bold py-2 px-4 rounded items-center my-4 mx-2 w-24">Cancel</button>
                        {hasContinue ? <button onClick={() => {hideSelf(); continueCallback()}} className="bg-slate-100 hover:bg-slate-200 text-black py-2 px-4 rounded items-center my-4 mx-2 w-24">Continue</button> : <></>}
                    </div>
                </div>
            </div>
        </div>;
}

function HeightInput({ height, setHeight }) {
    ////console.log("start val", height);
    //const [value, setValue] = useState(height.toString());

    //////console.log(typeof(value), value);

    return <div className="bg-slate-100 text-black py-2 px-4 rounded inline-flex items-center">
        <label className="mr-4 font-semibold" htmlFor="floorheight">Height:</label>
        <input className="w-20 mx-2 text-center rounded" id="floorheight" type="text" value={height} onChange={e => {
                ////console.log(e.target.value, !!e.target.value);
                let newVal = e.target.value;
                if (!newVal) {
                    setHeight("0");
                    //setValue("0");
                    return;
                }
                newVal = newVal.replace(",", ".");
                if (/^[0-9.]*$/.test(newVal) && newVal.split(".").length - 1 <= 1) {
                    let substr = newVal.substring(0, newVal.indexOf("."));
                    ////console.log(/^0+$/.test(substr));
                    if (newVal[0] == '.') newVal = '0'+newVal;
                    else if (/^0+$/.test(substr)) newVal = newVal.slice(newVal.indexOf(".")-1);
                    else {
                        newVal = newVal.replace(/^0+/, '');
                        if (newVal == "") newVal = "0";
                    }
                    setHeight(newVal);
                    //setValue(newVal);
                }
                    
            }}>
        </input>
        <label htmlFor="floorheight">m</label>
        </div>;
}

export default function Editor({ setPage, floors, setFloors, hidden }) {
    const uploadedFiles = useRef([]);
    const uploadDict = useRef({0: null});
    const heightDict = useRef({0: "3"});

    const [floorArray, setFloorArray] = useState([0]);
    const [selectedFloor, setSelectedFloor] = useState(0);
    const [hasFloorbtn, setHasFloorbtn] = useState(false);
    const [popupState, setPopupState] = useState([true, "", () => 0, () => 0, true]);
    const [automationToggle, setAutomationToggle] = useState(true);

    const [forceUpdate, setForceUpdate] = useState(false);

    function setCurrentHeight(height) {
        heightDict.current[selectedFloor] = height;
        let floatHeight = height.slice(-1) == '.' ? parseFloat(height.slice(0, -1)) : parseFloat(height);
        let newFloors = {...floors};
        newFloors[selectedFloor].height = floatHeight;
        setFloors(newFloors);
    }
    
    async function handleFileChange(e) {
        if (e.target.files) {
            let receivedFile = e.target.files[0];

            if (receivedFile.name.slice(-4).toLowerCase() != ".svg") {
                return;
            }

            window.addEventListener("beforeunload", function (e) {
                var confirmationMessage = 'It looks like you have already uploaded floor plans. '
                                        + 'If you leave, your changes will be lost.';
            
                (e || window.event).returnValue = confirmationMessage; //Gecko + IE
                return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
            });

            let index = null;
            for (let i = 0; i < uploadedFiles.current.length; i++) {
                if (uploadedFiles.current[i] === null) {
                    uploadedFiles.current[i] = receivedFile;
                    index = i;
                    break;
                }
            }
            if (index === null) {
                const base64Encoding = await svgToPng(receivedFile);
                console.log("got the image: ", base64Encoding)
                uploadedFiles.current.push(base64Encoding);
                index = uploadedFiles.current.length - 1;
            }

            uploadDict.current[selectedFloor] = index;
            setWallsInFloor(selectedFloor, []);

            setForceUpdate(!forceUpdate);

            ////console.log(receivedFile);
        }
    }

    function handleFloorPress(value, skipWarning=false, forceDelete=false) {
        if (value == selectedFloor || forceDelete) {
            if (!hasFloorbtn && !forceDelete) {
                setHasFloorbtn(true);
                return;
            }
            if (floorArray.length <= 1 || value == 0) return;

            if (!skipWarning && uploadDict.current[selectedFloor] !== null) {
                setPopupState([
                    false, 
                    "You are deleting a floor plan.",
                    () => setPopupState([true, "", () => 0, () => 0, true]),
                    () => handleFloorPress(value, true),
                    true
                ]);
                return;
            }

            uploadedFiles.current[uploadDict.current[value]] = null;

            let newFloors = {...floors};
            if (value >= 0) {
                for (let i = value+1; i <= floorArray[0]; i++) {
                    uploadDict.current[i-1] = uploadDict.current[i];
                    heightDict.current[i-1] = heightDict.current[i];
                    newFloors[i-1] = newFloors[i];
                }
                delete uploadDict.current[floorArray[0]];
                delete heightDict.current[floorArray[0]];
                delete newFloors[floorArray[0]];
                setSelectedFloor(selectedFloor - 1);
            } else {
                for (let i = floorArray[floorArray.length - 1]; i <= value - 1; i++) {
                    uploadDict.current[i+1] = uploadDict.current[i];
                    heightDict.current[i+1] = heightDict.current[i];
                    newFloors[i+1] = newFloors[i];
                }
                delete uploadDict.current[floorArray[floorArray.length - 1]];
                delete heightDict.current[floorArray[floorArray.length - 1]];
                delete newFloors[floorArray[floorArray.length - 1]];
                setSelectedFloor(selectedFloor + 1);
            }
            setFloors(newFloors)

            setFloorArray(value >= 0 ? floorArray.slice(1) : floorArray.slice(0, -1));

            ////console.log(uploadDict.current);
        } else {
            setHasFloorbtn(false);
            setSelectedFloor(value);
        }
    }

    function addFloorAbove() {
        const newFloorNum = floorArray[0] + 1;
        const newFloorArray = [newFloorNum, ...floorArray.slice()];
        setFloorArray(newFloorArray);
        setWallsInFloor(newFloorNum, null);
        uploadDict.current[newFloorNum] = null;
        heightDict.current[newFloorNum] = "3";
        setSelectedFloor(newFloorNum);
    }

    function addFloorBelow() {
        const newFloorNum = floorArray[floorArray.length - 1] - 1;
        const newFloorArray = [...floorArray.slice(), newFloorNum];
        setFloorArray(newFloorArray);
        setWallsInFloor(newFloorNum, null);
        uploadDict.current[newFloorNum] = null;
        heightDict.current[newFloorNum] = "3";
        setSelectedFloor(newFloorNum);
    }

    function deleteCurrentFloorplan() {
        uploadedFiles.current[uploadDict.current[selectedFloor]] = null;
        uploadDict.current[selectedFloor] = null;
        heightDict.current[selectedFloor] = "3";
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
                "Cannot render model due to empty floors.",
                () => setPopupState([true, "", () => 0, () => 0, false]),
                changeWindow,
                false
            ]);
        }
    }

    return <>
        <Popup hidden={popupState[0]} text={popupState[1]} hideSelf={popupState[2]} continueCallback={popupState[3]} hasContinue={popupState[4]}/>

        <div className={`flex ${hidden ? 'hidden': ''}`}>
            <div className="flex h-screen bg-white z-30">
                <div className="my-auto">
                    <FloorAddButton upsideDown={false} key="up" handleBtnPress={addFloorAbove}/>
                    { floorArray.map(e => <FloorKnob key={e} value={e} handleBtnPress={handleFloorPress} isSelected={e == selectedFloor} hasFloorbtn={hasFloorbtn} setFloorbtnHavingness={() => setHasFloorbtn(true)}/>) }
                    <FloorAddButton upsideDown={true} key="down" handleBtnPress={addFloorBelow}/>
                </div>
            </div>
            {!uploadedFiles.current[uploadDict.current[selectedFloor]] ?
                <UploadConglomerate handleFileChange={handleFileChange} setAutomationToggle={setAutomationToggle} isAutomated={automationToggle}/>
                :
                <div className="flex flex-col w-full">
                    <div className="flex flex-row justify-end items-end m-6 bg-white z-30 h-auto">
                        <HeightInput height={heightDict.current[selectedFloor]} setHeight={setCurrentHeight}/>
                        <button onClick={deleteCurrentFloorplan} className="bg-slate-100 hover:bg-slate-200 text-black py-2 px-4 rounded inline-flex items-center mx-4 font-semibold">Remove Floor Plan</button>
                        <button onClick={changeToViewer} className="bg-[#1550f6] hover:bg-[#073ac5] text-white font-bold py-2 px-4 rounded inline-flex items-center">Create 3D Model</button>
                    </div>
                    <div className="flex flex-col justify-center h-full items-center">
                        <div className="flex flex-row justify-center items-center">
                            
                        </div>
                        <LineEditor walls={floors[selectedFloor].walls} setWalls={(w) => setWallsInFloor(selectedFloor, w)} imageBase64={uploadedFiles.current[uploadDict.current[selectedFloor]]} className="my-auto" isAutomated={automationToggle} />
                    </div>
                </div>
            }
        </div>
        </>;
}

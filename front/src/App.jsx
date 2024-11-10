import { useEffect, useState } from 'react'
import Editor from './pages/Editor'
import ModelViewer from './pages/ModelViewer/ModelViewer'
import Wall from './Wall'
import Floor from './Floor'
import {sample} from './assets/house-1-floor-2'
import monoplanLogo from './assets/monoplanlogo.png';

function sampleFloor() {
  const out = new Floor()
  for (const key in sample[0]['walls']) {
    const w = sample[0]['walls'][key]
    out.walls.push(new Wall(w.start, w.end, w.key))
  }
  return out
}

function App() {
  const [page, setPage] = useState('editor')
//   const [floors, setFloors] = useState({0: [
//     new Wall([0, 0], [10, 0]),
//     new Wall([10, 0], [15, 5]),
//     new Wall([15, 5], [10, 10]),
//     new Wall([10, 10], [0, 10]),
//     new Wall([0, 10], [0, 0]),
//   ], 
//   1: [
//       new Wall([0, 0], [10, 0]),
//       new Wall([10, 0], [15, 5]),
//       new Wall([15, 5], [10, 10]),
//       new Wall([10, 10], [0, 10]),
//       new Wall([0, 10], [0, 0]),
//     ]
// })

  const [floors, setFloors] = useState({0: null})

  return <>
    <a className="absolute top-0 left-0 z-40">
        <img src={monoplanLogo} className="h-24 z-40"/>
    </a>
    <Editor hidden={page !== 'editor'} setPage={setPage} floors={floors} setFloors={setFloors}/>
    <ModelViewer hidden={page !== 'viewer'} setPage={setPage} floors={floors} />
  </>
}

export default App

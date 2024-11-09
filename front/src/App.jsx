import { useState } from 'react'
import Editor from './pages/Editor'
import ModelViewer from './pages/ModelViewer/ModelViewer'
import Wall from './Wall'

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

  if (page == 'editor') {
    return <Editor setPage={setPage} floors={floors} setFloors={setFloors}/>
  } else {
    return <ModelViewer setPage={setPage} floors={floors} />
  }
}

export default App

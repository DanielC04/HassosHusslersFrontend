import { useState } from 'react'
import Editor from './pages/Editor'
import ModelViewer from './pages/ModelViewer/ModelViewer'

function App() {
  const [page, setPage] = useState('editor')
  const [floors, setFloors] = useState({0: null})

  if (page == 'editor') {
    return <Editor setPage={setPage} floors={floors} setFloors={setFloors}/>
  } else {
    return <ModelViewer setPage={setPage} />
  }
}

export default App

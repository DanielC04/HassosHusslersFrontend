import { useState } from 'react'
import Editor from './pages/Editor'
import ModelViewer from './pages/ModelViewer/ModelViewer'

function App() {
  const [page, setPage] = useState('editor')
  if (page == 'editor') {
    return <Editor setPage={setPage} />
  } else {
    return <ModelViewer setPage={setPage} />
  }
}

export default App

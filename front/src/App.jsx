import Editor from './pages/Editor'
import ModelViewer from './pages/ModelViewer/ModelViewer'

function App() {
  return (
  <div className='h-full min-h-screen flex'>
    <ModelViewer walls={[
      [1, 1, 5, 5],
    ]}></ModelViewer>

    {/* <Editor /> */}
  </div>)
}

export default App

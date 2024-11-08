import SplatScene from './components/SplatScene'
import { Footer } from './layout/Footer'
import { NavbarDefault } from './layout/Navbar'

function App() {
  return (
    <div className='min-h-screen flex flex-col'>
      <NavbarDefault />
      <div className="container mx-auto px-12 h-auto flex-grow">
        <h1 className="text-3xl font-bold underline my-2">
          Hassos Hustler present
        </h1>
        {/* <SplatScene /> */}
      </div>
      <Footer />
    </div>
  )
}

export default App;
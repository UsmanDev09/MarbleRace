import logo from './logo.svg'
import './App.css'
import { KeyboardControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'

import Interface from './components/Interface'
import PhysicsComponent from './components/Physics'


function App() {
  return (
    <KeyboardControls
      map={ [
        { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
        { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
        { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
        { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
        { name: 'jump', keys: ['Space'] },
      ] }
    >
      <Canvas>
        <PhysicsComponent />
      </Canvas>
      <Interface />
    </KeyboardControls>
  )
}

export default App

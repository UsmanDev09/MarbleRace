import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useMemo } from 'react'
import { Float, Text, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

THREE.ColorManagement.legacyMode = false

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)

const floor1Material = new THREE.MeshStandardMaterial({ color: '#111111', metalness: 0, roughness: 0 })
const floor2Material = new THREE.MeshStandardMaterial({ color: '#222222', metalness: 0, roughness: 0 })
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: '#ff0000', metalness: 0, roughness: 1 })
const wallMaterial = new THREE.MeshStandardMaterial({ color: '#887777', metalness: 0, roughness: 0 })

export function BlockStart({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <Float floatIntensity={0.25} rotationIntensity={0.25}>
        <Text
          font="./bebas-neue-v9-latin-regular.woff"
          scale={ 0.5}
          maxWidth={ 0.25 }
          lineHeight={ 0.75 }
          textAlign="right"
          position={ [0.75, 0.65, 0] }
          rotation-y={ -0.25 }
        >
          Marble Race
          <meshBasicMaterial toneMapped={ false} />
        </Text>
         </Float>
        <mesh geometry={boxGeometry} material={floor1Material} position={[0, -0.1, 0]} scale={[4, 0.2, 4]}></mesh>

    </group>
  )
}

export function BlockEnd({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <Text
        font="./bebas-neue-v9-latin-regular.woff"
        scale={ 1 }
        position={ [0, 2.25, 2] }
      >
        FINISH
        <meshBasicMaterial />
      </Text>
      <mesh geometry={boxGeometry} material={floor1Material} position={[0, 0, 0]} scale={[4, 0.2, 4]}></mesh>
    </group>
  )
}

export function BlockSpinner({ position = [0, 0, 0] }) {
  const obstacleRef = useRef()
  const [speed] = useState(() => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1))
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const rotation = new THREE.Quaternion()
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0))
    obstacleRef.current.setNextKinematicRotation(rotation)
  })
  return (
    <group position={position}>
      <mesh geometry={boxGeometry} material={floor2Material} position={[0, -0.1, 0]} scale={[4, 0.2, 4]} castShadow receiveShadow></mesh>

      <RigidBody ref={obstacleRef} type="kinematicPosition" position={[0, 0.3, 0]} restitution={0.2} friction={0}>
        <mesh geometry={boxGeometry} material={obstacleMaterial} scale={[3.5, 0.3, 0.3]} castShadow receiveShadow></mesh>
      </RigidBody>
    </group>
  )
}

export function BlockLimbo( {position =  [0, 0, 0] } ) {
  const obstacleRef = useRef()
  const [ timeOffset ]= useState(() => Math.random() * Math.PI * 2);
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const y = Math.sin(time + timeOffset) + 1.15
    obstacleRef.current.setNextKinematicTranslation({x: position[0], y: position[1] + y, z:position[2]})
  })
  return <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        castShadow
        receiveShadow
      >
      </mesh>

      <RigidBody
        ref={obstacleRef}

        type="kinematicPosition"
        position={ [0, 0.3, 0] }
        restitution={ 0.2 }
        friction={ 0 }
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        >
        </mesh>
      </RigidBody>

    </group>
}

export function BlockAxe( {position =  [0, 0, 0] } ) {
  const obstacleRef = useRef()
  const [ timeOffset ]= useState(() => Math.random() * Math.PI * 2);
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const x = Math.sin(time + timeOffset) * 1.25
    obstacleRef.current.setNextKinematicTranslation({x: position[0] + x, y: position[1] + 0.75, z:position[2]})
  })
  return <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        castShadow
        receiveShadow
      >
      </mesh>

      <RigidBody
        ref={obstacleRef}

        type="kinematicPosition"
        position={ [0, 0.3, 0] }
        restitution={ 0.2 }
        friction={ 0 }
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[1.5, 1.3, 0.3]}
          castShadow
          receiveShadow
        >
        </mesh>
      </RigidBody>

    </group>
}

export function Bounds({ length = 1 }) {
  return <RigidBody type="fixed" restitution={0.2} friction={0}>
    <mesh
      position={ [2.15, 0.75, -(length * 2) + 2]}
      geometry={ boxGeometry }
      material={ wallMaterial }
      scale={ [0.3, 1.5, 4 * length]}
      castShadow
    >
    </mesh>

    <mesh
      position={ [-2.15, 0.75, -(length * 2) + 2]}
      geometry={ boxGeometry }
      material={ wallMaterial }
      scale={ [0.3, 1.5, 4 * length]}
      recieveShadow
    >
    </mesh>

    <mesh
      position={ [0, 0.75, -(length * 4) + 2]}
      geometry={ boxGeometry }
      material={ wallMaterial }
      scale={ [4, 1.5, 0.3]}
      receiveShadow
    >
    </mesh>

    <CuboidCollider
      args={ [ 2, 0.1, 2 * length ] }
      position={ [0, -0.1, -(length * 1.7) * 1] }
      restitution={0.2}
      friction={1}
    />
  </RigidBody>
}

export function Level({ count=5, types = [ BlockSpinner, BlockAxe, BlockLimbo ], seed = 0})

{

  const blocks = useMemo(() => {
    const blocks = []
    for(let i= 0; i< count; i++){
      const type = types[Math.floor(Math.random() * types.length) ]
      blocks.push(type)
    }
    console.log(blocks)
    return blocks

  }, [count, types, seed])

  return (
    <>

      <BlockStart position={[0, 0, 0]} />

      {blocks.map((Block, index) => {
        return <Block key={index} position={ [0, 0, -(index + 1)*4] }/>
      })}

      <BlockEnd position = { [0, 0, -(count+1) * 4 ] } />

      <Bounds length={count + 2}/>

    </>
  )
}

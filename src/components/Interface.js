import { useRef, useEffect } from 'react'
import { useKeyboardControls } from '@react-three/drei'
import { addEffect } from '@react-three/fiber'

import useGame from '../store/useGame'

export default function Interface(){
  const time = useRef()

  const restart = useGame((state) => state.restart)
  const phase = useGame((state) => state.phase)

  const forward = useKeyboardControls((state) => state.forward)
  const rightward = useKeyboardControls((state) => state.rightward)
  const backward = useKeyboardControls((state) => state.backward)
  const leftward = useKeyboardControls((state) => state.leftward)
  const jump = useKeyboardControls((state) => state.jump)

  useEffect(() => {
    const unsubscribedEffect = addEffect(() => {
      const state = useGame.getState()

      let elapsedTime = 0

      if (state.phase === 'playing') elapsedTime = Date.now() - state.startTime
      else if (state.phase === 'ended') elapsedTime = state.endTime + state.startTime

      elapsedTime /= 1000
      elapsedTime = elapsedTime.toFixed(2)

      if (time.current) time.current.textContent = elapsedTime
      console.log(elapsedTime)
    })

    return () => {
      unsubscribedEffect()
    }
  }, [])

  return (
    <div className="interface">
      <div ref={time} className="time"></div>
      { phase === 'ended' &&
        <div className="restart" onClick={restart}>Restart</div>
      }
      <div className="controls">
        <div className="raw">
          <div className={`key ${forward && 'active'}`}></div>
        </div>
        <div className="raw">
          <div className={`key ${leftward && 'active'}`}></div>
          <div className={`key ${backward && 'active'}`}></div>
          <div className={`key ${rightward && 'active'}`}></div>
        </div>
        <div className="raw">
          <div className={`key large ${jump && 'active'}`}></div>
        </div>
      </div>
    </div>
  )
}

import { Debug, Physics, RigidBody } from '@react-three/rapier';

import {Level} from './Level'
import Player from './Player'
import Lights from './Lights';
import useGame from '../store/useGame';
import Effects from './Effects';

const PhysicsComponent = () => {
  const blocksCount = useGame((state) => {
    return state.blocksCount;
  })

  const blocksSeed = useGame((state) => {
    return state.blocksSeed;
  })
  return (
    <>
<color args={ [ '#252731' ] } attach="background" />
      <Physics>
        <Lights />
        {/* <Debug /> */}
        <Level count={blocksCount} seed={blocksSeed} />
        <Player />
      </Physics>

      {/* <Effects /> */}
    </>
   );
}

export default PhysicsComponent;

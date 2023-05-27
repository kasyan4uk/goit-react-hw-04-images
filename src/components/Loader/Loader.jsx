import { FallingLines } from 'react-loader-spinner';
import { Spiner } from './Loader.styled';

function Loader() {
  return (
    <Spiner>
      <FallingLines
        color="blue"
        width="100"
        visible={true}
        ariaLabel='falling-lines-loading'
      />
    </Spiner>

    
  );
}

export default Loader;

import urlLoading from '../img/loading/loadingGhost.gif';
import { withRouter } from 'react-router-dom';
import Image from './Image';
 function Loading({ url, isOpen }) {
 

  return (
    <div className={`overlay loading ${isOpen ? 'overlay_visible' : ''}`}>
      <Image className="loading__img" alt="loading" src={urlLoading} />
    </div>
  );
}

export default withRouter(Loading);
import urlLoading from '../img/loading/loadingGhost.gif';
import Image from './Image';
export default function Loading({ url, isOpen }) {
 

  return (
    <div className={`overlay loading ${isOpen ? 'overlay_visible' : ''}`}>
      <Image className="loading__img" alt="loading" src={urlLoading} />
    </div>
  );
}

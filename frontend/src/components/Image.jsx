import loadingBlue from '../img/loading/loadingBlue.svg';

export default function Image(props) {
  const { src } = props;

  return <>{src ? <img {...props} /> : <img src={loadingBlue} />}</>;
}

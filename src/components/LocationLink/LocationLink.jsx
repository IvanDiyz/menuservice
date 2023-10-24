import s from "./LocationLink.module.scss";

const LocationLink = ({ link }) => {
  return <a className={s.locationLink} href={link} target="_blank"></a>;
};

export default LocationLink;

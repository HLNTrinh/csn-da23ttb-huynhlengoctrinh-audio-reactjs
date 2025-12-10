export default function PlaylistItem({ image, title, desc, onClick }) {
  return (
    <div className="playlist-item" onClick={onClick}>
      <div className="playlist-cover">
        <img src={image} alt={title} />
      </div>
      <h3 className="playlist-title">{title}</h3>
      <p className="playlist-desc">{desc}</p>
    </div>
  );
}

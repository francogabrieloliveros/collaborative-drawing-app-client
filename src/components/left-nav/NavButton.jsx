export default function NavButton({ src, alt, onClick }) {
  return (
    <img
      className="aspect-square w-full cursor-pointer transition-all select-none hover:scale-110 active:scale-90"
      src={src}
      alt={alt}
      onClick={onClick}
    />
  );
}

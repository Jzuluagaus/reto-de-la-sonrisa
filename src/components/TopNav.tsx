interface TopNavProps {
  onHome: () => void;
  onChangeAge: () => void;
  onRestart: () => void;
}

export function TopNav({ onHome, onChangeAge, onRestart }: TopNavProps) {
  return (
    <nav className="top-nav" aria-label="Navegación del reto">
      <button type="button" onClick={onHome} data-action="home">
        Inicio
      </button>
      <button type="button" onClick={onChangeAge} data-action="change-age">
        Cambiar edad
      </button>
      <button type="button" onClick={onRestart} data-action="restart">
        Reiniciar
      </button>
    </nav>
  );
}

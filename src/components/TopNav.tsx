import { BrandLockup } from './BrandLockup.tsx';

interface TopNavProps {
  onHome: () => void;
  onChangeAge: () => void;
  onRestart: () => void;
  onBack?: () => void;
  canBack?: boolean;
}

export function TopNav({ onHome, onChangeAge, onRestart, onBack, canBack = false }: TopNavProps) {
  return (
    <header className="top-nav">
      <BrandLockup compact />
      <nav className="nav-actions" aria-label="Navegación del reto">
        {canBack && onBack ? (
          <button type="button" className="nav-back" data-action="back" onClick={onBack}>
            <Chevron />
            Anterior
          </button>
        ) : null}
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
    </header>
  );
}

function Chevron() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="chevron">
      <path d="M10 3.5 5.5 8 10 12.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

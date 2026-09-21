interface BrandLockupProps {
  compact?: boolean;
}

export function BrandLockup({ compact = false }: BrandLockupProps) {
  return (
    <p className={compact ? 'lockup lockup-compact' : 'lockup'}>
      <img
        src="/brand/smile-alegria-logo.png"
        alt="Smile Alegría Dental Studio"
        width={344}
        height={196}
      />
    </p>
  );
}

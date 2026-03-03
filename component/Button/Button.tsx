// components/Button.tsx
type Props = {
  label: string
  disabled?: boolean
  onClick: () => void
}

export default function Button({ label, disabled = false, onClick }: Props) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  )
}
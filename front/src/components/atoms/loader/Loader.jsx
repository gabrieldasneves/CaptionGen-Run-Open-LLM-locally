import './Loader.css'

export function Loader({ className = '' }) {
  return (
    <div
      className={`spinner${className ? ` ${className}` : ''}`}
      role="status"
      aria-label="Loading"
    />
  )
}

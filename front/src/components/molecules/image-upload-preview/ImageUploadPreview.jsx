import { useRef, useState, useEffect } from 'react'
import './ImageUploadPreview.css'

function UploadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 16V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M4 20h16" />
      <path d="M4 17v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1" />
    </svg>
  )
}

export function ImageUploadPreview({ src, onChange, className = '' }) {
  const inputRef = useRef(null)
  const blobRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  const hasImage = Boolean(src)

  useEffect(() => {
    if (blobRef.current && src !== blobRef.current) {
      URL.revokeObjectURL(blobRef.current)
      blobRef.current = null
    }

    if (src?.startsWith('blob:')) {
      blobRef.current = src
    }
  }, [src])

  useEffect(() => {
    return () => {
      if (blobRef.current) {
        URL.revokeObjectURL(blobRef.current)
      }
    }
  }, [])

  function handleFile(file) {
    if (!file?.type.startsWith('image/')) return

    if (blobRef.current) {
      URL.revokeObjectURL(blobRef.current)
    }

    const url = URL.createObjectURL(file)
    blobRef.current = url
    onChange(url)
  }

  function handleInputChange(e) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    e.target.value = ''
  }

  function handleClick() {
    inputRef.current?.click()
  }

  function handleDragEnter(e) {
    e.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave(e) {
    e.preventDefault()
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragging(false)
    }
  }

  function handleDragOver(e) {
    e.preventDefault()
  }

  function handleDrop(e) {
    e.preventDefault()
    setIsDragging(false)
    handleFile(e.dataTransfer.files?.[0])
  }

  const classNames = [
    'image-upload-preview',
    isDragging && 'image-upload-preview--dragging',
    hasImage && 'image-upload-preview--has-image',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={classNames}
      onClick={handleClick}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
      aria-label="Upload image by click or drag and drop"
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="image-upload-preview__input"
        onChange={handleInputChange}
      />

      {hasImage ? (
        <>
          <img
            src={src}
            alt="Uploaded preview"
            className="image-upload-preview__image"
          />
          <span className="image-upload-preview__change">Change image</span>
        </>
      ) : (
        <div className="image-upload-preview__placeholder">
          <span className="image-upload-preview__icon">
            <UploadIcon />
          </span>
          <p className="image-upload-preview__title">Upload an image</p>
          <p className="image-upload-preview__hint">
            Click or drag and drop here
          </p>
        </div>
      )}
    </div>
  )
}

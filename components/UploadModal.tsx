"use client"
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { useRef, useState } from 'react'
import { useStore } from '@/store/useStore'
import StatusBadge from '@/components/StatusBadge'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'

export default function UploadModal({ open, onClose, productId }: { open: boolean; onClose: () => void; productId?: string }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const uploadPrescription = useStore((s) => s.uploadPrescription)
  const attachPrescriptionToItem = useStore((s) => s.attachPrescriptionToItem)
  const [preview, setPreview] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const ok = ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type) && file.size <= 10 * 1024 * 1024
    if (!ok) {
      toast.error('Invalid file. Use JPG, PNG, or PDF up to 10MB')
      return
    }
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = () => setPreview(reader.result as string)
      reader.readAsDataURL(file)
    } else setPreview(null)
    let val = 0
    const t = setInterval(() => {
      val += 10
      setProgress(val)
      if (val >= 100) {
        clearInterval(t)
        const reader = new FileReader()
        reader.onload = () => {
          const id = uploadPrescription(reader.result as string, productId)
          if (productId) attachPrescriptionToItem(productId, id)
          toast.success('Prescription uploaded')
          onClose()
        }
        reader.readAsDataURL(file)
      }
    }, 80)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-4">
        <div className="text-lg font-semibold">Upload Prescription</div>
        <div className="mt-3 text-sm text-slate-600">Accepts JPG, PNG, PDF up to 10MB</div>
        <div className="mt-4 flex items-center gap-2">
          <input ref={inputRef} type="file" accept="image/*,.pdf" onChange={onFile} />
        </div>
        {preview && (
          <div className="mt-4">
            <img src={preview} alt="Preview" className="max-h-64 rounded" />
          </div>
        )}
        <div className="mt-4">
          <Progress value={progress} />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>
      </div>
    </Modal>
  )
}

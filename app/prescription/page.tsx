"use client"
import { useStore } from '@/store/useStore'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Protected from '@/components/Protected'
import { toast } from 'sonner'

function PrescriptionUploadInner() {
  const uploadPrescription = useStore((s) => s.uploadPrescription)
  const [preview, setPreview] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const ok = ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type) && file.size <= 10 * 1024 * 1024
    if (!ok) {
      toast.error('Invalid file')
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
          uploadPrescription(reader.result as string)
          toast.success('Uploaded')
        }
        reader.readAsDataURL(file)
      }
    }, 80)
  }

  return (
    <div className="grid gap-4">
      <div className="text-lg font-semibold">Upload Prescription</div>
      <input type="file" accept="image/*,.pdf" onChange={onFile} />
      {preview && <img src={preview} alt="Preview" className="max-h-64 rounded" />}
      <Progress value={progress} />
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => { setPreview(null); setProgress(0) }}>Reset</Button>
      </div>
    </div>
  )
}

export default function PrescriptionUploadPage() {
  return (
    <Protected>
      <PrescriptionUploadInner />
    </Protected>
  )
}

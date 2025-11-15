"use client"
import { useEffect, useState } from 'react'
import { useStore } from '@/store/useStore'
import StatusBadge from '@/components/StatusBadge'
import Protected from '@/components/Protected'
import { Button } from '@/components/ui/button'

function PrescriptionsInner() {
  const prescriptions = useStore((s) => s.prescriptions)
  const updateStatus = useStore((s) => s.updatePrescriptionStatus)

  useEffect(() => {
    const t = setInterval(() => {
      const pendings = prescriptions.filter((p) => p.status === 'Pending')
      if (pendings.length) {
        const pick = pendings[Math.floor(Math.random() * pendings.length)]
        const status = Math.random() > 0.5 ? 'Approved' : 'Rejected'
        updateStatus(pick.id, status, status === 'Rejected' ? 'Unclear dosage' : null)
      }
    }, 5000)
    return () => clearInterval(t)
  }, [prescriptions, updateStatus])

  return (
    <div className="grid gap-4">
      {prescriptions.map((p) => (
        <div key={p.id} className="flex items-center justify-between rounded border border-slate-200 p-4">
          <div className="flex items-center gap-4">
            {p.imageURL && <img src={p.imageURL} alt={p.id} className="h-16 w-16 rounded object-cover" />}
            <div>
              <div className="text-sm">{p.id}</div>
              <StatusBadge status={p.status} />
              {p.rejectionReason && <div className="text-xs text-red-600">{p.rejectionReason}</div>}
            </div>
          </div>
          {p.status === 'Rejected' && <Button variant="outline">Re-upload</Button>}
        </div>
      ))}
    </div>
  )
}

export default function PrescriptionsPage() {
  return (
    <Protected>
      <PrescriptionsInner />
    </Protected>
  )
}

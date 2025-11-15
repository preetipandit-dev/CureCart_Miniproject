"use client"
import { useEffect } from 'react'
import { getPrescriptions } from '@/lib/api'
import { useStore } from '@/store/useStore'

export default function InitData() {
  const setPrescriptions = useStore((s) => s.prescriptions)
  const update = useStore.setState
  useEffect(() => {
    getPrescriptions().then((list) => {
      update({ prescriptions: list })
    })
  }, [update])
  return null
}

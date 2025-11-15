import { Badge } from '@/components/ui/badge'

export default function PrescriptionBadge({ required }: { required: boolean }) {
  return required ? (
    <Badge variant="warning">Prescription Required</Badge>
  ) : (
    <Badge variant="success">OTC</Badge>
  )
}

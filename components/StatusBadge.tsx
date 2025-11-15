import { Badge } from '@/components/ui/badge'

export default function StatusBadge({ status }: { status: 'Pending' | 'Approved' | 'Rejected' }) {
  if (status === 'Approved') return <Badge variant="success">Approved</Badge>
  if (status === 'Rejected') return <Badge variant="destructive">Rejected</Badge>
  return <Badge>Pending</Badge>
}

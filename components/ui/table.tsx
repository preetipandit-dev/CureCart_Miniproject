import React from 'react'

export function Table({ children }: { children: React.ReactNode }) {
  return <table className="w-full border-collapse text-sm">{children}</table>
}

export function THead({ children }: { children: React.ReactNode }) {
  return <thead className="bg-slate-50">{children}</thead>
}

export function TRow({ children }: { children: React.ReactNode }) {
  return <tr className="border-b border-slate-200">{children}</tr>
}

export function TH({ children }: { children: React.ReactNode }) {
  return <th className="px-3 py-2 text-left font-medium text-slate-700">{children}</th>
}

export function TD({ children }: { children: React.ReactNode }) {
  return <td className="px-3 py-2">{children}</td>
}

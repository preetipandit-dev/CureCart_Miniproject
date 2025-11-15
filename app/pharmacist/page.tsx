"use client";
import { useStore } from "@/store/useStore";
import { Table, THead, TRow, TH, TD } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Protected from "@/components/Protected";
import { useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";

function PharmacistInner() {
  const prescriptions = useStore((s) => s.prescriptions);
  const updateStatus = useStore((s) => s.updatePrescriptionStatus);
  const user = useStore((s) => s.user);
  const router = useRouter();
  useEffect(() => {
    if (!user || user.role !== "admin") router.replace("/");
  }, [user, router]);

  const rows = useMemo(
    () =>
      prescriptions.map((p) => ({
        id: p.id,
        user: "Demo User",
        product: p.productId || "-",
        date: new Date().toLocaleDateString(),
        status: p.status,
        imageURL: p.imageURL,
      })),
    [prescriptions]
  );

  return (
    <div className="grid gap-4">
      <Table>
        <THead>
          <TRow>
            <TH>User</TH>
            <TH>Product</TH>
            <TH>Date</TH>
            <TH>Status</TH>
            <TH>Actions</TH>
          </TRow>
        </THead>
        <tbody>
          {rows.map((r) => (
            <TRow key={r.id}>
              <TD>{r.user}</TD>
              <TD>{r.product}</TD>
              <TD>{r.date}</TD>
              <TD>{r.status}</TD>
              <TD>
                <Button
                  size="sm"
                  onClick={() => updateStatus(r.id, "Approved")}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    updateStatus(r.id, "Rejected", "Need clear photo")
                  }
                >
                  Reject
                </Button>
                <Button size="sm" variant="ghost">
                  Need Info
                </Button>
              </TD>
            </TRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default function PharmacistPage() {
  return (
    <Protected>
      <PharmacistInner />
    </Protected>
  );
}

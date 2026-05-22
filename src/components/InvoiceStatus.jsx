// A reusable component to display the payment status of an invoice as a stylized badge.
// It receives the 'status' prop from the parent component.
export default function InvoiceStatus({ status }) {
  // We define a variable to hold the dynamic Tailwind CSS class names for our badge.
  // By default, we will fall back to a simple gray design if the status is unrecognized.
  let badgeStyles = 'bg-slate-100 text-slate-700 border-slate-200'

  // We use standard conditional checks to decide which styles to apply based on the status prop.
  if (status === 'Paid') {
    // For paid invoices, we use an elegant light green theme.
    badgeStyles = 'bg-emerald-50 text-emerald-700 border border-emerald-100/80'
  } else if (status === 'Pending') {
    // For pending invoices, we use an elegant light amber/yellow theme.
    badgeStyles = 'bg-amber-50 text-amber-700 border border-amber-100/80'
  } else if (status === 'Overdue') {
    // For overdue invoices, we use an elegant light red/rose theme.
    badgeStyles = 'bg-rose-50 text-rose-700 border border-rose-100/80'
  }

  return (
    // We render a rounded badge with nice horizontal and vertical padding.
    // - 'inline-flex' makes the badge shrinkwrap its content perfectly.
    // - 'items-center' keeps the text centered vertical.
    // - 'text-xs' makes the badge text slightly smaller than standard paragraph text.
    // - 'font-semibold' gives the text a bold, readable weight.
    // - 'tracking-wide' adds nice professional letter spacing.
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${badgeStyles}`}>
      {status}
    </span>
  )
}

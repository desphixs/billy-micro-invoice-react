// Import the Check icon from Lucide React to represent a successful payment state
import { Check } from 'lucide-react'

// A reusable action button component to manage marking invoices as paid.
// It accepts:
// - 'status': the current invoice payment status string (such as 'Paid', 'Pending', 'Overdue')
// - 'onClick': callback function triggered when the user clicks the active button
export default function MarkPaidButton({ status, onClick }) {
  // If the status is already 'Paid', we display a disabled button with an elegant green theme
  if (status === 'Paid') {
    return (
      <button
        disabled
        className="w-full py-3.5 px-4 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-2xl text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 cursor-not-allowed"
      >
        <Check size={16} className="stroke-[2.5]" />
        <span>Invoice Fully Paid</span>
      </button>
    )
  }

  // Otherwise, we render a clickable, interactive indigo button to trigger payment
  return (
    <button
      onClick={onClick}
      className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm shadow-indigo-100 hover:shadow-indigo-200 transition-all duration-200"
    >
      <span>Mark as Paid</span>
    </button>
  )
}

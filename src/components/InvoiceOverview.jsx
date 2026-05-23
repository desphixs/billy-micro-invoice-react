// Import the reusable InvoiceStatus badge component from the same directory
import InvoiceStatus from './InvoiceStatus'

// The component for rendering the Invoice Overview view panel.
// It accepts 'invoices' (an array of invoice objects) and 'onSelectInvoice' (a callback function) as props.
export default function InvoiceOverview({ invoices, onSelectInvoice }) {
  return (
    // Outer container for spacing our title and table board
    <div className="space-y-8 animate-fadeIn">
      {/* Header information for the invoices page */}
      <div>
        <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Invoice Overview</h2>
        <p className="text-sm text-slate-500 mt-1">Manage your invoices and track payments.</p>
      </div>
      
      {/* The white card housing our client invoice board */}
      <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-6">
        
        {/* 
          We use an overflow container to prevent layout breaking on small tablet screens.
          This makes our layout responsive!
        */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              {/* The table header with elegant, faded slate labels */}
              <tr className="border-b border-slate-100">
                <th className="pb-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Client</th>
                <th className="pb-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Invoice ID</th>
                <th className="pb-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Amount</th>
                <th className="pb-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Due Date</th>
                <th className="pb-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {/* 
                We loop over our list of invoices using '.map()'.
                For each invoice item, we return a standard HTML table row '<tr>' dynamically filled with values.
                We make each row clickable by adding the 'cursor-pointer' Tailwind class.
                When clicked, the 'onSelectInvoice' callback is triggered with the invoice's ID.
              */}
              {invoices.map((invoice) => (
                <tr 
                  key={invoice.id} 
                  onClick={() => onSelectInvoice(invoice.id)}
                  className="hover:bg-slate-50/50 cursor-pointer transition-colors duration-150"
                >
                  {/* Client Name */}
                  <td className="py-4 px-4 text-sm font-semibold text-slate-900">{invoice.clientName}</td>
                  {/* Unique Invoice ID */}
                  <td className="py-4 px-4 text-sm text-slate-500">{invoice.id}</td>
                  {/* Amount - dynamically formatted with commas for thousands */}
                  <td className="py-4 px-4 text-sm font-medium text-slate-900">${invoice.amount.toLocaleString()}</td>
                  {/* Due Date */}
                  <td className="py-4 px-4 text-sm text-slate-500">{invoice.dueDate}</td>
                  {/* Status Badge - rendered using our reusable InvoiceStatus component */}
                  <td className="py-4 px-4 text-sm">
                    <InvoiceStatus status={invoice.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>

    </div>
  )
}

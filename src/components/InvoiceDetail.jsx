// Import the Close icon from Lucide React to create a premium close button
import { X } from 'lucide-react'
// Import our reusable InvoiceStatus badge component
import InvoiceStatus from './InvoiceStatus'

// The InvoiceDetail component receives 'invoice' (the selected invoice object)
// and 'onClose' (a function to clear activeInvoiceId state and close the view) as props.
export default function InvoiceDetail({ invoice, onClose }) {
  // If no invoice is selected, we return null to render nothing on screen
  if (!invoice) return null

  return (
    // Backdrop overlay to focus the user's attention.
    // - 'bg-slate-900/40' applies a modern, soft blurred dim effect.
    // - 'backdrop-blur-sm' blurs the background content for a highly premium glass look.
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex justify-end animate-fadeIn">
      
      {/* 
        Slide-out side drawer container.
        - 'w-full max-w-lg' occupies the full screen on mobile but remains a sleek panel on desktop.
        - 'bg-white' and 'shadow-2xl' provide a crisp, floating card aesthetic.
        - 'animate-slideInRight' or nice transitions animate the drawer moving in.
      */}
      <div className="w-full max-w-lg h-full bg-white shadow-2xl flex flex-col justify-between p-8 relative overflow-y-auto animate-slideIn">
        
        {/* Top block containing header info and close button */}
        <div className="space-y-8">
          
          {/* Header row with Close button and title */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Invoice Details</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">{invoice.id}</h3>
            </div>
            {/* Elegant, circular close button with hover state */}
            <button 
              onClick={onClose}
              className="h-10 w-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Client Details Section */}
          <div className="grid grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100/50">
            <div>
              <h5 className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Client Name</h5>
              <p className="text-sm font-semibold text-slate-900 mt-1">{invoice.clientName}</p>
            </div>
            <div>
              <h5 className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Client Email</h5>
              <p className="text-sm text-slate-600 mt-1 truncate">{invoice.clientEmail}</p>
            </div>
            <div>
              <h5 className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Issue Date</h5>
              <p className="text-sm text-slate-700 mt-1">{invoice.issueDate}</p>
            </div>
            <div>
              <h5 className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Due Date</h5>
              <p className="text-sm text-slate-700 mt-1">{invoice.dueDate}</p>
            </div>
          </div>

          {/* Payment Status & Large Amount Board */}
          <div className="flex justify-between items-center bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100/30">
            <div>
              <h5 className="text-[10px] text-indigo-600/80 font-semibold tracking-wider uppercase">Total Amount Due</h5>
              <p className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                ${invoice.amount.toLocaleString()}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <h5 className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Status</h5>
              <InvoiceStatus status={invoice.status} />
            </div>
          </div>

          {/* Detailed Line-Item Breakdown */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Services Rendered</h4>
            
            <div className="border border-slate-100 rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-medium">
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4 text-center">Qty</th>
                    <th className="py-3 px-4 text-right">Rate</th>
                    <th className="py-3 px-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {invoice.items.map((item, index) => (
                    <tr key={index} className="text-slate-700">
                      <td className="py-3 px-4 font-medium text-slate-900">{item.description}</td>
                      <td className="py-3 px-4 text-center">{item.quantity}</td>
                      <td className="py-3 px-4 text-right">${item.rate.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right font-semibold text-slate-900">
                        ${(item.quantity * item.rate).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Bottom space wrapper to pad card nicely */}
        <div className="mt-8 pt-4 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400">
            Billy Suite - Securely powered by React
          </p>
        </div>

      </div>

    </div>
  )
}

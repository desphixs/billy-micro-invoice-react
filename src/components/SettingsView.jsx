import { useState } from 'react'
// Import premium Lucide React icons for professional form controls
import { Save, CheckCircle, Database } from 'lucide-react'

// The component for rendering the App Settings view panel.
// It accepts:
// - 'settings': the active settings object containing business details
// - 'onUpdateSettings': a callback function to write updated settings back to App.jsx
export default function SettingsView({ settings, onUpdateSettings }) {
  // We declare local form state so typing in fields is immediate and ultra-smooth.
  // - We seed the fields using our global settings passed down from the parent prop.
  const [formValues, setFormValues] = useState({
    businessName: settings.businessName,
    email: settings.email,
    currency: settings.currency,
    paymentTerms: settings.paymentTerms
  })

  // We declare a state to control the visibility of our success confirmation toast
  const [showSuccess, setShowSuccess] = useState(false)

  // A generic input change handler to keep our form state in sync as the student types
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Action handler to save settings globally
  const handleSubmit = (e) => {
    // Prevent the standard browser form submit reload
    e.preventDefault()
    // Invoke our parent callback to trigger state updates and localStorage persistence
    onUpdateSettings(formValues)
    // Show our premium success notification badge
    setShowSuccess(true)
    // Clear the notification after 3 seconds
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Page Header Area */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-950 tracking-tight">App Settings</h2>
          <p className="text-sm text-slate-500 mt-1">Configure your freelance profile and payment details.</p>
        </div>

        {/* 
          Glassmorphic Success Notification Banner.
          - Conditionally rendered and animated when showSuccess is true.
        */}
        {showSuccess && (
          <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-2xl text-xs font-semibold shadow-sm animate-fadeIn">
            <CheckCircle size={16} className="text-emerald-600 stroke-[2.5]" />
            <span>Profile Saved and Synced to LocalStorage!</span>
          </div>
        )}
      </div>
      
      {/* The main card containing our interactive settings form */}
      <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-8">
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Input Field: Business / Freelancer Name */}
            <div className="space-y-2">
              <label htmlFor="businessName" className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                Business Name
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formValues.businessName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-2xl border border-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50/50 text-sm font-medium text-slate-900 transition-all placeholder-slate-300"
                placeholder="Sarah Freelance"
              />
            </div>

            {/* Input Field: Client Contact / Billing Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                Billing Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-2xl border border-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50/50 text-sm font-medium text-slate-900 transition-all placeholder-slate-300"
                placeholder="sarah@design.com"
              />
            </div>

            {/* Select Dropdown: Localized Currency Symbol */}
            <div className="space-y-2">
              <label htmlFor="currency" className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                Currency Symbol
              </label>
              <select
                id="currency"
                name="currency"
                value={formValues.currency}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border border-slate-100 bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50/50 text-sm font-medium text-slate-900 transition-all"
              >
                <option value="$">USD - Dollar ($)</option>
                <option value="€">EUR - Euro (€)</option>
                <option value="£">GBP - Pound Sterling (£)</option>
                <option value="¥">JPY - Yen (¥)</option>
                <option value="₦">NGN - Naira (₦)</option>
              </select>
            </div>

            {/* Select Dropdown: Payment Due Terms */}
            <div className="space-y-2">
              <label htmlFor="paymentTerms" className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                Default Payment Terms
              </label>
              <select
                id="paymentTerms"
                name="paymentTerms"
                value={formValues.paymentTerms}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border border-slate-100 bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50/50 text-sm font-medium text-slate-900 transition-all"
              >
                <option value="Due on Receipt">Due on Receipt</option>
                <option value="Net 15">Net 15 Days</option>
                <option value="Net 30">Net 30 Days</option>
                <option value="Net 60">Net 60 Days</option>
              </select>
            </div>

          </div>

          {/* Action Trigger Block containing Save Button */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-50">
            <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1.5">
              <Database size={12} />
              <span>Updates apply instantly across the suite.</span>
            </span>
            
            <button
              type="submit"
              className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-semibold tracking-wider uppercase flex items-center gap-2 shadow-sm shadow-indigo-100 hover:shadow-indigo-200 transition-all duration-200"
            >
              <Save size={14} />
              <span>Save Settings</span>
            </button>
          </div>

        </form>

      </div>

    </div>
  )
}

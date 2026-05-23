import { useState, useEffect } from 'react'
// Import premium, clean icons from Lucide React to give our app a modern design
import { 
  ReceiptText,
  Settings
} from 'lucide-react'
// Import custom, modular view components from our new components directory
import InvoiceOverview from './components/InvoiceOverview'
import SettingsView from './components/SettingsView'
import InvoiceDetail from './components/InvoiceDetail'

function App() {
  // We initialize the activeTab state to keep track of which menu page is selected.
  // - By default, we start on the 'invoices' view.
  // - 'activeTab' holds our current tab name as a string.
  // - 'setActiveTab' is the function we call to update this tab value.
  const [activeTab, setActiveTab] = useState('invoices')

  // We initialize the activeInvoiceId state to track which invoice is clicked.
  // - When it is null, no detail sidebar is shown.
  // - When a user clicks a row, we set it to that invoice's unique ID.
  const [activeInvoiceId, setActiveInvoiceId] = useState(null)

  // We initialize our settings state with a lazy initialization function.
  // - It inspects localStorage. If 'billy_settings' exists, we parse and return it.
  // - Otherwise, we fallback to our starting defaults.
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('billy_settings')
    return saved ? JSON.parse(saved) : {
      businessName: 'Sarah Freelance',
      email: 'sarah@design.com',
      currency: '$',
      paymentTerms: 'Net 30'
    }
  })

  // We define a list of mock invoices inside our React state with a lazy initializer.
  // - It checks if 'billy_invoices' exists in localStorage. If so, we parse it.
  // - Otherwise, we seed it with our rich starting list of five invoices.
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('billy_invoices')
    return saved ? JSON.parse(saved) : [
      { 
        id: 'INV-001', 
        clientName: 'Acme Corporation', 
        clientEmail: 'billing@acme.com',
        amount: 1500, 
        issueDate: '2026-05-15',
        dueDate: '2026-06-01', 
        status: 'Paid',
        items: [
          { description: 'Website Redesign Project', quantity: 1, rate: 1000 },
          { description: 'SEO Optimization Service', quantity: 2, rate: 250 }
        ]
      },
      { 
        id: 'INV-002', 
        clientName: 'Dexter Labs', 
        clientEmail: 'dexter@labs.com',
        amount: 850, 
        issueDate: '2026-05-20',
        dueDate: '2026-05-28', 
        status: 'Pending',
        items: [
          { description: 'Custom Dashboard UI Integration', quantity: 1, rate: 600 },
          { description: 'General Consulting Support', quantity: 5, rate: 50 }
        ]
      },
      { 
        id: 'INV-003', 
        clientName: 'Wayne Enterprises', 
        clientEmail: 'accounts@wayne.corp',
        amount: 3200, 
        issueDate: '2026-04-15',
        dueDate: '2026-05-15', 
        status: 'Overdue',
        items: [
          { description: 'Mobile Application Architecture Design', quantity: 1, rate: 2500 },
          { description: 'API Backend Deployment Consulting', quantity: 7, rate: 100 }
        ]
      },
      { 
        id: 'INV-004', 
        clientName: 'Stark Industries', 
        clientEmail: 'tony@stark.com',
        amount: 4200, 
        issueDate: '2026-05-10',
        dueDate: '2026-06-10', 
        status: 'Pending',
        items: [
          { description: 'Iron Suit HUD Interface Widget', quantity: 1, rate: 3000 },
          { description: 'Cloud Infrastructure Setup Services', quantity: 8, rate: 150 }
        ]
      },
      { 
        id: 'INV-005', 
        clientName: 'Oscorp Technologies', 
        clientEmail: 'finance@oscorp.org',
        amount: 950, 
        issueDate: '2026-05-01',
        dueDate: '2026-05-10', 
        status: 'Paid',
        items: [
          { description: 'Responsive Web Portal Landing Page', quantity: 1, rate: 800 },
          { description: 'Logo and Visual Branding Materials', quantity: 1, rate: 150 }
        ]
      }
    ]
  })

  // We use useEffect to save the invoices list into localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('billy_invoices', JSON.stringify(invoices))
  }, [invoices])

  // We use useEffect to save settings into localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('billy_settings', JSON.stringify(settings))
  }, [settings])

  // We search through the invoices array to locate the active invoice object.
  // - If activeInvoiceId is null, activeInvoice will be undefined.
  // - If found, it returns the full invoice object containing clients, line items, and status.
  const activeInvoice = invoices.find(invoice => invoice.id === activeInvoiceId)

  // We define a function to update an invoice status to 'Paid' inside our database.
  // - It maps over our list of invoices.
  // - If it matches the unique ID, it returns a new invoice object with the status set to 'Paid'.
  // - Otherwise, it leaves the invoice completely unchanged.
  // - Finally, it saves the new array into our invoices state.
  const markAsPaid = (id) => {
    setInvoices(prevInvoices => 
      prevInvoices.map(invoice => 
        invoice.id === id ? { ...invoice, status: 'Paid' } : invoice
      )
    )
  }

  return (
    // This is our main outer container. 
    // - 'min-h-screen' ensures the app fills the full height of the user's screen.
    // - 'flex' places the sidebar (left) and the main workspace content (right) side-by-side.
    // - 'bg-slate-50/50' applies a modern, warm off-white/light gray background.
    // - 'font-sans antialiased text-slate-800' sets readable default text styles.
    <div className="min-h-screen bg-slate-50/50 flex font-sans antialiased text-slate-800">
      
      {/* 
        -------------------------------------------------------------
        STICKY NAVIGATION SIDEBAR
        -------------------------------------------------------------
        - 'w-64' sets a precise, elegant width for our sidebar menu.
        - 'sticky top-0 h-screen' locks the sidebar to the left edge so it stays in place when scrolling.
        - 'bg-white' and 'border-r border-slate-100' provide a sharp, crisp border divider.
        - 'flex flex-col justify-between' pushes the profile widget to the very bottom automatically.
      */}
      <aside className="w-64 sticky top-0 h-screen bg-white border-r border-slate-100 flex flex-col justify-between p-6">
        
        {/* Top block containing the application brand logo and the navigation links */}
        <div className="space-y-8">
          
          {/* Brand Logo & Title Area */}
          <div className="flex items-center gap-3 px-2">
            {/* Elegant gradient background container for a premium branding mark */}
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-sm">
              <ReceiptText size={18} className="stroke-[2.5]" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none text-slate-900 tracking-tight">Billy</h1>
              <span className="text-[11px] text-indigo-600 font-semibold tracking-wider uppercase">Freelancer Suite</span>
            </div>
          </div>

          {/* Sidebar Navigation Items */}
          <nav className="space-y-1">
            
            {/* Navigation Button: Invoices Overview */}
            {/* 
              We listen for standard mouse clicks using 'onClick'.
              When clicked, we trigger 'setActiveTab' to change the state to 'invoices'.
            */}
            <button
              onClick={() => setActiveTab('invoices')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === 'invoices'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {/* If active, the icon changes color to match the active text theme */}
              <ReceiptText size={18} className={activeTab === 'invoices' ? 'text-indigo-500' : 'text-slate-400'} />
              <span>Invoices Overview</span>
            </button>

            {/* Navigation Button: App Settings */}
            {/* 
              We listen for standard mouse clicks using 'onClick'.
              When clicked, we trigger 'setActiveTab' to change the state to 'settings'.
            */}
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === 'settings'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {/* If active, the icon changes color to match the active text theme */}
              <Settings size={18} className={activeTab === 'settings' ? 'text-indigo-500' : 'text-slate-400'} />
              <span>App Settings</span>
            </button>

          </nav>
        </div>

        {/* 
          FREELANCER PROFILE WIDGET
          - Displays the logged-in user at the bottom.
          - We dynamically query this from our saved settings state!
        */}
        <div className="p-3 bg-slate-50 rounded-2xl flex items-center gap-3 border border-slate-100">
          <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-xs tracking-wider">
            {settings.businessName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-semibold text-slate-900 truncate">{settings.businessName}</h4>
            <p className="text-[10px] text-slate-500 truncate">{settings.email}</p>
          </div>
        </div>

      </aside>

      {/* 
        =============================================================
        MAIN WORKSPACE CONTENT
        =============================================================
        - 'flex-1' allows the content to expand and fill all remaining horizontal screen space.
        - 'p-10' adds generous, aesthetic breathing room so elements feel premium.
      */}
      <main className="flex-1 p-10">
        
        {/* 
          We use conditional rendering to show the Invoices Overview panel only when activeTab is 'invoices'.
          This ensures clean page switches without reloading the browser!
          We pass the active invoices array, selection callback, and currency symbol from settings.
        */}
        {activeTab === 'invoices' && (
          <InvoiceOverview 
            invoices={invoices} 
            onSelectInvoice={setActiveInvoiceId} 
            currency={settings.currency}
          />
        )}
          
        {/* 
          We use conditional rendering to show the App Settings panel only when activeTab is 'settings'.
          We pass our active settings and a state update callback prop.
        */}
        {activeTab === 'settings' && (
          <SettingsView settings={settings} onUpdateSettings={setSettings} />
        )}

      </main>

      {/* 
        =============================================================
        INVOICE DETAIL MODAL OVERLAY
        =============================================================
        - If activeInvoiceId is set and we successfully find that invoice, we show the detail panel.
        - We pass the activeInvoice object, close callback, markAsPaid callback, and currency symbol.
      */}
      {activeInvoiceId && activeInvoice && (
        <InvoiceDetail 
          invoice={activeInvoice} 
          onClose={() => setActiveInvoiceId(null)} 
          onMarkAsPaid={markAsPaid}
          currency={settings.currency}
        />
      )}

    </div>
  )
}

export default App

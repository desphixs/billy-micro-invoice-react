import { useState } from 'react'
// Import premium, clean icons from Lucide React to give our app a modern design
import { 
  ReceiptText,
  Settings
} from 'lucide-react'
// Import custom, modular view components from our new components directory
import InvoiceOverview from './components/InvoiceOverview'
import SettingsView from './components/SettingsView'

function App() {
  // We initialize the activeTab state to keep track of which menu page is selected.
  // - By default, we start on the 'invoices' view.
  // - 'activeTab' holds our current tab name as a string.
  // - 'setActiveTab' is the function we call to update this tab value.
  const [activeTab, setActiveTab] = useState('invoices')

  // We define a list of mock invoices inside our React state.
  // - Each invoice contains an 'id', 'clientName', 'amount', 'dueDate', and 'status'.
  // - This list matches what Sarah Freelance needs to track.
  // - We use 'useState' so that when we eventually add features to edit or mark paid, the UI updates instantly.
  const [invoices, setInvoices] = useState([
    { id: 'INV-001', clientName: 'Acme Corporation', amount: 1500, dueDate: '2026-06-01', status: 'Paid' },
    { id: 'INV-002', clientName: 'Dexter Labs', amount: 850, dueDate: '2026-05-28', status: 'Pending' },
    { id: 'INV-003', clientName: 'Wayne Enterprises', amount: 3200, dueDate: '2026-05-15', status: 'Overdue' },
    { id: 'INV-004', clientName: 'Stark Industries', amount: 4200, dueDate: '2026-06-10', status: 'Pending' },
    { id: 'INV-005', clientName: 'Oscorp Technologies', amount: 950, dueDate: '2026-05-10', status: 'Paid' }
  ])

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
          -------------------------------------------------------------
          FREELANCER PROFILE WIDGET
          -------------------------------------------------------------
          Located at the bottom of the sidebar to make the interface feel professional and personalized.
        */}
        <div className="p-3 bg-slate-50 rounded-2xl flex items-center gap-3 border border-slate-100">
          <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
            SF
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-semibold text-slate-900 truncate">Sarah Freelance</h4>
            <p className="text-[10px] text-slate-500 truncate">sarah@design.com</p>
          </div>
        </div>

      </aside>

      {/* 
        -------------------------------------------------------------
        MAIN WORKSPACE CONTENT
        -------------------------------------------------------------
        - 'flex-1' allows the content to expand and fill all remaining horizontal screen space.
        - 'p-10' adds generous, aesthetic breathing room so elements feel premium.
      */}
      <main className="flex-1 p-10">
        
         {/* 
           We use conditional rendering to show the Invoices Overview panel only when activeTab is 'invoices'.
           This ensures clean page switches without reloading the browser!
         */}
         {activeTab === 'invoices' && (
           <InvoiceOverview invoices={invoices} />
         )}
          
         {/* 
           We use conditional rendering to show the App Settings panel only when activeTab is 'settings'.
         */}
         {activeTab === 'settings' && (
           <SettingsView />
         )}

      </main>

    </div>
  )
}

export default App

import { useState } from 'react'
// Import premium, clean icons from Lucide React to give our app a modern, premium design
import { 
  ReceiptText
} from 'lucide-react'

function App() {
  // -------------------------------------------------------------
  // STATE MANAGEMENT
  // -------------------------------------------------------------
  // We use useState to keep track of which page the user is currently viewing.
  // By default, we start on the 'invoices' page.
  const [activeTab, setActiveTab] = useState('settings')

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
            <button
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900`}
            >
              {/* If active, the icon changes color to match the active text theme */}
              <ReceiptText size={18} className= {'text-slate-400'} />
              <span>Invoices Overview</span>
            </button>

            {/* Navigation Button: App Settings */}
            <button
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900`}
            >
              {/* If active, the icon changes color to match the active text theme */}
              <ReceiptText size={18} className= {'text-slate-400'} />
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
        - 'max-w-5xl' sets a beautiful centered layout limit for great readability.
      */}
      <main className="flex-1 p-10 space-y-32">
        
         
           <div className="space-y-8 animate-fadeIn">
            <div>
              <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Invoice Overview</h2>
              <p className="text-sm text-slate-500 mt-1">Manage your invoices and track payments.</p>
            </div>
            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-6"></div>

          </div>
          
          <div className="space-y-8 animate-fadeIn">
            
            {/* Page Header */}
            <div>
              <h2 className="text-2xl font-bold text-slate-950 tracking-tight">App Settings</h2>
              <p className="text-sm text-slate-500 mt-1">Configure your freelance profile and payment details.</p>
            </div>
            
            {/* Editable Profile Information Form Card */}
            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-6"></div>

          </div>

      </main>

    </div>
  )
}

export default App

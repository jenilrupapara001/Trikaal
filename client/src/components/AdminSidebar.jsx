import React from 'react';

const AdminSidebar = () => {
    const menus = [
        { icon: 'dashboard', label: 'Overview', active: true },
        { icon: 'event_note', label: 'Consultations' },
        { icon: 'group', label: 'Clients' },
        { icon: 'edit_note', label: 'Blog' },
        { icon: 'settings', label: 'Settings' }
    ];

    return (
        <aside className="w-64 h-screen bg-[#1a0030] fixed left-0 top-0 border-r border-[#e6c364]/10 py-8 px-4 flex flex-col">
            <div className="px-4 mb-10">
                <div className="text-2xl font-headline font-bold text-[#e6c364]">Trikaal Admin</div>
                <div className="text-[10px] text-[#d0c5b2]/60 uppercase tracking-widest mt-1">Cosmic Oracle</div>
            </div>
            <nav className="flex-1 space-y-1">
                {menus.map((menu, i) => (
                    <a key={i} href="#" className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all ${menu.active ? 'bg-[#e6c364]/10 text-[#e6c364] border-r-4 border-[#e6c364]' : 'text-[#d0c5b2]/70 hover:bg-white/5'}`}>
                        <span className="material-symbols-outlined">{menu.icon}</span>
                        <span className="text-sm font-medium">{menu.label}</span>
                    </a>
                ))}
            </nav>
        </aside>
    );
};

export default AdminSidebar;

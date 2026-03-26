import React, { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ToastContext = createContext(null)

export const useToast = () => {
    const context = useContext(ToastContext)
    if (!context) {
        // Return a no-op function if context not available
        return { success: () => { }, error: () => { } }
    }
    return context
}

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([])

    const addToast = useCallback((message, type = 'success') => {
        const id = Date.now() + Math.random()
        setToasts(prev => [...prev, { id, message, type }])
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id))
        }, 4000)
    }, [])

    const success = useCallback((message) => addToast(message, 'success'), [addToast])
    const error = useCallback((message) => addToast(message, 'error'), [addToast])

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }

    return (
        <ToastContext.Provider value={{ success, error }}>
            {children}
            <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 50, scale: 0.9 }}
                            className={`
                px-5 py-3 rounded-xl text-sm font-bold shadow-xl border
                flex items-center gap-3 min-w-[280px] max-w-[400px]
                ${toast.type === 'success'
                                    ? 'bg-green-900/30 border-green-500/30 text-green-300'
                                    : 'bg-red-900/30 border-red-500/30 text-red-300'
                                }
              `}
                        >
                            <span className="material-symbols-outlined text-lg">
                                {toast.type === 'success' ? 'check_circle' : 'error'}
                            </span>
                            <span className="flex-1">{toast.message}</span>
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    )
}

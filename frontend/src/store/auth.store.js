import { create } from "zustand"
import axios from "axios"


const API_URL = import.meta.env.VITE_API_URL

axios.defaults.withCredentials = true

export const useAuthStore = create((set) => ({
    user:null,
    isAuthenticated:false,
    error:null,
    isLoading:false,
    isCheckingAuth:true,

    checkAuth: async () => {

        set({ isCheckingAuth: true, error: null })

        try {
            const res = await axios.get(`${API_URL}/check-auth`)
            set({ isAuthenticated: true, isCheckingAuth: false, user: res.data.user})
            
        } catch (error) {
            console.log("Error checking authenticated", error);
            set({error:null, isCheckingAuth: false, isAuthenticated: false})
        }
            
    },

    signup: async (email, password) => {

        set({isLoading:true, error:null})

        try {
            const res = await axios.post(`${API_URL}/signup`,{email,password})
            set({user:res.data.user, isLoading:false, isAuthenticated:true })
        } catch (error) {
            set({error:error.response.data.message || "Error signing up", isLoading: false})
            throw error           
        }


    },

    verifyEmail: async (code) => {
        set({isLoading: true, error: null})
        
        try {
            const res = await axios.post(`${API_URL}/verify-email`,{ code })
            set({ isAuthenticated:true, isLoading:false, user:res.data.user })
        } catch (error) {
            set({ isLoading:false})
            throw error
        }
    },

    login: async (email, password) => {
        set({isLoading: true, error: null})
        try {
            const res = await axios.post(`${API_URL}/login`, { email, password })
            set({user:res.data.user, isLoading:false, isAuthenticated: true, error:null})
        } catch (error) {
            set({ isLoading: false, isAuthenticated: false})
            throw error
        }
    },

    logout: async () => {
        set({ isLoading:true, error: null})
        try {
            await axios.post(`${API_URL}/logout`)
            set({ isAuthenticated:false, isLoading:false, error:null, user:null })
        } catch (error) {
            set({ error: "Error logging out", isLoading:false})
            throw error
        }
    },

    forgotPassword: async ( email ) => {
        set({isLoading: true, error:null})
        try {
            const res = await axios.post(`${API_URL}/forgot-password`,{ email })
            set({ isLoading:false })
        } catch (error) {
            set({ error: error.response.data.message, isLoading: false, })
            throw error
        }
    },

    resetPassword: async (token, password) => {
        set({ isLoading:true, error:null})
        try {
            const res = await axios.post(`${API_URL}/reset-password/${token}`,{ password })
            set({ isLoading:false })
        } catch (error) {
            set({ error: error.response.data.message || "Failed to Reset password", isLoading:false})
            console.log("Failed to Reset password", error);
            
        }
    }

    
})) 
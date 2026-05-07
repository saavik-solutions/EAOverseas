import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SuperAdminLayout from '../layouts/SuperAdminLayout';

interface User {
    id: string;
    email: string;
    fullName: string;
    role: string;
    isActive: boolean;
    createdAt: string;
}

const SuperAdminUserManagement = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    
    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        password: '',
        role: 'counsellor' // Default role for creation
    });
    
    // Default config using the master role API
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('eaoverseas_token');
            const res = await fetch('http://localhost:4000/api/admin/users', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.data) {
                setUsers(data.data);
            }
        } catch (error) {
            console.error("Error fetching users", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('eaoverseas_token');
            const res = await fetch('http://localhost:4000/api/admin/users', {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(formData)
            });
            
            if (res.ok) {
                setShowCreateModal(false);
                fetchUsers(); // Refresh list
                setFormData({ email: '', fullName: '', password: '', role: 'counsellor' });
            } else {
                const err = await res.json();
                alert(err.error || 'Failed to create user');
            }
        } catch (error) {
            alert('An error occurred while creating user');
        }
    };

    const toggleUserStatus = async (id: string, currentStatus: boolean) => {
        try {
            const token = localStorage.getItem('eaoverseas_token');
            await fetch(`http://localhost:4000/api/admin/users/${id}/status`, {
                method: 'PATCH',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ isActive: !currentStatus })
            });
            fetchUsers();
        } catch (error) {
            console.error("Failed to toggle status", error);
        }
    };

    // Styling Maps
    const getRoleStyles = (role: string) => {
        switch (role) {
            case 'super_admin': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'admin': return 'bg-rose-100 text-rose-700 border-rose-200';
            case 'counsellor': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'vendor': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'student': return 'bg-slate-100 text-slate-700 border-slate-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <SuperAdminLayout title="User Management">
            <div className="p-8">
                
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Platform Users</h2>
                        <p className="text-slate-500 text-sm">Manage access, roles, and status of all platform accounts.</p>
                    </div>
                    <button 
                        onClick={() => setShowCreateModal(true)}
                        className="bg-[#2b6cee] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px]">person_add</span>
                        Create User Route
                    </button>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="py-3 px-5 text-xs font-bold text-slate-500 uppercase tracking-wider">User details</th>
                                    <th className="py-3 px-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Role Access</th>
                                    <th className="py-3 px-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Created</th>
                                    <th className="py-3 px-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="py-3 px-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-slate-500">Loading user database...</td>
                                    </tr>
                                ) : users.map(user => (
                                    <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                                        <td className="py-3 px-5">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-900 text-sm">{user.fullName}</span>
                                                <span className="text-xs text-slate-500">{user.email}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-5">
                                            <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getRoleStyles(user.role)}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-3 px-5 text-xs text-slate-500">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="py-3 px-5">
                                            {user.isActive ? (
                                                <span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-xs font-bold border border-emerald-100">
                                                    <span className="size-1.5 rounded-full bg-emerald-500"></span> Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-rose-600 bg-rose-50 px-2 py-1 rounded text-xs font-bold border border-rose-100">
                                                    <span className="size-1.5 rounded-full bg-rose-500"></span> Suspended
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3 px-5 flex items-center justify-end gap-2">
                                            <button 
                                                onClick={() => toggleUserStatus(user.id, user.isActive)}
                                                className={`text-[11px] font-bold px-3 py-1.5 rounded border transition-colors ${
                                                    user.isActive 
                                                    ? 'text-rose-600 border-rose-200 hover:bg-rose-50'
                                                    : 'text-emerald-600 border-emerald-200 hover:bg-emerald-50'
                                                }`}
                                            >
                                                {user.isActive ? 'Suspend' : 'Activate'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            {/* Create User Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden flex flex-col">
                        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#2b6cee]">person_add</span>
                                Create System User
                            </h3>
                            <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        
                        <form onSubmit={handleCreateUser} className="p-6 flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-700">Full Name</label>
                                <input 
                                    type="text" required
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-[#2b6cee] focus:ring-1 focus:ring-[#2b6cee] outline-none"
                                    value={formData.fullName}
                                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-700">Email Address</label>
                                <input 
                                    type="email" required
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-[#2b6cee] focus:ring-1 focus:ring-[#2b6cee] outline-none"
                                    value={formData.email}
                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-700">Role Designation</label>
                                <select 
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-[#2b6cee] focus:ring-1 focus:ring-[#2b6cee] outline-none bg-white font-medium"
                                    value={formData.role}
                                    onChange={e => setFormData({...formData, role: e.target.value})}
                                >
                                    <option value="counsellor">Counsellor</option>
                                    <option value="vendor">University (Vendor)</option>
                                    <option value="admin">System Admin</option>
                                    <option value="super_admin">Super Admin</option>
                                    {/* Exclude 'student' as they use public signup */}
                                </select>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-700">Initial Password</label>
                                <input 
                                    type="text" required
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-[#2b6cee] focus:ring-1 focus:ring-[#2b6cee] outline-none font-mono"
                                    value={formData.password}
                                    onChange={e => setFormData({...formData, password: e.target.value})}
                                    placeholder="e.g. TempSecure!123"
                                />
                                <p className="text-[10px] text-amber-600 font-medium">Bypasses OTP verification for this user.</p>
                            </div>

                            <div className="flex justify-end gap-3 mt-4">
                                <button type="button" onClick={() => setShowCreateModal(false)} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-[#2b6cee] hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors">Provision User</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </SuperAdminLayout>
    );
};

export default SuperAdminUserManagement;

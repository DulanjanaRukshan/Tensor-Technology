import React, { useState } from 'react';
import axios from 'axios';
import { PlusCircle, Save, CheckCircle, AlertCircle, Image as ImageIcon, Smartphone, Laptop, Headphones, Watch, Layers } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
    const { user } = useAuth();

    // Initial State
    const initialState = {
        title: '',
        brand: '',
        price: '',
        originalPrice: '',
        category: 'smartphones',
        image: '',
        description: '',
        specs: {
            storage: '',
            ram: '',
            camera: '',
            battery: ''
        }
    };

    const [formData, setFormData] = useState(initialState);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);

    // Handle Input Changes (including nested specs)
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));

            // Live preview for URL inputs
            if (name === 'image' && !imageFile) {
                setPreview(value);
            }
        }
    };

    // Handle File Selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file)); // Local preview
        }
    };

    // Submit Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // Note: Authorization header is handled globally by AuthContext in previous steps
                    // If not using that feature, uncomment below:
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const data = new FormData();
            data.append('title', formData.title);
            data.append('brand', formData.brand);
            data.append('price', formData.price);
            data.append('originalPrice', formData.originalPrice);
            data.append('category', formData.category);
            data.append('description', formData.description);

            // Append specs individually
            data.append('specs.storage', formData.specs.storage);
            data.append('specs.ram', formData.specs.ram);
            data.append('specs.camera', formData.specs.camera);
            data.append('specs.battery', formData.specs.battery);

            // Handle Image Logic
            if (imageFile) {
                data.append('image', imageFile);
            } else if (formData.image) {
                data.append('image', formData.image);
            }

            await axios.post(`${import.meta.env.VITE_API_URL}/api/products`, data, config);

            setStatus({ type: 'success', message: 'Product created successfully!' });

            // Reset Form
            setFormData(initialState);
            setImageFile(null);
            setPreview(null);

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (err) {
            console.error(err);
            setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to create product' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="bg-white rounded-t-xl shadow-sm border border-gray-200 p-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <PlusCircle className="text-blue-600" size={32} />
                            Add New Product
                        </h1>
                        <p className="text-gray-500 mt-2">Create a new listing for your store inventory.</p>
                    </div>
                </div>

                {/* Status Message */}
                {status.message && (
                    <div className={`p-4 flex items-center border-l-4 ${status.type === 'success' ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700'}`}>
                        {status.type === 'success' ? <CheckCircle className="mr-3" /> : <AlertCircle className="mr-3" />}
                        <span className="font-medium">{status.message}</span>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-b-xl shadow-sm border border-t-0 border-gray-200 p-8 space-y-8">

                    {/* Section 1: Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Product Title</label>
                                <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="e.g. Samsung Galaxy S24 Ultra" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Brand</label>
                                    <input type="text" name="brand" required value={formData.brand} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 transition" placeholder="e.g. Samsung" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                                    <div className="relative">
                                        <select name="category" value={formData.category} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 pl-10 appearance-none focus:ring-2 focus:ring-blue-500 transition">
                                            <option value="smartphones">Smartphones</option>
                                            <option value="tablets">Tablets</option>
                                            <option value="audio">Audio</option>
                                            <option value="wearables">Wearables</option>
                                            <option value="accessories">Accessories</option>
                                        </select>
                                        <Layers className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                            <textarea name="description" required value={formData.description} onChange={handleChange} rows="8" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 transition" placeholder=" detailed description of the product..." />
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Section 2: Pricing & Media */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Pricing */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-gray-900">Pricing Strategy</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Sale Price ($)</label>
                                    <input type="number" name="price" required value={formData.price} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="999.99" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Original Price ($)</label>
                                    <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="1200.00" />
                                </div>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-900">Product Image</h3>

                            <div className="flex gap-4">
                                {/* Preview Box */}
                                <div className="w-24 h-24 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <ImageIcon className="text-gray-400" />
                                    )}
                                </div>

                                {/* Inputs */}
                                <div className="flex-grow space-y-3">
                                    <input
                                        type="text"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2.5 text-sm"
                                        placeholder="Paste Image URL"
                                        disabled={!!imageFile}
                                    />
                                    <div className="text-center text-xs text-gray-400 font-bold uppercase tracking-wide">OR</div>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Section 3: Tech Specs */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Smartphone size={20} className="text-gray-500" /> Technical Specifications
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Storage</label>
                                <input type="text" name="specs.storage" value={formData.specs.storage} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2.5" placeholder="e.g. 256GB" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">RAM</label>
                                <input type="text" name="specs.ram" value={formData.specs.ram} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2.5" placeholder="e.g. 12GB" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Camera</label>
                                <input type="text" name="specs.camera" value={formData.specs.camera} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2.5" placeholder="e.g. 200MP Main" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Battery</label>
                                <input type="text" name="specs.battery" value={formData.specs.battery} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2.5" placeholder="e.g. 5000mAh" />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="animate-pulse">Saving Product...</span>
                            ) : (
                                <>
                                    <Save className="mr-2" size={24} /> Publish Product
                                </>
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Admin;
import React from 'react';
import { Smartphone, Calendar, Cpu, HardDrive, Camera, Battery, Wifi, Signal } from 'lucide-react';

const ProductSpecs = ({ product }) => {
    
    // Icons mapping for visual appeal
    const specGroups = [
        {
            category: "Network",
            icon: Signal,
            items: [
                { label: "Technology", value: "GSM / HSPA / LTE / 5G" },
                { label: "Speed", value: "HSPA, LTE-A (up to 7CA), 5G" }
            ]
        },
        {
            category: "Launch",
            icon: Calendar,
            items: [
                { label: "Announced", value: "2024" },
                { label: "Status", value: "Available. Released 2024" }
            ]
        },
        {
            category: "Platform",
            icon: Cpu,
            items: [
                { label: "OS", value: "Android 14, One UI 6.1" },
                { label: "Chipset", value: "Snapdragon 8 Gen 3 (4 nm)" },
                { label: "CPU", value: "Octa-core (1x3.39GHz & 3x3.1GHz & 2x2.9GHz & 2x2.2GHz)" },
                { label: "GPU", value: "Adreno 750" }
            ]
        },
        {
            category: "Memory",
            icon: HardDrive,
            items: [
                { label: "Card slot", value: "No" },
                { label: "Internal", value: `${product.specs?.storage || '256GB'} ${product.specs?.ram || '12GB RAM'}` }
            ]
        },
        {
            category: "Camera",
            icon: Camera,
            items: [
                { label: "Main System", value: product.specs?.camera || "200 MP (wide) + 50 MP (periscope) + 12 MP (ultrawide)" },
                { label: "Features", value: "LED flash, auto-HDR, panorama" },
                { label: "Video", value: "8K@24/30fps, 4K@30/60/120fps, 1080p@30/60/240fps" }
            ]
        },
        {
            category: "Battery",
            icon: Battery,
            items: [
                { label: "Type", value: product.specs?.battery || "Li-Ion 5000 mAh, non-removable" },
                { label: "Charging", value: "45W wired, PD3.0 (65% in 30 min)" }
            ]
        },
        {
            category: "Connectivity",
            icon: Wifi,
            items: [
                { label: "WLAN", value: "Wi-Fi 802.11 a/b/g/n/ac/6e/7, tri-band" },
                { label: "Bluetooth", value: "5.3, A2DP, LE" },
                { label: "NFC", value: "Yes" },
                { label: "USB", value: "USB Type-C 3.2, OTG" }
            ]
        }
    ];

    return (
        <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Smartphone className="text-blue-600" /> Technical Specifications
            </h3>

            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                {specGroups.map((group, groupIndex) => (
                    <div key={groupIndex} className="flex flex-col md:flex-row border-b border-gray-100 last:border-0">
                        
                        {/* Category Header (Left Column) */}
                        <div className="w-full md:w-1/4 p-5 bg-gray-50 md:bg-white md:border-r border-gray-100 flex items-center gap-3">
                            <group.icon size={20} className="text-blue-600" />
                            <span className="font-bold text-blue-900 text-sm uppercase tracking-wider">
                                {group.category}
                            </span>
                        </div>

                        {/* Specs List (Right Column) */}
                        <div className="w-full md:w-3/4 p-5">
                            <table className="w-full">
                                <tbody>
                                    {group.items.map((item, itemIndex) => (
                                        <tr key={itemIndex} className="border-b border-gray-50 last:border-0">
                                            <td className="py-2.5 w-1/3 text-gray-500 font-medium text-sm pr-4 align-top">
                                                {item.label}
                                            </td>
                                            <td className="py-2.5 text-gray-900 text-sm font-semibold align-top leading-relaxed">
                                                {item.value}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductSpecs;
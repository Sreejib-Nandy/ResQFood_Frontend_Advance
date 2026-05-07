import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import api from "../api/axios";
import Spinner from "../components/Spinner";
import ImpactCard from "../components/ImpactCard";
import { Utensils, PackageCheck, Trash2, Leaf } from "lucide-react";

const ImpactPage = () => {
    const [monthlyData, setMonthlyData] = useState([]);
    const [impact, setImpact] = useState(null);

    const today = new Date();
    let currentMonth = today.getMonth() + 1;
    let currentYear = today.getFullYear();
    let yearsArray = [currentYear - 1, currentYear];
    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);

    const fetchData = async () => {
        try {
            const [m, i] = await Promise.all([
                api.get(`/stats/monthly?month=${month}&year=${year}`),
                api.get(`/stats/impact`),
            ]);

            setMonthlyData(m.data.data);
            setImpact(i.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const init = () => {
            fetchData();
        }
        init();
    }, [month, year]);

    const impactCards = [
        {
            title: "Meals Posted",
            value: impact?.mealsPosted,
            icon: Utensils,
        },
        {
            title: "Meals Collected",
            value: impact?.mealsCollected,
            icon: PackageCheck,
        },
        {
            title: "Waste Saved",
            value: `${impact?.wasteSaved || 0} kg`,
            icon: Trash2,
        },
        {
            title: "CO₂ Saved",
            value: `${impact?.co2Saved || 0} kg`,
            icon: Leaf,
        },
    ];

    if (!impact) return <Spinner />;

    return (
        <div className="p-4 md:p-6 space-y-6 md:ml-55 md:mt-10 max-md:mt-16">

            {/* HEADER */}
                <h1 className="text-2xl font-semibold">
                    Impact Dashboard
                </h1>

            {/* IMPACT CARDS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
                {impactCards.map((card, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center rounded-xl bg-linear-to-br from-[#ccff33]/20 to-[#ccff33]/5 border border-[#ccff33]/30 p-4 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                    >
                        {/* LEFT CONTENT */}
                        <div className="flex flex-col">
                            <p className="text-sm text-gray-600">{card.title}</p>

                            <p className="text-xl md:text-2xl font-semibold mt-1">
                                {card.value ?? 0}
                            </p>
                        </div>

                        {/* ICON */}
                        <div className="bg-[#ccff33]/30 p-3 rounded-lg">
                            <card.icon className="w-6 h-6 text-[#4b7505]" />
                        </div>
                    </div>
                ))}
            </div>

            {/* LINE CHART */}
            {monthlyData.length === 0 ? (
                <p className="text-center text-gray-500">
                    No data for this month
                </p>
            ) : <div className="bg-white rounded-xl shadow p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <h2 className="text-lg max-md:text-md font-semibold">
                        Daily Activity
                    </h2>
                    {/* Month Selector */}
                    <div className="flex gap-3">
                        <select
                            value={month}
                            onChange={(e) => setMonth(Number(e.target.value))}
                            className="border px-1.5 py-2 rounded"
                        >
                            {[...Array(12)].map((_, i) => {
                                const m = i + 1;

                                return (
                                    <option
                                        key={m}
                                        value={m}
                                        disabled={
                                            year === currentYear && m > currentMonth
                                        }
                                    >
                                        {new Date(0, i).toLocaleString("default", {
                                            month: "long",
                                        })}
                                    </option>
                                );
                            })}
                        </select>

                        <select
                            value={year}
                            onChange={(e) => setYear(Number(e.target.value))}
                            className="border px-1.5 py-2 rounded"
                        >
                            {yearsArray.map((y) => (
                                <option key={y}>{y}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData} margin={{ top: 30, right: 20, left: 10, bottom: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="day" label={{
                            value: "Day of Month",
                            position: "insideBottom",
                            offset: -22
                        }} />
                        <YAxis label={{
                            value: "Number of Posts",
                            angle: -90,
                            position: "insideLeft",
                            dy: 24
                        }} />

                        <Tooltip />
                        <Legend verticalAlign="top" align="center" wrapperStyle={{ top: 0 }} />

                        <Line
                            type="monotone"
                            dataKey="createdPosts"
                            stroke="#8884d8"
                            name="Created Posts"
                        />

                        <Line
                            type="monotone"
                            dataKey="collectedPosts"
                            stroke="#82ca9d"
                            name="Collected Posts"
                        />

                        <Line
                            type="monotone"
                            dataKey="collectedQuantity"
                            stroke="#ff7300"
                            name="Food Quantity Collected"
                        />
                    </LineChart>
                </ResponsiveContainer>

            </div>}
        </div>
    );
};

export default ImpactPage;
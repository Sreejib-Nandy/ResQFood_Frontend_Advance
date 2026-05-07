import { useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis,
    CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, PieChart, Pie, Cell,
    AreaChart, Area,
} from "recharts";
import api from "../api/axios";
import Spinner from "../components/Spinner";
import CSRReport from "../components/CSRReport";
import { useAuth } from "../context/AuthContext";
import html2pdf from "html2pdf.js";

const COLORS = ["#82ca9d", "#8884d8", "#ff7300", "#ff4d4f"];

const AnalyticsPage = () => {
    const { user } = useAuth();
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);

    const [monthlyData, setMonthlyData] = useState([]);
    const [pieData, setPieData] = useState([]);
    const [efficiencyData, setEfficiencyData] = useState([]);
    const [loading, setLoading] = useState(true);

    const yearsArray = [currentYear - 1, currentYear];

    const fetchData = async () => {
        try {
            setLoading(true);

            const [m, p, e] = await Promise.all([
                api.get(`/stats/monthly?month=${month}&year=${year}`),
                api.get(`/stats/status?month=${month}&year=${year}`),
                api.get(`/stats/efficiency?month=${month}&year=${year}`)
            ]);

            setMonthlyData(m.data.data);
            setPieData(p.data.data);
            setEfficiencyData(e.data.data);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const init = () => {
            fetchData();
        }
        init();
    }, [month, year]);

    if (loading) return <Spinner />;

    // CSR DOWNLOAD (CURRENT MONTH ONLY)
    const downloadCSR = () => {
        const element = document.getElementById("csr-download");

        const opt = {
            margin: 10,
            filename: `CSR_${month}_${year}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: "mm", format: "a4" },
        };

        html2pdf().set(opt).from(element).save();
    };

    const safePieData =
        pieData && pieData.length > 0
            ? pieData
            : [{ name: "No Data", value: 1 }];

    return (
        <>
            <div className="fixed top-20 left-0 md:left-60 right-0 bottom-0 overflow-y-auto flex justify-center">
                <div className="w-full max-w-7xl p-4 md:p-6 space-y-6">

                    {/* HEADER */}
                    <div className="flex justify-between items-center flex-wrap gap-4">

                        <h1 className="text-2xl font-semibold">
                            Analytics Dashboard
                        </h1>

                        <div className="flex gap-2">

                            {/* MONTH */}
                            <select
                                value={month}
                                onChange={(e) => setMonth(Number(e.target.value))}
                                className="border px-3 py-2 rounded"
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

                            {/* YEAR */}
                            <select
                                value={year}
                                onChange={(e) => setYear(Number(e.target.value))}
                                className="border px-3 py-2 rounded"
                            >
                                {yearsArray.map((y) => (
                                    <option key={y}>{y}</option>
                                ))}
                            </select>

                            {/* CSR BUTTON */}
                            <button
                                onClick={downloadCSR}
                                className="bg-[#ccff33] px-4 py-2 rounded font-medium cursor-pointer hover:bg-[#ccff33]/75"
                            >
                                Download CSR
                            </button>

                        </div>
                    </div>

                    {/* CSR CONTENT */}
                    <div id="csr-visible" className="space-y-6 bg-white text-black">


                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            <div className="bg-white rounded-xl shadow p-4">
                                <h2 className="text-lg font-semibold mb-4">
                                    Efficiency Trend (%)
                                </h2>

                                <ResponsiveContainer width="100%" height={300}>
                                    <AreaChart
                                        data={efficiencyData}
                                        margin={{ top: 60, right: 20, left: 50, bottom: 50 }}
                                    >
                                        <defs>
                                            <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#00C49F" stopOpacity={0.9} />
                                                <stop offset="100%" stopColor="#00C49F" stopOpacity={0.2} />
                                            </linearGradient>
                                        </defs>

                                        <CartesianGrid strokeDasharray="3 3" />

                                        <XAxis
                                            dataKey="day"
                                            label={{
                                                value: "Day of Month",
                                                position: "bottom",
                                                offset: 15
                                            }}
                                        />

                                        <YAxis
                                            domain={[0, 100]}
                                            label={{
                                                value: "Efficiency (%)",
                                                angle: -90,
                                                position: "insideLeft",
                                                dx: -5
                                            }}
                                        />

                                        <Tooltip />
                                        <Legend verticalAlign="top" height={40} />

                                        <Area
                                            type="monotone"
                                            dataKey="efficiency"
                                            stroke="#00C49F"
                                            fill="url(#efficiencyGradient)"
                                            strokeWidth={3}
                                            name="Efficiency %"
                                            dot={{ r: 4 }}
                                            activeDot={{ r: 6 }}
                                            fillOpacity={1}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            {/* PIE CHART */}
                            <div className="bg-white rounded-xl shadow p-4">
                                <h2 className="text-lg font-semibold mb-4">
                                    Food Status Distribution
                                </h2>

                                <ResponsiveContainer width="100%" height={400}>
                                    <PieChart>
                                        <Pie
                                            data={safePieData}
                                            dataKey="value"
                                            nameKey="name"
                                            outerRadius={140}
                                            cx="50%"
                                            cy="50%"
                                            label={pieData.length > 0}
                                        >
                                            {safePieData.map((entry, index) => (
                                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>

                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>


                        {/* BAR CHART */}
                        <div className="bg-white rounded-xl shadow p-4">
                            <h2 className="text-lg font-semibold mb-4">
                                Daily Comparison
                            </h2>

                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    data={monthlyData}
                                    margin={{ top: 50, right: 20, left: 40, bottom: 40 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />

                                    <XAxis
                                        dataKey="day"
                                        label={{
                                            value: "Day of Month",
                                            position: "bottom",
                                            offset: 10
                                        }}
                                    />

                                    <YAxis
                                        label={{
                                            value: "Number of Posts",
                                            angle: -90,
                                            position: "insideLeft",
                                            dx: -20
                                        }}
                                    />

                                    <Tooltip />
                                    <Legend verticalAlign="top" height={40} />

                                    <Bar dataKey="createdPosts" fill="#8884d8" />
                                    <Bar dataKey="collectedPosts" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                    </div>
                </div>
            </div>
            {!loading && monthlyData && efficiencyData && pieData && user && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "800px",
                        background: "white",
                        opacity: 0,
                        zIndex: -1
                    }}
                >
                    <div id="csr-download">
                        <CSRReport
                            restaurant={user}
                            monthlyData={monthlyData}
                            efficiencyData={efficiencyData}
                            pieData={pieData}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default AnalyticsPage;
import React from "react";
import {
    ResponsiveContainer,
    AreaChart, Area,
    LineChart, Line,
    BarChart, Bar,
    PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from "recharts";

const COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#F44336"];

const CSRReport = ({
    restaurant,
    monthlyData,
    efficiencyData,
    pieData
}) => {

    const safePieData =
        pieData && pieData.length > 0
            ? pieData
            : [{ name: "No Data", value: 1 }];

    console.log(restaurant);
    console.log(monthlyData);
    console.log(efficiencyData);
    console.log(pieData);

    if (!monthlyData || !efficiencyData || !pieData) {
        return null;
    }

    return (
        <div className="bg-white text-black p-6 w-[800px]">

            {/* HEADER */}
            <div className="flex items-center gap-4 mb-6">
                <img
                    src={restaurant?.logo || "/logo.png"}
                    alt="logo"
                    className="w-16 h-16 object-contain"
                />
                <div>
                    <h1 className="text-2xl font-bold">
                        {restaurant?.name || "Restaurant Name"}
                    </h1>
                    <p>{restaurant?.email}</p>
                    <p>{restaurant?.address}</p>
                    <p>{restaurant?.contact}</p>
                </div>
            </div>

            <h2 className="text-xl font-semibold mb-4">
                CSR Impact Report
            </h2>

            {/* CSR DESCRIPTION */}
            <p className="mb-6 text-sm leading-relaxed">
                This report highlights the restaurant’s contribution towards reducing food waste,
                supporting communities, and minimizing environmental impact. By redistributing surplus
                food, the restaurant actively participates in sustainable practices and corporate social
                responsibility initiatives.
            </p>

            {/* AREA CHART */}
            <div className="mb-6">
                <h3 className="font-semibold mb-2">Efficiency Trend (%)</h3>
                <div style={{ width: "100%", height: 250 }}>
                    <ResponsiveContainer>
                        <AreaChart data={efficiencyData || []}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" label={{ value: "Day", position: "bottom" }} />
                            <YAxis label={{ value: "%", angle: -90, position: "insideLeft" }} />
                            <Tooltip />
                            <Legend />
                            <Area dataKey="efficiency" stroke="#4CAF50" fill="#A5D6A7" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* LINE CHART */}
            <div className="mb-6">
                <h3 className="font-semibold mb-2">Posts Trend</h3>
                <div style={{ width: "100%", height: 250 }}>
                    <ResponsiveContainer>
                        <LineChart data={monthlyData || []}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line dataKey="createdPosts" stroke="#2196F3" />
                            <Line dataKey="collectedPosts" stroke="#4CAF50" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* BAR CHART */}
            <div className="mb-6">
                <h3 className="font-semibold mb-2">Daily Comparison</h3>
                <div style={{ width: "100%", height: 250 }}>
                    <ResponsiveContainer>
                        <BarChart data={monthlyData || []}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="createdPosts" fill="#2196F3" />
                            <Bar dataKey="collectedPosts" fill="#4CAF50" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* PIE CHART */}
            <div className="mb-6">
                <h3 className="font-semibold mb-2">Food Status Distribution</h3>
                <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie data={safePieData} dataKey="value" outerRadius={100}>
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

            {/* BRANDING */}
            <div className="mt-8 border-t pt-4">
                <h3 className="font-semibold">Powered By</h3>
                <p className="font-bold text-lg">ResQFood</p>
                <p>www.resqfood.com</p>
                <p>123 Future Street, Innovation City</p>
                <p>Contact: +91 9876543210</p>
            </div>

            {/* THANK YOU */}
            <div className="mt-6 text-sm">
                <p>
                    Thank you for your commitment to sustainability and social impact.
                    Your efforts help build a better and more responsible future.
                </p>
            </div>

        </div>
    );
};

export default CSRReport;
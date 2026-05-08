import React from "react";
import {
    AreaChart, Area,
    LineChart, Line,
    BarChart, Bar,
    PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Legend
} from "recharts";

const COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#F44336"];

const CSRReport = ({
    restaurant,
    monthlyData = [],
    efficiencyData = [],
    pieData = []
}) => {

    const safePieData =
        pieData.length > 0
            ? pieData
            : [{ name: "No Data", value: 1 }];

    const totalPosted = monthlyData.reduce((acc, d) => acc + (d.createdPosts || 0), 0);
    const totalCollected = monthlyData.reduce((acc, d) => acc + (d.collectedPosts || 0), 0);
    const co2Saved = (totalCollected * 2.4).toFixed(1);
    const wasteSaved = (totalCollected * 0.74).toFixed(1);

    return (
        <div style={{
            position: "relative",
            width: "100%",
            height: "100%",
            padding: "16px",
            fontFamily: "Arial"
        }}>
            <img
                src="https://www.shutterstock.com/image-vector/illustration-icon-food-sharing-donation-600nw-2229819277.jpg"
                alt="watermark"
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    opacity: 0.25,
                    width: "400px",
                    pointerEvents: "none",
                    zIndex: 0
                }}
            />

            {/* ================= HEADER ================= */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "2px solid #ddd",
                paddingBottom: "10px"
            }}>
                <div style={{ display: "flex", gap: "12px" }}>
                    <img
                        src="https://www.shutterstock.com/image-vector/illustration-icon-food-sharing-donation-600nw-2229819277.jpg"
                        alt="logo"
                        style={{ width: "80px" }}
                    />
                    <div>
                        <h2 style={{ margin: 0 }}>{restaurant?.name}</h2>
                        <p style={{ margin: 0, fontSize: "12px" }}>{restaurant?.email}</p>
                        <p style={{ margin: 0, fontSize: "12px" }}>{restaurant?.address}</p>
                        <p style={{ margin: 0, fontSize: "12px" }}>{restaurant?.contactInfo}</p>
                    </div>
                </div>

                <div style={{ textAlign: "right" }}>
                    <h3 style={{ margin: 0 }}>CSR Report</h3>
                    <p style={{ fontSize: "12px" }}>{new Date().toLocaleDateString()}</p>
                </div>
            </div>

            {/* ================= IMPACT CARDS ================= */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "15px",
                gap: "10px"
            }}>
                {[
                    { label: "FoodPost Created", value: totalPosted },
                    { label: "FoodPost Collected", value: totalCollected },
                    { label: "Waste Reduced", value: wasteSaved + " kg" },
                    { label: "CO₂ Saved", value: co2Saved + " kg" },
                ].map((item, i) => (
                    <div key={i} style={{
                        flex: 1,
                        background: "#f5f5f5",
                        padding: "12px",
                        borderRadius: "8px",
                        textAlign: "center"
                    }}>
                        <p style={{ margin: 0, fontSize: "16px" }}>{item.label}</p>
                        <h2 style={{ margin: 0 }}>{item.value}</h2>
                    </div>
                ))}
            </div>

            {/* ================= CHARTS (STACKED) ================= */}
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                marginTop: "15px"
            }}>

                {/* AREA */}
                <div>
                    <h3 style={{ margin: "4px 0" }}>Efficiency Trend</h3>
                    <AreaChart width={700} height={140} data={efficiencyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="day"
                            label={{
                                value: "Day of Month",
                                position: "insideBottom",
                                offset: -5,
                                style: { fontSize: 10 }
                            }}
                        />

                        <YAxis
                            label={{
                                value: "Efficiency (%)",
                                angle: -90,
                                position: "insideBottom",
                                offset: 24,
                                style: { fontSize: 10 }
                            }}
                        />
                        <Area dataKey="efficiency" stroke="#4CAF50" fill="#A5D6A7" />
                    </AreaChart>
                </div>

                {/* LINE */}
                <div>
                    <h3 style={{ margin: "4px 0" }}>Posts Trend</h3>
                    <LineChart width={700} height={140} data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            dataKey="day"
                            label={{
                                value: "Day of Month",
                                position: "insideBottom",
                                offset: -5,
                                style: { fontSize: 10 }
                            }}
                        />

                        <YAxis
                            label={{
                                value: "Number of Posts",
                                angle: -90,
                                position: "insideBottom",
                                offset: 24,
                                style: { fontSize: 10 }
                            }}
                        />

                        <Line dataKey="createdPosts" stroke="#2196F3" />
                        <Line dataKey="collectedPosts" stroke="#4CAF50" />
                    </LineChart>
                </div>

                {/* BAR */}
                <div>
                    <h3 style={{ margin: "4px 0" }}>Daily Comparison</h3>
                    <BarChart width={700} height={140} data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            dataKey="day"
                            label={{
                                value: "Day of Month",
                                position: "insideBottom",
                                offset: -5,
                                style: { fontSize: 10 }
                            }}
                        />

                        <YAxis
                            label={{
                                value: "Posts Count",
                                angle: -90,
                                position: "insideBottom",
                                offset: 24,
                                style: { fontSize: 10 }
                            }}
                        />

                        <Bar dataKey="createdPosts" fill="#2196F3" />
                        <Bar dataKey="collectedPosts" fill="#4CAF50" />
                    </BarChart>
                </div>

                {/* PIE FULL WIDTH */}
                <div
                    id="pie-chart-container"
                    style={{
                        width: "340px",
                        margin: "0 auto",
                        textAlign: "center"
                    }}
                >
                    <h3>Food Status Distribution</h3>

                    <PieChart width={340} height={220}>
                        <Pie
                            data={safePieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={90}
                            label
                        >
                            {safePieData.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>

                        <Legend verticalAlign="bottom" />
                    </PieChart>
                </div>

            </div>

            {/* ================= THANK YOU ================= */}
            <div style={{ marginTop: "10px" }}>
                <p style={{ fontSize: "12px" }}>
                    We sincerely thank you for your continued commitment towards sustainability and social responsibility. Your efforts in reducing food waste and supporting communities are making a meaningful impact in building a better and more responsible future.
                </p>
            </div>

            {/* ================= FOOTER ================= */}
            <div style={{
                borderTop: "1px solid #ddd",
                paddingTop: "8px",
                paddingBottom: "8px",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "11px"
            }}>
                <span>Powered by ResQFood</span>
                <span>https://resqfoodsreejib.vercel.app | +91 98765 43210</span>
            </div>

        </div>
    );
};

export default CSRReport;
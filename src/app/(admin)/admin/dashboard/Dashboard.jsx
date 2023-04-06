"use client";

import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { idrFormat, formatK } from "@/utils/idrFormat";
import { FaUserCircle } from "react-icons/fa";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function Dashboard({
  totalOrder,
  totalTransaction,
  totalRoom,
  totalOccupiedRoom,
  totalRevenue,
}) {
  const percentage = 70;
  const labels = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  return (
    <main className="dark:text-dark2">
      <div className="flex gap-x-5">
        <section className="w-[65%]">
          <div className="flex gap-x-5">
            <div className="w-full rounded-3xl bg-[#FFE9F8] py-5 px-7 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">Orderan</h2>
                <p className="text-info text-sm">Total order bulan ini</p>
                <h1 className="text-3xl font-semibold mt-3">{totalOrder}</h1>
              </div>
              <div style={{ width: "5rem", height: "5rem" }}>
                <CircularProgressbar
                  value={70}
                  text={totalOrder}
                  strokeWidth={12}
                  styles={buildStyles({
                    strokeLinecap: "butt",
                    pathColor: "#2E2E2E",
                    trailColor: "#FFE9F8",
                    textColor: "#2E2E2E",
                  })}
                />
              </div>
            </div>
            <div className="w-full rounded-3xl bg-[#E9FFF6] py-5 px-7 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">Transaksi</h2>
                <p className="text-info text-sm">
                  Total transaksi di bulan ini
                </p>
                <h1 className="text-3xl font-semibold mt-3">
                  {totalTransaction}
                </h1>
              </div>
              <div style={{ width: "5rem", height: "5rem" }}>
                <CircularProgressbar
                  value={70}
                  text={totalTransaction}
                  strokeWidth={12}
                  styles={buildStyles({
                    strokeLinecap: "butt",
                    pathColor: "#2E2E2E",
                    trailColor: "#FFE9F8",
                    textColor: "#2E2E2E",
                  })}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-x-5 mt-5">
            <div className="w-full rounded-3xl bg-[#E2EFFF] py-5 px-7 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">Kamar</h2>
                <p className="text-info text-sm">
                  Total kamar yang disewa bulan ini
                </p>
                <h1 className="text-3xl font-semibold mt-3">
                  {totalOccupiedRoom}/{totalRoom}
                </h1>
              </div>
              <div style={{ width: "5rem", height: "5rem" }}>
                <CircularProgressbar
                  value={totalOccupiedRoom / totalRoom}
                  text={`${(totalOccupiedRoom / totalRoom) * 100}%`}
                  strokeWidth={12}
                  styles={buildStyles({
                    strokeLinecap: "butt",
                    pathColor: "#2E2E2E",
                    trailColor: "#FFE9F8",
                    textColor: "#2E2E2E",
                  })}
                />
              </div>
            </div>
            <div className="w-full rounded-3xl bg-[#F6E4FF] py-5 px-7 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">Revenue</h2>
                <p className="text-info text-sm">Total pendapatan bulan ini</p>
                <h1 className="text-3xl font-semibold mt-3">
                  {idrFormat(totalRevenue)}
                </h1>
              </div>
              <div style={{ width: "5rem", height: "5rem" }}>
                <CircularProgressbar
                  value={percentage}
                  text={formatK(totalRevenue)}
                  strokeWidth={12}
                  styles={buildStyles({
                    strokeLinecap: "butt",
                    pathColor: "#2E2E2E",
                    trailColor: "#FFE9F8",
                    textColor: "#2E2E2E",
                  })}
                />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <Line
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Chart Revenue",
                  },
                },
              }}
              data={{
                labels,
                datasets: [
                  {
                    label: "Revenue",
                    data: labels.map(() => Math.floor(Math.random() * 3600000)),
                    backgroundColor: "#F0D8FF",
                    borderColor: "#b53dff",
                    fill: true,
                  },
                ],
              }}
            />
          </div>
        </section>
        <section className="w-[35%]">
          <div className="w-full h-[20rem] bg-dark2 text-white rounded-lg py-5 px-7">
            <h1 className="text-lg font-semibold">Total Revenue</h1>
            <p>Total seluruh pendapatan</p>
            <div className="flex justify-center">
              <div style={{ width: "10rem", height: "10rem" }} className="mt-5">
                <CircularProgressbar
                  value={100}
                  text={"9000K"}
                  strokeWidth={12}
                  styles={buildStyles({
                    strokeLinecap: "butt",
                    pathColor: "#FFE9F8",
                    trailColor: "#FFE9F8",
                    textColor: "#FFE9F8",
                    textSize: "1rem",
                  })}
                />
              </div>
            </div>
          </div>
          <div className="w-full bg-white dark:bg-dark2 dark:text-white rounded-lg py-5 px-7 mt-5">
            <div>
              <h1 className="text-lg font-semibold mb-3">Penyewa Kos</h1>
              <div className="flex flex-col gap-y-3">
                <div className="flex gap-x-3 items-center">
                  <FaUserCircle size={30} />
                  <div>
                    <h1 className="text-sm font-semibold">Valentino Rossi</h1>
                    <p className="text-info text-xs">
                      valentinorossi@gmail.com
                    </p>
                  </div>
                  <p className="tex-xs font-semibold ml-auto">900K</p>
                </div>
                <div className="flex gap-x-3 items-center">
                  <FaUserCircle size={30} />
                  <div>
                    <h1 className="text-sm font-semibold">Marc Marquez</h1>
                    <p className="text-info text-xs">marcmarquez@gmail.com</p>
                  </div>
                  <p className="tex-xs font-semibold ml-auto">900K</p>
                </div>
                <div className="flex gap-x-3 items-center">
                  <FaUserCircle size={30} />
                  <div>
                    <h1 className="text-sm font-semibold">Maverick Vinales</h1>
                    <p className="text-info text-xs">
                      maverickvinales@gmail.com
                    </p>
                  </div>
                  <p className="tex-xs font-semibold ml-auto">900K</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

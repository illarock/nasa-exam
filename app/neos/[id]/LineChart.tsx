import React, { useEffect } from "react";
import { Chart } from "chart.js";
import { axiType } from "@/types/neoType";
import styles from "./neo.module.scss";

const LineChart = ({ axis, id }: { axis: axiType; id: string }) => {
  useEffect(() => {
    var canvas: any = document.getElementById("myChart");
    var ctx = canvas.getContext("2d");

    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: axis.x_axis,
        datasets: [
          {
            data: axis.y_axis,
            label: id,
            borderColor: "#3e95cd",
            backgroundColor: "#7bb6dd",
            fill: false,
          },
        ],
      },
    });
  }, []);

  return (
    <div className={styles.chart}>
      <canvas id="myChart"></canvas>
    </div>
  );
};

export default LineChart;

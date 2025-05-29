import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import useApplications from "@/hooks/useApplications"; // adjust path as needed
import { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";

const chartConfig: ChartConfig = {
  Accepted: {
    label: "Accepted",
    color: "#22c55e",
  },
  Pending: {
    label: "Pending",
    color: "#facc15",
  },
  Declined: {
    label: "Declined",
    color: "#ef4444",
  },
};


const ApplicationPieChart = () => {
  const { applications, isLoading } = useApplications();

  const chartData = useMemo(() => {
    if (!applications) return [];
    const statusCounts: Record<string, number> = {
      Accepted: 0,
      Pending: 0,
      Declined: 0,
    };
    applications.forEach((app: { status: string }) => {
      // Normalize status to match keys: "Accepted", "Pending", "Declined"
      let normalizedStatus =
        app.status.charAt(0).toUpperCase() + app.status.slice(1).toLowerCase();
      // Handle "Rejected" as "Declined" for compatibility
      if (normalizedStatus === "Rejected") normalizedStatus = "Declined";
      if (statusCounts[normalizedStatus] !== undefined) {
        statusCounts[normalizedStatus]++;
      }
    });
    return Object.entries(statusCounts)
      .map(([status, value]) => ({
        status,
        value,
      }))
      .filter((item) => item.value > 0); // Only show statuses with data
  }, [applications]);

  if (isLoading) {
    return (
      <div className="flex min-h-[250px] items-center justify-center">
        <span className="text-gray-500">Loading...</span>
      </div>
    );
  }

  if (!chartData.length) {
    return (
      <div className="flex min-h-[250px] items-center justify-center">
        <span className="text-gray-500">No applications found.</span>
      </div>
    );
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="mt-6 min-h-[250px] w-full max-w-[840px] rounded-2xl bg-[#f3f2ff]/40 shadow backdrop-blur-2xl duration-200 hover:shadow-md"
    >
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="status"
          cx="50%"
          cy="50%"
          outerRadius={90}
          label
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={chartConfig[entry.status]?.color || "#8884d8"}
            />
          ))}
        </Pie>
        <ChartTooltip
          content={<ChartTooltipContent labelKey="value" nameKey="status" />}
        />
        <ChartLegend content={<ChartLegendContent nameKey="status" />} />
      </PieChart>
    </ChartContainer>
  );
};

export default ApplicationPieChart;

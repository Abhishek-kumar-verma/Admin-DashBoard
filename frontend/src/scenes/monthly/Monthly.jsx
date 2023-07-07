import React, { useMemo} from "react";
import { Box, useTheme } from "@mui/material";
import { useGetSalesQuery } from "state/api";

import { ResponsiveLine } from "@nivo/line";

import Header from "components/Header";

const Monthly = () => {
  
  const { data } = useGetSalesQuery();
  const theme = useTheme();

  const [formattedData] = useMemo(() => {
    if (!data) return [];
    const { monthlyData } = data;
    // console.log( data);

    // formatting data according line chart
    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.main,
      data: [],
    };
    const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: [],
    };

    Object.values(monthlyData).forEach(({ month, totalSales, totalUnits }) => {
        
          
  
          totalSalesLine.data = [
            ...totalSalesLine.data,
            { x: month, y: totalSales },
          ];
          totalUnitsLine.data = [
            ...totalUnitsLine.data,
            { x: month, y: totalUnits },
          ];
        
      });
    const formattedData = [totalSalesLine, totalUnitsLine];
    return [formattedData];
  }, [data]);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="MONTHLY SALES" subtitle="chart of monthly sales" />
      <Box height="65vh">
        
        {data ? (
          <ResponsiveLine
            data={formattedData}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            color={{ datum :"color"}}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
            // curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend:"month",
              legendOffset: -60,
              legendPosition: "middle",
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "total",
              legendOffset: -50,
              legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={
               [
                    {
                      anchor: "top-right",
                      direction: "column",
                      justify: true,
                      translateX: 50,
                      translateY: -40,
                      itemsSpacing: 0,
                      itemWidth: 94,
                      itemHeight: 18,
                      itemDirection: "left-to-right",
                      itemTextColor: theme.palette.secondary[200],
                      itemOpacity: 0.85,
                      symbolSize: 18,
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemTextColor: theme.palette.background.alt,
                            itemOpacity: 1,
                          },
                        },
                      ],
                    },
                  ]
            }
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};

export default Monthly;

import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { scatterChartApi } from "../../../apis/chart";
import PageLoader from "../../../components/shared/Loader/PageLoader";
import Filter from "../../../components/shared/Filter";
import Button from "../../../components/ui/Button";
import { error as errorAlert } from "../../../utils/alert";

const ScatterChart = () => {
  const [filter, setFilter] = useState({
    country: "",
    end_year: "",
  });

  const [countries, setCountries] = useState([]);
  const [endYears, setEndYears] = useState([]);

  const { data, isLoading, refetch, error } = useQuery({
    queryFn: () => scatterChartApi(filter),
    queryKey: ["scatterChart"],
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data?.data.filter) {
      // sort the end years
      let years = [...data.data.filter.end_years];
      years.sort(function (a, b) {
        return a - b;
      });
      setEndYears(years);
      setCountries(data.data.filter.countries);
    }
  }, [data]);

  const information = {
    options: {
      chart: {
        id: "scatter-chart",
        animations: {
          enabled: true,
          easing: "easeInOutQuad",
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
      },
      markers: {
        size: 7,
        hover: {
          size: 9,
        },
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

          return (
            '<ul style="padding: 10px 20px;display: flex; flex-direction:column; gap-y:20px;">' +
            "<li><b>Country</b>: " +
            data.x +
            "</li>" +
            "<li><b>Relevance</b>: " +
            data.y +
            "</li>" +
            "<li><b>Region</b>: " +
            data.region +
            "</li>" +
            "<li><b>Year</b>: " +
            data.year +
            "</li>" +
            "</ul>"
          );
        },
      },
      legend: {
        show: true,
        position: "bottom",
      },
      xaxis: {
        type: "category",
        labels: {
          rotate: -45,
          style: {
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },
    },
    series: [
      {
        name: "Data",
        data: data?.data?.series,
      },
    ],
  };

  return (
    <div className="border-[2px] border-primary p-[30px] m-[20px] rounded-[10px]">
      <div className="flex items-center justify-between mb-[20px]">
        <h3 className="text-[22px] font-semibold">
          Showing relevance of country with region and year
        </h3>

        {/* filters */}
        <div className="flex items-center gap-3">
          {/* end year filter */}
          <Filter
            data={endYears}
            buttonText={"End Year"}
            setSelected={(data) => setFilter({ ...filter, end_year: data })}
            selectedData={filter.end_year}
            itemsClass={"mx-auto"}
          />

          {/* countries  filter */}
          <Filter
            data={countries}
            buttonText={"Countries"}
            setSelected={(data) => setFilter({ ...filter, country: data })}
            className={"max-h-[350px] min-w-[350px] overflow-y-auto"}
            itemsClass={"!px-[10px]"}
            search={true}
            selectedData={filter.country}
          />

          <Button
            onClick={() => {
              if (filter.country || filter.end_year) {
                refetch();
                setFilter({
                  end_year: "",
                  country: "",
                });
              } else {
                errorAlert({
                  message: "To proceed, please choose at least one filter.",
                });
              }
            }}
            fill
            className="font-semibold"
          >
            Filter
          </Button>
        </div>
      </div>

      {isLoading && <PageLoader />}

      {error && (
        <p className="text-center font-semibold text-[16px]">
          There is no data to display. Try again later
        </p>
      )}

      {!isLoading && !error && (
        <ReactApexChart
          options={information.options}
          series={information.series}
          type="line"
          height={500}
        />
      )}
    </div>
  );
};

export default ScatterChart;

import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useQuery } from "react-query";
import { barChartApi } from "../../../apis/chart";
import PageLoader from "../../../components/shared/Loader/PageLoader";
import Button from "../../../components/ui/Button";
import Filter from "../../../components/shared/Filter";
import { error as errorAlert } from "../../../utils/alert";

const BarChart = () => {
  const [filter, setFilter] = useState({
    end_year: "",
    source: "",
    region: "",
    topic: "",
    sector: "",
    country: "",
    pestle: "",
  });

  const [endYears, setEndYears] = useState([]);
  const [sources, setSource] = useState([]);
  const [topics, setTopics] = useState([]);
  const [regions, setRegions] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [countries, setCountries] = useState([]);
  const [pestles, setPestles] = useState([]);

  const { data, isLoading, refetch, error } = useQuery({
    queryFn: () => barChartApi(filter),
    queryKey: ["barChart"],
    staleTime: Infinity,
  });

  // set data into state
  useEffect(() => {
    if (data?.data.filter) {
      // sort the end years
      let years = [...data.data.filter.end_years];
      years.sort(function (a, b) {
        return a - b;
      });
      setEndYears(years);

      setSource(data.data.filter.sources);
      setTopics(data.data.filter.topics);
      setRegions(data.data.filter.regions);
      setSectors(data.data.filter.sectors);
      setCountries(data.data.filter.countries);
      setPestles(data.data.filter.pestles);
    }
  }, [data]);

  // chart object
  const information = {
    series: data?.data?.series,
    options: {
      chart: {
        type: "line",
        zoom: {
          enabled: true,
        },
      },
      plotOptions: {
        line: {
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
        show: true,
        width: 4,
      },
      xaxis: {
        categories: data?.data?.categories,
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  };

  return (
    <div className="border-[2px] border-primary p-[30px] m-[20px] rounded-[10px]">
      <div className="flex items-center justify-between mb-[20px]">
        <h3 className="text-[22px] font-semibold">
          Showing relevance, likelihood and intensity
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

          {/* topic year filter */}
          <Filter
            data={topics}
            buttonText={"Topics"}
            setSelected={(data) => setFilter({ ...filter, topic: data })}
            className={"max-h-[350px] min-w-[350px] overflow-y-auto"}
            itemsClass={"!px-[10px]"}
            search={true}
            selectedData={filter.topic}
          />

          {/* regions year filter */}
          <Filter
            data={regions}
            buttonText={"Region"}
            setSelected={(data) => setFilter({ ...filter, region: data })}
            className={"max-h-[350px] min-w-[350px] overflow-y-auto"}
            itemsClass={"!px-[12px]"}
            search={true}
            selectedData={filter.region}
          />

          {/* sources year filter */}
          <Filter
            data={sources}
            buttonText={"Sources"}
            setSelected={(data) => setFilter({ ...filter, source: data })}
            className={"max-h-[350px] min-w-[350px] overflow-y-auto"}
            itemsClass={"!px-[10px]"}
            search={true}
            selectedData={filter.source}
          />

          {/* countries year filter */}
          <Filter
            data={countries}
            buttonText={"Countries"}
            setSelected={(data) => setFilter({ ...filter, country: data })}
            className={"max-h-[350px] min-w-[350px] overflow-y-auto"}
            itemsClass={"!px-[10px]"}
            search={true}
            selectedData={filter.country}
          />

          {/* Pestles year filter */}
          <Filter
            data={pestles}
            buttonText={"Pestles"}
            setSelected={(data) => setFilter({ ...filter, pestle: data })}
            className={"max-h-[350px] min-w-[350px] overflow-y-auto"}
            itemsClass={"!px-[10px]"}
            search={true}
            selectedData={filter.pestle}
          />

          {/* sectors year filter */}
          <Filter
            data={sectors}
            buttonText={"Sectors"}
            setSelected={(data) => setFilter({ ...filter, sector: data })}
            className={"max-h-[350px] min-w-[350px] overflow-y-auto"}
            itemsClass={"!px-[10px]"}
            search={true}
            selectedData={filter.sector}
          />

          <Button
            onClick={() => {
              if (
                filter.country ||
                filter.end_year ||
                filter.source ||
                filter.region ||
                filter.topic ||
                filter.sector ||
                filter.pestle 
              ) {
                refetch();
                setFilter({
                  end_year: "",
                  source: "",
                  region: "",
                  topic: "",
                  sector: "",
                  country: "",
                  pestle: "",
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
        <Chart
          options={information.options}
          series={information.series}
          type="line"
          height={500}
        />
      )}
    </div>
  );
};

export default BarChart;

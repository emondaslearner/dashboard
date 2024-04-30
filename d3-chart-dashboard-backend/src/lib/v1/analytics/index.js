const _error = Symbol("error");
const _database = Symbol("database");

class Analytics {
  constructor({ error, database }) {
    this[_error] = error;
    this[_database] = database;
  }

  async insertAnalyticsData(data) {
    // if data on given or data not an array then throw error
    if (!data?.length) {
      throw this[_error].badRequest(
        "Data should be an array and it should contain at least one data"
      );
    }

    const savedData = await this[_database].create(data);

    return savedData;
  }

  async getRelevanceIntensityLikelihood(filter) {
    const { end_year, source, region, topic, sector, country, pestle } = filter;
    const query = {};

    if (end_year) query.end_year = end_year;
    if (source) query.source = source;
    if (region) query.region = region;
    if (topic) query.topic = topic;
    if (sector) query.sector = sector;
    if (country) query.country = country;
    if (pestle) query.pestle = pestle;

    // query length
    const filterKeys = Object.keys(query);

    const data = await this[_database].find(query);

    // converting into chart data
    const series = [
      {
        name: "Relevance",
        data: [],
      },
      {
        name: "Likelihood",
        data: [],
      },
      {
        name: "Intensity",
        data: [],
      },
    ];

    const categories = [];

    // for filter
    const end_year_filter_values = [];
    const source_filter_values = [];
    const region_filter_values = [];
    const topic_filter_values = [];
    const sector_filter_values = [];
    const country_filter_values = [];
    const pestle_filter_values = [];

    // mixing the topic
    for (let i = 0; i < data.length; i++) {
      const singleData = data[i];

      // push data filters
      // end years filter values
      if (singleData.end_year) {
        const element = await end_year_filter_values.find(
          (item) => item === singleData.end_year
        );
        if (!element) {
          end_year_filter_values.push(singleData.end_year);
        }
      }

      // source filter values
      if (singleData.source) {
        const element = await source_filter_values.find(
          (item) => item === singleData.source
        );
        if (!element) {
          source_filter_values.push(singleData.source);
        }
      }

      // region filter values
      if (singleData.region) {
        const element = await region_filter_values.find(
          (item) => item === singleData.region
        );
        if (!element) {
          region_filter_values.push(singleData.region);
        }
      }

      // topic filter values
      if (singleData.topic) {
        const element = await topic_filter_values.find(
          (item) => item === singleData.topic
        );
        if (!element) {
          topic_filter_values.push(singleData.topic);
        }
      }

      // sector filter values
      if (singleData.sector) {
        const element = await sector_filter_values.find(
          (item) => item === singleData.sector
        );
        if (!element) {
          sector_filter_values.push(singleData.sector);
        }
      }

      // country filter values
      if (singleData.country) {
        const element = await country_filter_values.find(
          (item) => item === singleData.country
        );
        if (!element) {
          country_filter_values.push(singleData.country);
        }
      }

      // pestle filter values
      if (singleData.pestle) {
        const element = await pestle_filter_values.find(
          (item) => item === singleData.pestle
        );
        if (!element) {
          pestle_filter_values.push(singleData.pestle);
        }
      }

      // if topic is already exist in category the plus the relevance, likelihood and intensity otherwise push those in data
      if (singleData.topic) {
        // checking topic already exist or not in category
        const element = await categories.find(
          (item) => item === singleData.topic
        );

        if (!element) {
          categories.push(singleData.topic);
          singleData.relevance && series[0].data.push(singleData.relevance);
          singleData.likelihood && series[1].data.push(singleData.likelihood);
          singleData.intensity && series[2].data.push(singleData.intensity);
        } else {
          const index = categories.indexOf(element);
          singleData.relevance &&
            (series[0].data[index] =
              series[0].data[index] + singleData.relevance);
          singleData.likelihood &&
            (series[1].data[index] =
              series[1].data[index] + singleData.likelihood);
          singleData.intensity &&
            (series[2].data[index] =
              series[2].data[index] + singleData.intensity);
        }
      }
    }

    return {
      series,
      categories,
      filter: !filterKeys.length
        ? {
            end_years: end_year_filter_values,
            sources: source_filter_values,
            regions: region_filter_values,
            topics: topic_filter_values,
            sectors: sector_filter_values,
            countries: country_filter_values,
            pestles: pestle_filter_values,
          }
        : null,
    };
  }

  async getScatterChartDetails(filter) {
    const { country, end_year } = filter;

    const query = {};

    if (country) query.country = country;
    if (end_year) query.end_year = end_year;

    const filterKey = Object.keys(query);

    const series = [];

    // filter
    const end_year_filter_values = [];
    const country_filter_values = [];

    const data = await this[_database].find(query);

    for (let i = 0; i < data.length; i++) {
      const singleData = data[i];

      if (
        singleData.country &&
        singleData.relevance &&
        singleData.end_year &&
        singleData.region
      ) {
        // country filter values
        if (singleData.country) {
          const element = await country_filter_values.find(
            (item) => item === singleData.country
          );
          if (!element) {
            country_filter_values.push(singleData.country);
          }
        }

        // end_year filter values
        if (singleData.end_year) {
          const element = await end_year_filter_values.find(
            (item) => item === singleData.end_year
          );
          if (!element) {
            end_year_filter_values.push(singleData.end_year);
          }
        }

        const elementIndex = series.findIndex(
          (item) => item.x === singleData.country
        );
        if (elementIndex === -1) {
          // If no matching element is found, push a new object into the series array
          series.push({
            x: singleData.country,
            y: singleData.relevance,
            region: singleData.region,
            year: singleData.end_year,
          });
        } else {
          // If a matching element is found, update its properties
          series[elementIndex].y =
            series[elementIndex].y + singleData.relevance;
        }
      }
    }

    return {
      series,
      filter:
        filterKey.length === 0
          ? {
              end_years: end_year_filter_values,
              countries: country_filter_values,
            }
          : null,
    };
  }
}

module.exports = Analytics;

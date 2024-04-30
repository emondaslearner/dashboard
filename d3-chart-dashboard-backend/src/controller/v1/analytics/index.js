const AnalyticsLib = require("../../../lib/v1/analytics");

const fs = require("fs");
const { error } = require("../../../utils");
const { analytics: analyticsModel } = require("../../../model");

// symbol
const analyticsLib = new AnalyticsLib({ error, database: analyticsModel });

class Analytics {
  constructor() {}

  async insertAnalyticsData(req, res, next) {
    try {
      const file = req.files[0];
      const fileName = file.originalname.split(".");
      if (!file || fileName[fileName.length - 1] !== "json") {
        throw error.badRequest("JSON file is missing");
      }

      // Read the JSON file
      const payloadData = await new Promise((resolve, reject) => {
        fs.readFile(file.path, "utf8", (err, data) => {
          if (err) {
            reject(new Error("Error reading file"));
          } else {
            try {
              const jsonData = JSON.parse(data);
              resolve(jsonData);
            } catch (error) {
              reject(new Error("Error parsing JSON"));
            }
          }
        });
      });

      // delete the uploaded file
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          throw err;
        }
        console.log("File deleted successfully");
      });

      await analyticsLib.insertAnalyticsData(payloadData);

      const response = {
        code: 201,
        status: "success",
        message: "Successfully inserted data",
        insertSuccessfully: payloadData.length,
        self: req.url,
        links: {
          analytics: "/analytics",
          scatterChart: "/analytics/scatter-chart",
        },
      };

      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  async getRelevanceIntensityLikelihood(req, res, next) {
    try {
      const filter = {
        end_year: req.query.end_year,
        source: req.query.source,
        region: req.query.region,
        topic: req.query.topic,
        sector: req.query.sector,
        country: req.query.country,
        pestle: req.query.pestle,
      };

      const data = await analyticsLib.getRelevanceIntensityLikelihood(filter);

      const response = {
        code: 200,
        status: "success",
        message: "Successfully fetched data",
        data,
        self: req.url,
        links: {
          post: "/analytics",
          scatterChart: "/analytics/scatter-chart",
        },
      };

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  async getScatterChartDetails(req, res, next) {
    try {
      const filter = {
        country: req.query.country,
        end_year: req.query.end_year,
      };

      const data = await analyticsLib.getScatterChartDetails(filter);

      const response = {
        code: 200,
        status: "success",
        message: "Successfully fetched data",
        data,
        self: req.url,
        links: {
          get: "/analytics",
          post: "/analytics",
        },
      };

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Analytics;

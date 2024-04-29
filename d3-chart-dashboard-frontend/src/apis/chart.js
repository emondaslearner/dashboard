import axios from "../axios";

// alert
import { error } from "../utils/alert";

// bar chart
const barChartApi = (filter) => {
  return axios
    .get(
      `/analytics?end_year=${filter.end_year}&source=${filter.source}&region=${filter.region}&topic=${filter.topic}&sector=${filter.sector}&country=${filter.country}`
    )
    .then((data) => {
      return data.data;
    })
    .catch((err) => {
      console.log(err);
      error({ message: err.response.data.message });
    });
};

export { barChartApi };

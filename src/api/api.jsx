import axios from 'axios';

const searchArticles = async (keyword, startDate, endDate) => {
  const url = "https://search-space-heatmap-opensearch-7qgyjfwufwegs2dwy2tej2fnbi.us-east-2.es.amazonaws.com/your_index_name/_search";
  const auth = {
    username: "svl@asu",
    password: "Svl@asu2024"
  };

  const query = {
    query: {
      bool: {
        must: [
          {
            multi_match: {
              query: keyword,
              fields: ["title", "summary"]
            }
          }
        ],
        filter: [
          {
            range: {
              date: {
                gte: startDate,
                lte: endDate,
                format: "yyyy-MM-dd"
              }
            }
          }
        ]
      }
    }
  };

  try {
    const response = await axios.post(url, query, {
      headers: {
        "Content-Type": "application/json"
      },
      auth: auth
    });
    console.log("Search Results:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    return null;
  }
};

export default searchArticles;

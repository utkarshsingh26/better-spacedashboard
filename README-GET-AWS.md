GET /your_index_name/_search
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
                gte: 2016-07-09,
                lte: 2024-11-15,
                format: "yyyy-MM-dd"
              }
            }
          }
        ]
      }
    }

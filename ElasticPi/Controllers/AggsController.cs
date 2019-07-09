using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Nest;
using Newtonsoft.Json;

namespace ElasticPi.Controllers
{
    [Route("api/[controller]")]
    public class AggsController : ControllerBase
    {
        public class Occupancy
        {
            public double avg { get; set; }
            public double sum { get; set; }

            public double min { get; set; }
            public double max { get; set; }
            public double cardinality { get; set; }
            public double value_count { get; set; }
        }
        public class DataOccupancy
        {
            public string systemGuid { get; set; }
            public string organizationId { get; set; }
            public string sensorId { get; set; }
            public Occupancy occupancyValue { get; set; }
            public string captureTime { get; set; }
        }

        [HttpGet("[action]")]
        public IEnumerable<DataOccupancy> GetAggs(List<string> groupBy, string aggsSelect, int size = 10)
        {
            if (!String.IsNullOrEmpty(aggsSelect) && size > 0 && groupBy.Count > 0)
            {
                string index = aggsSelect.ToLower() + "_aggs_by_";
                for (int i = 0; i < groupBy.Count; i++)
                {
                    if (i == groupBy.Count - 1)
                        index += groupBy[i].ToLower();
                    else
                        index += groupBy[i].ToLower() + "_";
                }

                var settings = new ConnectionSettings(new Uri("http://10.8.173.181"))
                .DefaultIndex(index);

                var client = new ElasticClient(settings);

                var searchResponse = client.Search<DataOccupancy>(s => s
                    .Size(size)
                    .Query(q => q)
                    .Source(src => src
                        .IncludeAll()
                    )
                );

                var data = searchResponse.Documents;
                return data;
            }
            else
            {
                var data = new List<DataOccupancy>();
                return data;
            }
        }
    }
}
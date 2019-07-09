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
            public double Avg { get; set; }
            public double Sum { get; set; }
        }
        public class DataOccupancy
        {
            //public string systemGuid { get; set; }
            public string OrganizationId { get; set; }
            //public string sensorId { get; set; }
            public Occupancy OccupancyValue { get; set; }
            //public string captureTime { get; set; }
        }

        [HttpGet("[action]")]
        public IEnumerable<DataOccupancy> GetAggs(List<string> groupBy, List<string> aggsOccupancy, int size = 10)
        {
            string index = "occupancyvalue_avg_sum_by_";
            for(int i=0; i<groupBy.Count; i++)
            {
                index += groupBy[i].ToLower();
            }

            var settings = new ConnectionSettings(new Uri("http://10.8.173.181"))
            .DefaultIndex(index);

            var client = new ElasticClient(settings);
            if (size <= 0)
            {
                var data = new List<DataOccupancy>();
                return data;
            }
            else
            {
                if (aggsOccupancy.Count == 2)
                {
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
                    if(aggsOccupancy[0] == "avg")
                    {
                        var searchResponse = client.Search<DataOccupancy>(s => s
                            .Size(size)
                            .Query(q => q)
                            .Source(src => src
                                .IncludeAll()
                                .Excludes(e => e
                                    .Fields(
                                        f => f.OccupancyValue.Sum
                                    )
                                )
                            )
                        );
                        var data = searchResponse.Documents;
                        return data;
                    }
                    else
                    {
                        var searchResponse = client.Search<DataOccupancy>(s => s
                            .Size(size)
                            .Query(q => q)
                            .Source(src => src
                                .IncludeAll()
                                .Excludes(e => e
                                    .Fields(
                                        f => f.OccupancyValue.Avg
                                    )
                                )
                            )
                        );
                        var data = searchResponse.Documents;
                        return data;
                    }
                }
                
            }
        }
    }
}
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
    public class SearchController : Controller
    {
        public class Data
        {
            public string systemGuid { get; set; }
            public string organizationId { get; set; }
            public string sensorId { get; set; }
            public int occupancyValue { get; set; }
            public string captureTime { get; set; }
        }

        [HttpGet("[action]")]
        public IEnumerable<Data> GetAll(int size=10)
        {
            var settings = new ConnectionSettings(new Uri("http://10.8.173.181"))
            .DefaultIndex("ss-standardizedsensordata");

            var client = new ElasticClient(settings);
            var searchResponse = client.Search<Data>(s => s
                .Size(size)
                .Query(q => q
                    .MatchAll()
                )
            );

            var data = searchResponse.Documents;
            return data;
        }

        [HttpGet("[action]")]
        public IEnumerable<Data> GetBy(string systemGuid, string organizationId, string sensorId, int occupancyValue, int size = 10)
        {
            var settings = new ConnectionSettings(new Uri("http://10.8.173.181"))
            .DefaultIndex("ss-standardizedsensordata");

            var client = new ElasticClient(settings);

            if (!String.IsNullOrEmpty(systemGuid))
            {
                var searchResponse = client.Search<Data>(s => s
                    .Size(size)
                    .Query(q => q
                        .Match(m => m
                            .Field(f => f.systemGuid)
                            .Query(systemGuid)
                        )
                    )
                );
                var data = searchResponse.Documents;
                return data;
            }
            else if (!String.IsNullOrEmpty(organizationId))
            {
                var searchResponse = client.Search<Data>(s => s
                    .Size(size)
                    .Query(q => q
                        .Match(m => m
                            .Field(f => f.organizationId)
                            .Query(organizationId)
                        )
                    )
                );
                var data = searchResponse.Documents;
                return data;
            }
            else if (!String.IsNullOrEmpty(sensorId))
            {
                var searchResponse = client.Search<Data>(s => s
                    .Size(size)
                    .Query(q => q
                        .Match(m => m
                            .Field(f => f.sensorId)
                            .Query(sensorId)
                        )
                    )
                );
                var data = searchResponse.Documents;
                return data;
            }
            else if (occupancyValue == 0 || occupancyValue == 1)
            {
                var searchResponse = client.Search<Data>(s => s
                    .Size(size)
                    .Query(q => q
                        .Match(m => m
                            .Field(f => f.occupancyValue)
                            .Query(Convert.ToString(occupancyValue))
                        )
                    )
                );
                var data = searchResponse.Documents;
                return data;
            }
            else
            {
                var searchResponse = client.Search<Data>(s => s
                    .Size(size)
                    .Query(q => q
                        .MatchAll()
                    )
                );

                var data = searchResponse.Documents;
                return data;
            }
        }
    }
}
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
        public IEnumerable<Data> GetBy(int size=10)
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
    }
}
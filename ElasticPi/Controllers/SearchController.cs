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
        public IEnumerable<Data> GetAll(int size = 10)
        {
            var settings = new ConnectionSettings(new Uri("http://10.8.173.181"))
            .DefaultIndex("ss-standardizedsensordata");

            var client = new ElasticClient(settings);
            if (size <= 0)
            {
                var data = new List<Data>();
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

        [HttpGet("[action]")]
        public IEnumerable<Data> GetBy(string systemGuid, string organizationId, string sensorId, int occupancyValue, int size = 10)
        {
            var settings = new ConnectionSettings(new Uri("http://10.8.173.181"))
            .DefaultIndex("ss-standardizedsensordata");

            var client = new ElasticClient(settings);

            List<object> fieldsValue = new List<object>();
            List<string> fieldsName = new List<string>();
            if (!String.IsNullOrEmpty(systemGuid))
            {
                fieldsValue.Add(systemGuid);
                fieldsName.Add(nameof(systemGuid));
            }
            if (!String.IsNullOrEmpty(sensorId))
            {
                fieldsValue.Add(sensorId);
                fieldsName.Add(nameof(sensorId));
            }

            if (!String.IsNullOrEmpty(organizationId))
            {
                fieldsValue.Add(organizationId);
                fieldsName.Add(nameof(organizationId));
            }

            if (occupancyValue >= 0)
            {
                fieldsValue.Add(occupancyValue);
                fieldsName.Add(nameof(occupancyValue));
            }

            if (fieldsValue.Count <= 0 || fieldsName.Count <= 0)
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
            else
            {

                var c = new QueryContainer();
                for (int i = 0; i < fieldsValue.Count; i++)
                {

                    var q = new TermQuery { Field = fieldsName[i], Value = fieldsValue[i] };
                    c &= q;
                }

                var searchResponse = client.Search<Data>(new SearchRequest<Data>
                {
                    Size = size,
                    Query = c
                });

                var data = searchResponse.Documents;
                return data;
            }
        }
    }
}
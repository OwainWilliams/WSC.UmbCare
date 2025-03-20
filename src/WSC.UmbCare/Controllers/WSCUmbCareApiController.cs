using Asp.Versioning;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Security;

namespace WSC.UmbCare.Controllers
{
    [ApiVersion("1.0")]
    [ApiExplorerSettings(GroupName = "WSC.UmbCare")]
    public class WSCUmbCareApiController(IBackOfficeSecurityAccessor backOfficeSecurityAccessor) : WSCUmbCareApiControllerBase
    {
        [HttpGet("ping")]
        [ProducesResponseType<string>(StatusCodes.Status200OK)]
        public string Ping() => "Pong";


        [HttpGet("last-login")]
        [ProducesResponseType<string>(StatusCodes.Status200OK)]
        public DateTime? LastLogin()
          => backOfficeSecurityAccessor.BackOfficeSecurity?.CurrentUser?.LastLoginDate;
    }
}

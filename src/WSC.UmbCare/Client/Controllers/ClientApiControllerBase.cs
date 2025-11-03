using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Web.Common.Authorization;
using Umbraco.Cms.Web.Common.Routing;

namespace Client.Controllers
{
    [ApiController]
    [BackOfficeRoute("client/api/v{version:apiVersion}")]
    [MapToApi(Constants.ApiName)]
    public class ClientApiControllerBase : ControllerBase
    {
    }
}

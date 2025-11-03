using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Web.Common.Authorization;

namespace WSC.UmbCare.Controllers
{
    [ApiVersion("1.0")]
    [ApiExplorerSettings(GroupName = "WSC.UmbCare")]
    public class WSCUmbCareApiController(IBackOfficeSecurityAccessor backOfficeSecurityAccessor,
        IKeyValueService keyValueService) : WSCUmbCareApiControllerBase
    {
        private const string DISABLE_COUNTDOWN_KEY = "WSC.UmbCare.DisableCountdown";


        [HttpGet("ping")]
        [ProducesResponseType<string>(StatusCodes.Status200OK)]
        public string Ping() => "Pong";


        [HttpGet("last-login")]
        [ProducesResponseType<string>(StatusCodes.Status200OK)]
        public DateTime? LastLogin()
          => backOfficeSecurityAccessor.BackOfficeSecurity?.CurrentUser?.LastLoginDate;

        [HttpGet("settings/disable-countdown")]
        [ProducesResponseType<bool>(StatusCodes.Status200OK)]
        public bool GetDisableCountdownSetting()
        {
            var value = keyValueService.GetValue(DISABLE_COUNTDOWN_KEY);
            return bool.TryParse(value, out var result) && result;
        }

        [HttpPost("settings/disable-countdown")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult SetDisableCountdownSetting([FromBody] DisableCountdownRequest request)
        {
            keyValueService.SetValue(DISABLE_COUNTDOWN_KEY, request.Disabled.ToString());
            return Ok();
        }
    }
    public class DisableCountdownRequest
    {
        public bool Disabled { get; set; }
    }
}

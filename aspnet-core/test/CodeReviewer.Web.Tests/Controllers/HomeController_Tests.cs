using System.Threading.Tasks;
using CodeReviewer.Models.TokenAuth;
using CodeReviewer.Web.Controllers;
using Shouldly;
using Xunit;

namespace CodeReviewer.Web.Tests.Controllers
{
    public class HomeController_Tests: CodeReviewerWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}
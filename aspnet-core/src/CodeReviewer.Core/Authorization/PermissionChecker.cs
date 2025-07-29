using Abp.Authorization;
using CodeReviewer.Authorization.Roles;
using CodeReviewer.Authorization.Users;

namespace CodeReviewer.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}

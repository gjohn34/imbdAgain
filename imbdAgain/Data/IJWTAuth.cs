using imbdAgain.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace imbdAgain.Data
{
    public interface IJWTAuth
    {
        string Authentication(string username, string password, IEnumerable<User> users);
        JwtPayload FindUser(string token);
    }
}

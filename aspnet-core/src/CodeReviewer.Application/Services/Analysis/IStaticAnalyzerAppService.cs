using CodeReviewer.Services.Analysis.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodeReviewer.Services.Analysis
{
    public interface IStaticAnalyzerAppService
    {
        Task<List<ViolationDto>> AnalyzeAsync(string code);
    }
}

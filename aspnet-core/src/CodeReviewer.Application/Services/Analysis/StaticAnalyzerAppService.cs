using Abp.Application.Services;
using CodeReviewer.Services.Analysis;
using CodeReviewer.Services.Analysis.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class StaticAnalyzerAppService : ApplicationService, IStaticAnalyzerAppService
{
    public Task<List<ViolationDto>> AnalyzeAsync([FromBody] string code)
    {
        var tree = CSharpSyntaxTree.ParseText(code);
        var root = tree.GetRoot();

        var diagnostics = new List<ViolationDto>();

        foreach (var classDecl in root.DescendantNodes().OfType<ClassDeclarationSyntax>())
        {
            // Rule 1: Class name must be PascalCase
            if (!char.IsUpper(classDecl.Identifier.Text[0]))
            {
                diagnostics.Add(new ViolationDto
                {
                    Line = classDecl.GetLocation().GetLineSpan().StartLinePosition.Line + 1,
                    Message = $"Class name '{classDecl.Identifier.Text}' should use PascalCase."
                });
            }
        }

        foreach (var field in root.DescendantNodes().OfType<FieldDeclarationSyntax>())
        {
            var isPrivate = field.Modifiers.Any(m => m.IsKind(SyntaxKind.PrivateKeyword));
            foreach (var variable in field.Declaration.Variables)
            {
                var name = variable.Identifier.Text;

                // Rule 2: Constants must be all uppercase
                if (field.Modifiers.Any(SyntaxKind.ConstKeyword) && name.Any(c => char.IsLower(c)))
                {
                    diagnostics.Add(new ViolationDto
                    {
                        Line = variable.GetLocation().GetLineSpan().StartLinePosition.Line + 1,
                        Message = $"Constant '{name}' should be all uppercase."
                    });
                }

                // Rule 3: Private fields must start with '_' and be camelCase
                if (isPrivate && !name.StartsWith("_"))
                {
                    diagnostics.Add(new ViolationDto
                    {
                        Line = variable.GetLocation().GetLineSpan().StartLinePosition.Line + 1,
                        Message = $"Private variable '{name}' should start with '_' and use camelCase."
                    });
                }
            }
        }

        foreach (var method in root.DescendantNodes().OfType<MethodDeclarationSyntax>())
        {
            var name = method.Identifier.Text;

            // Rule 4: Methods must use camelCase and have explicit return types
            if (char.IsUpper(name[0]))
            {
                diagnostics.Add(new ViolationDto
                {
                    Line = method.GetLocation().GetLineSpan().StartLinePosition.Line + 1,
                    Message = $"Method name '{name}' should use camelCase."
                });
            }

            if (method.ReturnType.ToString() == "var" || method.ReturnType == null)
            {
                diagnostics.Add(new ViolationDto
                {
                    Line = method.GetLocation().GetLineSpan().StartLinePosition.Line + 1,
                    Message = $"Method '{name}' must declare an explicit return type."
                });
            }

            foreach (var param in method.ParameterList.Parameters)
            {
                if (param.Type == null)
                {
                    diagnostics.Add(new ViolationDto
                    {
                        Line = param.GetLocation().GetLineSpan().StartLinePosition.Line + 1,
                        Message = $"Parameter '{param.Identifier.Text}' in method '{name}' must have a type."
                    });
                }
            }
        }

        return Task.FromResult(diagnostics);
    }
}

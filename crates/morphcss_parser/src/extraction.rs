use morphcss_core::CssProperty;
use oxc_allocator::Allocator;
use oxc_ast::ast::{
    CallExpression, Expression, JSXAttributeItem, JSXAttributeValue, ObjectPropertyKind,
    PropertyKey,
};
use oxc_ast::Visit;
use oxc_parser::Parser;
use oxc_span::{GetSpan, SourceType, Span};

#[derive(Debug, Clone, Hash, Eq, PartialEq)]
pub struct ExtractedClassNameLiteral {
    pub value: String,
    pub span: Span,
}

#[derive(Debug)]
pub struct ExtractedCssCall {
    pub span: Span,
    pub properties: Vec<CssProperty>,
    pub dynamic_variables: Vec<(String, String)>,
}

pub struct CssExtractor<'b> {
    pub class_name_literals: Vec<ExtractedClassNameLiteral>,
    pub css_calls: Vec<ExtractedCssCall>,
    pub source: &'b str,
}

impl<'b> CssExtractor<'b> {
    pub fn new(source: &'b str) -> Self {
        Self {
            class_name_literals: Vec::new(),
            css_calls: Vec::new(),
            source,
        }
    }
}

impl<'a, 'b> Visit<'a> for CssExtractor<'b> {
    fn visit_jsx_attribute_item(&mut self, it: &JSXAttributeItem<'a>) {
        if let JSXAttributeItem::Attribute(attr) = it {
            if let oxc_ast::ast::JSXAttributeName::Identifier(ident) = &attr.name {
                if ident.name == "className" {
                    if let Some(JSXAttributeValue::StringLiteral(lit)) = &attr.value {
                        self.class_name_literals.push(ExtractedClassNameLiteral {
                            value: lit.value.to_string(),
                            span: lit.span,
                        });
                    } else if let Some(JSXAttributeValue::ExpressionContainer(container)) =
                        &attr.value
                    {
                        if let Some(expr) = container.expression.as_expression() {
                            if let Expression::StringLiteral(lit) = expr {
                                self.class_name_literals.push(ExtractedClassNameLiteral {
                                    value: lit.value.to_string(),
                                    span: lit.span,
                                });
                            }
                        }
                    }
                }
            }
        }
    }

    fn visit_call_expression(&mut self, expr: &CallExpression<'a>) {
        if let Expression::Identifier(ident) = &expr.callee {
            if ident.name == "css" {
                if let Some(arg) = expr.arguments.first() {
                    if let Some(arg_expr) = arg.as_expression() {
                        if let Expression::ObjectExpression(obj) = arg_expr {
                            let mut properties = Vec::new();
                            let mut dynamic_variables = Vec::new();
                            let mut dynamic_index = 0;

                            for prop in &obj.properties {
                                if let ObjectPropertyKind::ObjectProperty(p) = prop {
                                    let key_name = match &p.key {
                                        PropertyKey::StaticIdentifier(id) => {
                                            Some(id.name.to_string())
                                        }
                                        PropertyKey::StringLiteral(lit) => {
                                            Some(lit.value.to_string())
                                        }
                                        _ => None,
                                    };

                                    if let Some(k) = key_name {
                                        match &p.value {
                                            Expression::StringLiteral(lit) => {
                                                properties.push(CssProperty::new(
                                                    k,
                                                    lit.value.to_string(),
                                                ));
                                            }
                                            Expression::NumericLiteral(lit) => {
                                                properties.push(CssProperty::new(
                                                    k,
                                                    lit.value.to_string(),
                                                ));
                                            }
                                            _ => {
                                                // Dynamic value
                                                let var_name = format!("--{}", dynamic_index);
                                                dynamic_index += 1;

                                                let span = p.value.span();
                                                let val_str = &self.source
                                                    [span.start as usize..span.end as usize];

                                                properties.push(CssProperty::new(
                                                    k,
                                                    format!("var({})", var_name),
                                                ));
                                                dynamic_variables
                                                    .push((var_name, val_str.to_string()));
                                            }
                                        }
                                    }
                                }
                            }
                            if !properties.is_empty() {
                                self.css_calls.push(ExtractedCssCall {
                                    span: expr.span,
                                    properties,
                                    dynamic_variables,
                                });
                            }
                        }
                    }
                }
            }
        }
    }
}

pub struct ExtractionResult {
    pub class_name_literals: Vec<ExtractedClassNameLiteral>,
    pub css_calls: Vec<ExtractedCssCall>,
}

pub fn extract_css_from_source(
    source: &str,
    source_type: SourceType,
) -> Result<ExtractionResult, Vec<String>> {
    let allocator = Allocator::default();
    let ret = Parser::new(&allocator, source, source_type).parse();

    if !ret.errors.is_empty() {
        let errors: Vec<String> = ret.errors.iter().map(|e| format!("{:?}", e)).collect();
        return Err(errors);
    }

    let mut extractor = CssExtractor::new(source);
    extractor.visit_program(&ret.program);

    Ok(ExtractionResult {
        class_name_literals: extractor.class_name_literals,
        css_calls: extractor.css_calls,
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_extract_classes_and_css_calls() {
        let source = r#"
            export function MyComponent() {
                const styles = css({ display: 'flex', padding: 16 });
                return (
                    <div className="flex p-4"></div>
                );
            }
        "#;

        let source_type = SourceType::default().with_typescript(true).with_jsx(true);
        let result = extract_css_from_source(source, source_type).unwrap();

        assert_eq!(result.class_name_literals.len(), 1);
        assert_eq!(result.class_name_literals[0].value, "flex p-4");

        assert_eq!(result.css_calls.len(), 1);
        let call = &result.css_calls[0];
        assert_eq!(call.properties.len(), 2);
        assert_eq!(call.properties[0].property, "display");
        assert_eq!(call.properties[0].value, "flex");
        assert_eq!(call.properties[1].property, "padding");
        assert_eq!(call.properties[1].value, "16");
        assert_eq!(call.dynamic_variables.len(), 0);
    }

    #[test]
    fn test_extract_dynamic_values() {
        let source = r#"
            export const button = (color: string) => css({
                background: color,
                padding: 16,
            });
        "#;

        let source_type = SourceType::default().with_typescript(true).with_jsx(true);
        let result = extract_css_from_source(source, source_type).unwrap();

        assert_eq!(result.css_calls.len(), 1);
        let call = &result.css_calls[0];

        assert_eq!(call.properties.len(), 2);
        assert_eq!(call.properties[0].property, "background");
        assert_eq!(call.properties[0].value, "var(--0)");

        assert_eq!(call.properties[1].property, "padding");
        assert_eq!(call.properties[1].value, "16");

        assert_eq!(call.dynamic_variables.len(), 1);
        assert_eq!(call.dynamic_variables[0].0, "--0");
        assert_eq!(call.dynamic_variables[0].1, "color");
    }
}

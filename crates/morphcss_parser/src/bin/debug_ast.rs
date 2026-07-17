use morphcss_parser::extract_css_from_source;
use oxc_span::SourceType;

fn main() {
    let source = std::fs::read_to_string("../../examples/nextjs/src/app/page.tsx").unwrap();
    let source_type = SourceType::default().with_typescript(true).with_jsx(true);
    let result = extract_css_from_source(&source, source_type).unwrap();
    println!("{:#?}", result.css_calls);
}

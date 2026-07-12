use crate::AtomicCache;
use lightningcss::rules::CssRule;
use lightningcss::stylesheet::{ParserOptions, StyleSheet};
use lightningcss::traits::ToCss;
use morphcss_core::CssProperty;
use std::collections::HashMap;
use std::sync::Arc;

pub struct CssIngester {
    pub atomic_cache: Arc<AtomicCache>,
    pub utility_map: HashMap<String, String>,
}

impl CssIngester {
    pub fn new(atomic_cache: Arc<AtomicCache>) -> Self {
        Self {
            atomic_cache,
            utility_map: HashMap::new(),
        }
    }

    pub fn ingest(&mut self, css: &str) -> Result<(), String> {
        let stylesheet = StyleSheet::parse(css, ParserOptions::default())
            .map_err(|e| format!("Failed to parse CSS: {:?}", e))?;

        for rule in stylesheet.rules.0 {
            if let CssRule::Style(style_rule) = rule {
                let mut class_name = None;
                for selector in style_rule.selectors.0.iter() {
                    let mut iter = selector.iter();
                    if let Some(lightningcss::selector::Component::Class(name)) = iter.next() {
                        if iter.next().is_none() {
                            class_name = Some(name.0.to_string());
                            break;
                        }
                    }
                }

                if let Some(class) = class_name {
                    let mut hashes = Vec::new();

                    for declaration in style_rule.declarations.declarations {
                        let prop_id_str = declaration.property_id().to_css_string(lightningcss::printer::PrinterOptions::default()).unwrap();
                        let mut value_str = String::new();
                        let mut printer = lightningcss::printer::Printer::new(&mut value_str, lightningcss::printer::PrinterOptions::default());
                        declaration.to_css(&mut printer, false).unwrap();

                        let parts: Vec<&str> = value_str.splitn(2, ':').collect();
                        if parts.len() == 2 {
                            let val = parts[1].trim().trim_end_matches(';');
                            let css_prop = CssProperty::new(prop_id_str, val);
                            let hash = self.atomic_cache.process_property(css_prop);
                            hashes.push(hash);
                        }
                    }

                    if !hashes.is_empty() {
                        self.utility_map.insert(class, hashes.join(" "));
                    }
                }
            }
        }

        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_ingest_utility_css() {
        let cache = Arc::new(AtomicCache::new());
        let mut ingester = CssIngester::new(cache.clone());
        
        let css = r#"
            .flex { display: flex; }
            .p-4 { padding: 16px; }
            .items-center { align-items: center; }
        "#;
        
        ingester.ingest(css).unwrap();
        
        // Ensure utility map is populated
        assert!(ingester.utility_map.contains_key("flex"));
        assert!(ingester.utility_map.contains_key("p-4"));
        assert!(ingester.utility_map.contains_key("items-center"));
        
        // Simulate a file using these hashes so they appear in output
        let flex_hash = ingester.utility_map.get("flex").unwrap().clone();
        let p4_hash = ingester.utility_map.get("p-4").unwrap().clone();
        let items_hash = ingester.utility_map.get("items-center").unwrap().clone();
        cache.register_file("test_app.ts", vec![flex_hash, p4_hash, items_hash]);

        // Ensure atomic cache received the properties
        let final_css = cache.generate_css();
        assert!(final_css.contains("display: flex;"));
        assert!(final_css.contains("padding: 16px;"));
        assert!(final_css.contains("align-items: center;"));
        
        // Ensure equivalent object syntax hashes to the same atomic class
        let obj_hash = cache.process_property(CssProperty::new("display", "flex"));
        let util_hash = ingester.utility_map.get("flex").unwrap();
        assert_eq!(&obj_hash, util_hash, "Object syntax and Utility CSS must resolve to the identical atomic class");
    }
}

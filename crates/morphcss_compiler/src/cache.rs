use dashmap::DashMap;
use morphcss_core::{generate_hash, CssProperty};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct AtomicCache {
    property_to_hash: DashMap<String, String>,
    hash_to_rule: DashMap<String, String>,
    hash_refcount: DashMap<String, usize>,
    file_hashes: DashMap<String, Vec<String>>,
}

impl Default for AtomicCache {
    fn default() -> Self {
        Self::new()
    }
}

impl AtomicCache {
    pub fn new() -> Self {
        Self {
            property_to_hash: DashMap::new(),
            hash_to_rule: DashMap::new(),
            hash_refcount: DashMap::new(),
            file_hashes: DashMap::new(),
        }
    }

    pub fn process_property(&self, mut prop: CssProperty) -> String {
        prop.canonicalize();
        let canonical_str = prop.to_canonical_string();

        if let Some(hash) = self.property_to_hash.get(&canonical_str) {
            return hash.clone();
        }

        let hash = generate_hash(&canonical_str);
        self.property_to_hash
            .insert(canonical_str.clone(), hash.clone());

        let rule = match &prop.condition {
            Some(cond) => {
                if cond.contains('&') {
                    let selector = cond.replace("&", &format!(".{}", hash));
                    format!("{} {{ {}: {}; }}", selector, prop.property, prop.value)
                } else if cond.starts_with(':') {
                    format!(".{}{} {{ {}: {}; }}", hash, cond, prop.property, prop.value)
                } else if cond.starts_with('@') {
                    format!(
                        "{} {{ .{} {{ {}: {}; }} }}",
                        cond, hash, prop.property, prop.value
                    )
                } else {
                    format!(".{} {{ {}: {}; }}", hash, prop.property, prop.value)
                }
            }
            None => format!(".{} {{ {}: {}; }}", hash, prop.property, prop.value),
        };

        self.hash_to_rule.insert(hash.clone(), rule);
        hash
    }

    pub fn register_file(&self, filename: &str, mut hashes: Vec<String>) {
        hashes.sort();
        hashes.dedup();

        for hash in &hashes {
            *self.hash_refcount.entry(hash.clone()).or_insert(0) += 1;
        }

        self.file_hashes.insert(filename.to_string(), hashes);
    }
    pub fn invalidate_file(&self, filename: &str) {
        if let Some((_, hashes)) = self.file_hashes.remove(filename) {
            for hash in hashes {
                let mut remove = false;
                if let Some(mut refcount) = self.hash_refcount.get_mut(&hash) {
                    *refcount -= 1;
                    if *refcount == 0 {
                        remove = true;
                    }
                }

                if remove {
                    self.hash_refcount.remove(&hash);
                }
            }
        }
    }

    pub fn generate_css(&self) -> String {
        let mut css_rules = Vec::new();
        for kv in self.hash_to_rule.iter() {
            let hash = kv.key();
            let is_active = self.hash_refcount.get(hash).is_some_and(|r| *r > 0);
            if is_active {
                css_rules.push(kv.value().clone());
            }
        }

        css_rules.sort();
        css_rules.join("\n")
    }

    pub fn get_stats(&self) -> (usize, usize) {
        (self.hash_to_rule.len(), self.file_hashes.len())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_atomic_cache_refcounting() {
        let cache = AtomicCache::new();

        let hash1 = cache.process_property(CssProperty::new("display", "flex"));
        let hash2 = cache.process_property(CssProperty::new("padding", "16"));

        // Register file1 using hash1 and hash2
        cache.register_file("file1.ts", vec![hash1.clone(), hash2.clone()]);

        // Register file2 using only hash1
        cache.register_file("file2.ts", vec![hash1.clone()]);

        let css = cache.generate_css();
        assert!(css.contains("display: flex;"));
        assert!(css.contains("padding: 16px;"));

        // Invalidate file1. hash2 refcount drops to 0. hash1 refcount drops to 1.
        cache.invalidate_file("file1.ts");

        let css2 = cache.generate_css();
        assert!(css2.contains("display: flex;"));
        assert!(
            !css2.contains("padding: 16px;"),
            "Hash2 should be completely removed from generated CSS"
        );

        // Invalidate file2. hash1 refcount drops to 0.
        cache.invalidate_file("file2.ts");
        let css3 = cache.generate_css();
        assert!(css3.is_empty(), "All active rules should be removed");
    }

    #[test]
    fn test_atomic_cache_nested_selectors() {
        let cache = AtomicCache::new();

        let hash1 = cache.process_property(CssProperty::new("background", "red").with_condition("&:hover"));
        let hash2 = cache.process_property(CssProperty::new("color", "blue").with_condition("& h1"));

        cache.register_file("file1.ts", vec![hash1.clone(), hash2.clone()]);

        let css = cache.generate_css();
        assert!(css.contains(&format!(".{}:hover {{ background: red; }}", hash1)));
        assert!(css.contains(&format!(".{} h1 {{ color: blue; }}", hash2)));
    }
}

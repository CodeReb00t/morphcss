pub mod hash;
pub mod ir;

pub use hash::generate_hash;
pub use ir::CssProperty;

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_canonicalize_and_hash() {
        let mut prop1 = CssProperty::new("padding", "16");
        prop1.canonicalize();
        
        let mut prop2 = CssProperty::new("padding", "16px");
        prop2.canonicalize();

        assert_eq!(prop1.to_canonical_string(), "padding:16px");
        assert_eq!(prop2.to_canonical_string(), "padding:16px");

        let hash1 = generate_hash(&prop1.to_canonical_string());
        let hash2 = generate_hash(&prop2.to_canonical_string());
        
        assert_eq!(hash1, hash2);
    }
}

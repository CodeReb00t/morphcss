use blake3::Hasher;

pub fn generate_hash(canonical_str: &str) -> String {
    let mut hasher = Hasher::new();
    hasher.update(canonical_str.as_bytes());
    let hash = hasher.finalize();
    
    let hex_hash = hash.to_hex();
    format!("m_{}", &hex_hash[..8])
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_generate_hash_deterministic() {
        let hash1 = generate_hash("display:flex");
        let hash2 = generate_hash("display:flex");
        assert_eq!(hash1, hash2);
        assert!(hash1.starts_with("m_"));
        assert_eq!(hash1.len(), 2 + 8);
    }

    #[test]
    fn test_generate_hash_collision_resistant() {
        let hash1 = generate_hash("padding:16px");
        let hash2 = generate_hash("padding:17px");
        assert_ne!(hash1, hash2);
    }
}

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
pub struct CssProperty {
    pub property: String,
    pub value: String,
    pub condition: Option<String>,
}

fn camel_to_kebab(s: &str) -> String {
    let mut out = String::with_capacity(s.len() + 2);
    for c in s.chars() {
        if c.is_ascii_uppercase() {
            out.push('-');
            out.push(c.to_ascii_lowercase());
        } else {
            out.push(c);
        }
    }
    out
}

impl CssProperty {
    pub fn new(property: impl Into<String>, value: impl Into<String>) -> Self {
        Self {
            property: property.into(),
            value: value.into(),
            condition: None,
        }
    }

    pub fn with_condition(mut self, condition: impl Into<String>) -> Self {
        self.condition = Some(condition.into());
        self
    }

    pub fn canonicalize(&mut self) {
        let prop = camel_to_kebab(self.property.trim());
        let val = self.value.trim();

        let unitless_properties = [
            "opacity",
            "font-weight",
            "z-index",
            "line-height",
            "flex-grow",
            "flex-shrink",
            "order",
            "flex",
        ];

        if !unitless_properties.contains(&prop.as_str()) && val.parse::<f64>().is_ok() {
            self.property = prop;
            self.value = format!("{}px", val);
        } else {
            self.property = prop;
            self.value = val.to_string();
        }
    }

    pub fn to_canonical_string(&self) -> String {
        match &self.condition {
            Some(cond) => format!("{}|{}:{}", cond, self.property, self.value),
            None => format!("{}:{}", self.property, self.value),
        }
    }
}

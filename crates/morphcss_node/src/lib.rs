#![deny(clippy::all)]

use blake3;
use morphcss_plugin::MorphCssPlugin;
use napi::bindgen_prelude::*;
use napi_derive::napi;

#[napi]
pub struct MorphCompiler {
    plugin: MorphCssPlugin,
}

#[napi(object)]
pub struct CompileResult {
    pub code: String,
}

#[napi]
impl MorphCompiler {
    #[napi(constructor)]
    pub fn new() -> Self {
        Self {
            plugin: MorphCssPlugin::new(),
        }
    }

    #[napi]
    pub fn compile(
        &self,
        source: String,
        filename: String,
    ) -> Result<CompileResult> {
        let transformed = self
            .plugin
            .transform(&source, &filename)
            .map_err(|err| {
                Error::new(
                    Status::GenericFailure,
                    format!("{:?}", err),
                )
            })?;

        Ok(CompileResult {
            code: transformed,
        })
    }

    #[napi]
    pub fn ingest_css(&mut self, css: String) -> Result<()> {
        self.plugin
            .ingest_utility_css(&css)
            .map_err(|err| Error::new(Status::GenericFailure, err))
    }

    #[napi]
    pub fn generate_css(&self) -> String {
        self.plugin.generate_css()
    }

    #[napi]
    pub fn generate_css_hash(&self) -> String {
        let css = self.plugin.generate_css();
        blake3::hash(css.as_bytes())
            .to_hex()
            .to_string()
    }

    #[napi]
    pub fn invalidate(&self, filename: String) {
        self.plugin.invalidate(&filename);
    }
}
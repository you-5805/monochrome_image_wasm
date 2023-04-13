use image;
use wasm_bindgen::prelude::*;

// 画像データを ArrayBuffer として受け取り、モノクロ加工後の ArrayBuffer を返す関数
#[wasm_bindgen]
pub fn monochrome_image(input_image_data: &[u8]) -> Vec<u8> {
    let input_image = image::load_from_memory(input_image_data).unwrap();
    let gray_image = input_image.into_luma8();
    gray_image.into_vec()
}
